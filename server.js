const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { sequelize, secretKey } = require("./config/connection");
const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");

const handlebarsHelpers = require("handlebars-helpers")();
const hbs = exphbs.create({
  defaultLayout: "main",
  helpers: handlebarsHelpers, // Include handlebarsHelpers when initializing Handlebars
});

const routes = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: secretKey,
  cookie: {
    maxAge: 3600000, // Session will last for an hour
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/public",
  express.static(path.join(__dirname, "public"), {
    setHeaders: (res, path, stat) => {
      if (path.endsWith(".js")) {
        res.set("Content-Type", "application/javascript");
      }
    },
  })
);

app.use(routes);

// Other middleware and route setup

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening on http://localhost:${PORT}`)
  );
});
