const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { sequelize, secretKey } = require("./config/connection");
const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");

const routes = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: secretKey,
  cookie: {
    maxAge: 300000,
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

// Other middleware and route setup

app.listen(PORT, () => {
  console.log(`Now listening on http://localhost:${PORT}`);
});

/*const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");

const routes = require("./controllers");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
*/
