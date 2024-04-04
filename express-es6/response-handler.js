// import fs from "fs";
import fs from "fs/promises";
import { join, dirname } from "path";

const resHandler = (_, res, next) => {
  const __dirname = dirname(import.meta.filename);

  ////   Classic Way
  //   fs.readFile(join(__dirname, "my-page.html"), "utf8", (err, data) => {
  //     res.send(data);
  //   });

  //   Promises Way
  fs.readFile(join(__dirname, "my-page.html"), "utf8")
    .then((data) => res.send(data))
    .catch(console.log);

  //   res.sendFile(join(__dirname, "my-page.html"));
};

export default resHandler;
