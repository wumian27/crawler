const koa = require("koa");
let router = require("./router");
// require('./apify')

const agentPachu =  require('./superAgent')

const app = new koa();

router(app);
// agentPachu()


app.listen(3000);

console.log("hello work pachu");
