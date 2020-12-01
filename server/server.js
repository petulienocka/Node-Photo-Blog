const express = require("express");
const path = require("path");
const Knex = require("knex");
const knexFile = require("./knexfile.js");
const session = require("express-session");
const { Model } = require("objection");
const key = require("./config/key");
const cors = require("cors");
const usersRoute = require("./routes/users.js");
const postsRoute = require("./routes/posts");
const KnexSessionStore = require("connect-session-knex")(session); // Store sessions in MySQL database using Knex (sessions MUST be stored outside of cache)

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000"
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const knex = Knex(knexFile.development);
Model.knex(knex); // here i am binding all models to knex

const store = new KnexSessionStore({ knex });

app.use(
  session({
    secret: key.session,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60000000
    },
    store: store
  })
);

app.use(usersRoute);
app.use(postsRoute);

app.use("/images", express.static(path.join(__dirname, "files", "images")));

const server = app.listen(9090, error => {
  if (error) {
    console.log("Error running Express");
  }
  console.log("Server is running on port", server.address().port);
});
