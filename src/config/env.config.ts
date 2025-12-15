import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const PORT:number = Number(process.env.PORT )|| 8080;
const MONGO_URI:string=process.env.MONGO_URI || ""

export{
PORT,
MONGO_URI,
}
