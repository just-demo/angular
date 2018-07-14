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

// let fs = require('fs');
// app.get('/translations', (req, res) => {
//   fs.readFile('./data/translations.json', 'utf-8', (err, data) => {
//     res.send(err ? JSON.stringify({}) : data);
//     console.log(err || 'Returned translations!')
//   });
// });
