const usernameService = require ('../routing/logIn.js')
const axios = require('axios')
const express = require("express");

const router = express.Router();
// describe('username service'), () => {




// }
describe('login', () => {
    it('returns 201 and the user object when given valid credentials', () => {
      router
      router.post("/login", async (req, res) => {res
        .send({ username: 'Paskal', password: '123456hJ' })
        
        .then(response => {expect(response.data.status).toBe(201)
          expect(response.data.data[0].role).toBe('trainer');
        });
    })
  })


it('returns 401 and the user object when given valid credentials', () => {
  router
  router.post("/login", async (req, res) => {res
    .send()
    
    .then(response => {expect(response.data.status).toBe(404)
      expect(response.data.data).toBeUndefined();
    });
})
})

it('returns 201 and the user object when given valid credentials', () => {
  router
  router.post("/login", async (req, res) => {res
    .send({ username: 'Pas4kal', password: '1234456hJ' })
    
    .then(response => {expect(response.data.status).toBe(401)
      // expect(response.data.data[0].role).toBe('trainer');
    });
})
})






})