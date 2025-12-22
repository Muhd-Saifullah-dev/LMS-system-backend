import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const PORT: number = Number(process.env.PORT) || 8080;
const MONGO_URI: string = process.env.MONGO_URI || "";
const PASSWORD = process.env.SMTP_PASSWORD;
const EMAIL = process.env.SMTP_EMAIL;
const COOKIE_EXPIRE = Number(process.env.COOKIE_EXPIRE);
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRE = process.env.JWT_EXPIRE;
export { PORT, MONGO_URI, PASSWORD, EMAIL, COOKIE_EXPIRE, JWT_SECRET_KEY, JWT_EXPIRE };
