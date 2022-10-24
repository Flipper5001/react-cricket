require("dotenv").config({ path: "../config.env" });

const fs = require("fs");

const Team = require("../server/models/Team")
const User = require("../server/models/User")
const Score = require("../server/models/Score")



const connectDB = require("../server/config/connection");

connectDB();

const users = JSON.parse(fs.readFileSync(`${__dirname}/userSeeds.json`, "utf-8"));

const importData = async () => {
  try {
    await User.create(users);
    console.log("Data Successfully imported 👌");
    process.exit();
  } catch (error) {
    console.log(`ERROR 💥: ${error}`);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Post.deleteMany({});
    console.log("Data successfully deleted");
    process.exit();
  } catch (error) {
    console.log(`ERROR 💥: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}