import { dirname } from "path";

const dirName: string = dirname(require?.main?.filename || "");

export default dirName;
