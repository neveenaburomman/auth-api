'use strict';

const { db } = require('../src/models/index');
const server = require('../src/server.js');
const supertest = require('supertest');
const request = supertest(server.app);


beforeAll(async()=>{
    await db.sync();
 })
  afterAll(async()=>{
      await db.drop();
  })
describe('testing',()=>{

    it('404 on a bad route',async()=>{
        const response = await request.get('/notValid');
        expect(response.status).toEqual(404);
    })

    it('404 on a bad method', async()=>{
        const response = await request.post('/');
        expect(response.status).toEqual(404);

    })
});

describe('testing signup',()=>{

    it('200 if the id is in the query string', async()=>{
        const response = await request.post('/signup').send({
            username:"neveen",
            password:"1997"
        }); 
         expect(response.status).toBe(201);
        })
});

describe('testing signin ',()=>{

    it('200 if the id is in the query string', async()=>{
        const response = await request.post('/signup').send({
            username:"neveen",
            password:"1997"
        }); 
         expect(response.status).toBe(201);
        })
});

