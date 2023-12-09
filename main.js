const Express = require('express');
const _ = require("./fakeDb.js");

const app = Express();

app.use(Express.json());
app.use("/items", require("./routes/items.js"));

const server = app.listen(3000);
module.exports = { app, server };