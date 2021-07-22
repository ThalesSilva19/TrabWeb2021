var app = require('./app.js');

console.log(process.env.PORT)
app.listen(process.env.PORT || 3001);
