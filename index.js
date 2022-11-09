const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const { MongoClient } = require("mongodb");
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// create application/json parser
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "500mb",
  })
);

//Assgin all routes
const routes = require("./routes");
app.use("/", routes);

//mongo db config
const client = new MongoClient(process.env.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect();
const db = client.db("expressmongoapi");
app.set("client", db);

function clientClose(client) {
  // client.close();
  return null;
}
app.set("clientClose", clientClose(client));

//cors
const allowlist = JSON.parse(process.env.corsAllowList);

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;

  let isDomainAllowed = allowlist.indexOf(req.header("Origin")) !== -1;

  if (isDomainAllowed) {
    // Enable CORS for this request
    corsOptions = {
      origin: true,
    };
  } else {
    // Disable CORS for this request
    corsOptions = {
      origin: false,
    };
  }
  callback(null, corsOptions);
};
app.use(cors(corsOptionsDelegate));

app.use(helmet());

app.use(morgan('combined'));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
