let express = require('express');

express()
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
  .use(express.static('data', {extensions: ['json']}))
  .listen(8080, (err) => {
    console.log(err || 'Server started!')
  });
