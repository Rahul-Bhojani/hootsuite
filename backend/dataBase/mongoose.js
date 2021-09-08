const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Rahul:Rahul@1998@staff.aqwpb.mongodb.net/test",
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      () => {
        console.log("Connected to Database...");
      }
    );
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectDb;
