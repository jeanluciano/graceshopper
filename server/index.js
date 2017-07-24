const path = require("path");
const express = require("express");
const app = express();
const middleware = require('./middleware')

app.use(middleware)

app.use('/api', require('./api'))
app.get("*", function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', "public/index.html"));
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(3000, (err)=>{
  if (err) throw err;
  console.log('shits working.')
})

