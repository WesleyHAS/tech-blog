//const sequelize = require("../config/connection");
const { User, Blogpost, Comment } = require("../models");
const { sequelize } = require("../config/connection");

// Update imports to use .js files
const userData = require("./userData.json");
const blogData = require("./blogData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    for (const post of blogData) {
      await Blogpost.create({
        ...post,
        user_id: users.find(
          (user) => user.dataValues.username === post.user_id
        ),
      });
    }

    for (const comment of commentData) {
      await Comment.create({
        ...comment,
        user_id: users.find((user) => user.dataValues.id === comment.user_id),
        post_id: comment.post_id,
      });
    }
    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    process.exit(0);
  }
};

seedDatabase();
