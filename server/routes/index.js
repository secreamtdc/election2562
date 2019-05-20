const express = require('express')
const router = express.Router()
const { bulk } = require("../module/mongo");

const ctrl = require('../controllers/index')
const search = require('../controllers/search')

  router.get('/que/:data', (ctrl.que));
  router.post('/test', (ctrl.test));
  router.post('/search/:index/', (search.mount));
  router.post('/search/sentiment/:index/', (search.sentiment));
  router.get('/search/input', (search.input)); 
  router.get('/search/eachPlus', (search.eachPlus)); 
  router.get('/search/eachNegative', (search.eachNegative)); 

  

  router.get('/ping', (req, res) => {
      res.json('pong');

  })


module.exports = router
