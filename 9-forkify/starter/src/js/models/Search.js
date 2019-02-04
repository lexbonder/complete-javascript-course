import axios from 'axios';
import key from '../../apiKey';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const result = await axios(
        `https://www.food2fork.com/api/search?key=${key}&q=${this.query}`
        );
      if (result.data.error === 'limit') throw 'API Call Limit Reached';
      this.recipes = result.data.recipes;
    } catch (error) {
      
      console.log(error);
    }
  }
}
