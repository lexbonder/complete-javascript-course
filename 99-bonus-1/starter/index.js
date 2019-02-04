// fs, http, url are 'core node modules' default modules that comes with node.js
const fs = require('fs');
const http = require('http');
const url = require('url');

// requires absolute path. __dirname is root folder by default, in this case 'starter'.
// utf-8 is character encoding. if it's not there it returns a buffer instead of a file
const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);

const server = http.createServer((req, res) => {
  // 'true' parses the url query into an object
  const pathName = url.parse(req.url, true).pathname;
  const id = url.parse(req.url, true).query.id;

  const validId = id >= 0 && id < laptopData.length;

  // Products Overview
  if (pathName === '/products' || pathName === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    fs.readFile(
      `${__dirname}/templates/template-overview.html`,
      'utf-8',
      (err, data) => {
        let overviewOutput = data;

        fs.readFile(
          `${__dirname}/templates/template-card.html`,
          'utf-8',
          (err, data) => {
            const cardsOutput = laptopData
              .map(laptop => replaceTemplate(data, laptop))
              .join('');

            overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput);

            res.end(overviewOutput);
          }
        );
      }
    );
  }

  // Product Detail
  else if (pathName === '/laptop' && validId) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    // as often as you can, use the async version because otherwise your server makes EVERYONE wait.
    fs.readFile(
      `${__dirname}/templates/template-laptop.html`,
      'utf-8',
      (err, data) => {
        const laptop = laptopData[id];
        const output = replaceTemplate(data, laptop);
        res.end(output);
      }
    );
  }

  // Images
  else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) {
    fs.readFile(`${__dirname}/data/img/${pathName}`, (err, data) => {
      res.writeHead(200, { 'Content-Type': 'image/jpg' });
      res.end(data);
    });
  }

  // URL Not Found
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('Page not found');
  }
});

// Tells server to listen on a certain port on a certain I.P. address
server.listen(1337, '127.0.0.1', () => {
  console.log('Listening for requests now');
});

function replaceTemplate(originalHTML, laptop) {
  let output = originalHTML.replace(/{%PRODUCTNAME%}/g, laptop.productName);
  output = output.replace(/{%ID%}/g, laptop.id);
  output = output.replace(/{%IMAGE%}/g, laptop.image);
  output = output.replace(/{%PRICE%}/g, laptop.price);
  output = output.replace(/{%SCREEN%}/g, laptop.screen);
  output = output.replace(/{%CPU%}/g, laptop.cpu);
  output = output.replace(/{%STORAGE%}/g, laptop.storage);
  output = output.replace(/{%RAM%}/g, laptop.ram);
  output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
  return output;
}
