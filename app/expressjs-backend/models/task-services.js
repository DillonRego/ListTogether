const mongoose = require("mongoose");
const listModel = require("./list");
const dotenv = require("dotenv");

dotenv.config();

// Uncomment the following to debug mongoose queries, etc.
mongoose.set("debug", true);

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PWD +
      "@" +
      process.env.MONGO_CLUSTER +
      "/" +
      process.env.MONGO_DB +
      "?retryWrites=true&w=majority",
    {
      useNewUrlParser: true, //useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .catch((error) => console.log(error));

async function getLists() {
  return await listModel.find();
}

async function findListById(id) {
  try {
    return await listModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addList(list) {
  try {
    const listToAdd = new listModel(list);
    const savedList = await listToAdd.save();
    return savedList;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteList(id) {
  return await listModel.findByIdAndDelete(id);
}

exports.getLists = getLists;
exports.findListById = findListById;
exports.addList = addList;
exports.deleteList = deleteList;