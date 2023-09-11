const app = require('../source');
const request = require('supertest');
const mongodb = require('../db/connect')

jest.setTimeout(30000);

async function start() {
  await mongodb.initDb();
  console.log(`Connected to Database`);
}



describe('GET HELLO WORLD', () => {
    test('responds to /', async () => {
        
        const res = await request(app).get('/movie/test');
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual('hello world!');
      });
    });


describe('GET All Movies', () => {
  test('responds to /movie', async () => {
    start();
    const res = await request(app).post('/movie');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
  });
});




// const controller = require("../controller/index");
// describe('Test Handlers', function () {

//     test('responds to /', () => {
//         const req = {  };

//         const res = { text: '',
//             send: function(input) { this.text = input } 
//         };
//         controller.index(req, res);
        
//         expect(res.text).toEqual('hello world!');
//     });

// });


// const request = require('supertest');
// const express = require("express");
// const app = express();

// describe('Good Home Routes', function () {

//     test('responds to /', async () => {
//       const res = await request(app).get('downsrecipes.onrender.com/movie/test');
//       //expect(res.header['content-type']).toBe('text/html; charset=utf-8');
//       //expect(res.statusCode).toBe(200);
//       expect(res.text).toEqual('hello world!');
//     });
    
  
//   });