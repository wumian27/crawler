const koa = require("koa");
let router = require('./router')

const app = new koa();

router(app)

app.listen(3000);

console.log("hello work");
