import axios from 'axios';
import key from '../../apiKey';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(
        `https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`
      );      
      const {
        title,
        publisher,
        image_url,
        source_url,
        ingredients,
      } = res.data.recipe;
      this.title = title;
      this.author = publisher;
      this.img = image_url;
      this.url = source_url;
      this.ingredients = ingredients;
    } catch (err) {
      console.log(err);
    }
  }

  calcTime() {
    // assuming 15 minutes per 3 ingredients
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = [
      'tablespoons',
      'tablespoon',
      'ounces',
      'ounce',
      'teaspoons',
      'teaspoon',
      'cups',
      'pounds',
      'pound',
    ];
    const unitsShort = [
      'tbsp',
      'tbsp',
      'oz',
      'oz',
      'tsp',
      'tsp',
      'cup',
      'lbs',
      'lb',
    ];
    const units = [...unitsShort, 'kg', 'g']
    const parsed = this.ingredients.map(el => {
      // uniform units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // remove parens
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // parse into count, unit, and ingredient
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

      const objIng = {
        count: 1,
        unit: '',
        ingredient
      };
      if (unitIndex > -1) {
        // unit found (1 1/2 oz water)

        const arrCount = arrIng.slice(0, unitIndex);
        if (arrCount.length === 1) {
          objIng.count = eval(arrIng[0].replace('-', '+'));
        } else {
          objIng.count = eval(arrCount.join('+'));
        }
        objIng.unit = arrIng[unitIndex];
        objIng.ingredient = arrIng.slice(unitIndex + 1).join(' ')

      } else if (parseInt(arrIng[0], 10)){
        // no unit, but contains a number (1 lemon)
        objIng.count = parseInt(arrIng[0], 10);
        objIng.ingredient = arrIng.slice(1).join(' ');
        }
      return objIng;
    });

    this.ingredients = parsed;
  }

  // type = increase / decrease
  updateServings(type) {
    // update servings
    const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
    // update ingredients
    this.ingredients.forEach(ing => {
      ing.count *= newServings / this.servings
    })

    this.servings = newServings;
  }
}
