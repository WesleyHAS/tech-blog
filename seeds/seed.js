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
      const user = users.find((user) => user.dataValues.id === post.user_id);
      if (user) {
        await Blogpost.create({
          ...post,
          user_id: user.id,
        });
      } else {
        console.error(`User not found for post with user_id: ${post.user_id}`);
      }
    }

    for (const comment of commentData) {
      const user = users.find((user) => user.dataValues.id === comment.user_id);
      if (user) {
        await Comment.create({
          ...comment,
          user_id: user.id,
        });
      } else {
        console.error(
          `User not found for comment with user_id: ${comment.user_id}`
        );
      }
    }
    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    process.exit(0);
  }
};

seedDatabase();
