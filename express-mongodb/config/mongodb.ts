import { Db, MongoClient } from "mongodb";

export let _db: Db;

export const mongoConnect = (callback: any) => {
  return MongoClient.connect(
    "mongodb+srv://aastruc86:xxxxxxxxxxxxxx@cluster0.89y6xfd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((client) => {
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const getDb = () => {
  return _db || "No database found !";
};
