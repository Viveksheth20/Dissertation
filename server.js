const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.use((req, res, next) => {
  const { method, originalUrl, protocol } = req;
  console.log(`${method} ${originalUrl} - ${protocol}://${req.get('host')}${req.originalUrl}]\n`);
  next();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server is listening on " + port);
});