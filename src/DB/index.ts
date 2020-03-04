import mongoose from "mongoose";

const connect_db = async () => {
  try {
    mongoose.set("useCreateIndex", true);

    let db = process.env.DEV
      ? await mongoose.connect(`mongodb://127.0.0.1:27017/wallet`, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false
        })
      : await mongoose.connect(
          `mongodb+srv://ECOLOTE:${process.env.DB_PASS}@cluster0-u30oq.mongodb.net/wallet`,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
          }
        );

    return Promise.resolve({ msg: "Data base conected" });
  } catch (error) {
    console.log(error);

    Promise.reject("Error with the data base conection");
  }
};

export default connect_db;
