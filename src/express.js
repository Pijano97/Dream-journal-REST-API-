const express = require("express");

require("./db/mongoose");

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
