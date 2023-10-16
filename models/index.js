const User = require("./User");
const Blogpost = require("./Blogpost");

Blogpost.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Blogpost, {
  foreignKey: "user_id",
});

module.exports = { User, Blogpost };
