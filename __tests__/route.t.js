const request = require('supertest');
const express = require("express");
const app = express();

describe('Good Home Routes', function () {

    test('responds to /', async () => {
      const res = await request(app).get('downsrecipes.onrender.com/movie/test');
      //expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      //expect(res.statusCode).toBe(200);
      expect(res.text).toEqual('hello world!');
    });
    
  
  });