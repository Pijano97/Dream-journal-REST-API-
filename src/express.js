const express = require("express");

const dreamRouter = require("./routers/dream");
require("./db/mongoose");

const app = express();
const port = 3000;

app.use(express.json());

app.use(dreamRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
