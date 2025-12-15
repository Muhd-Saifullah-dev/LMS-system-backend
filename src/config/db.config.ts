import mongoose from "mongoose";
import { MONGO_URI } from "./env.config.ts";
import { DbName } from "../constant/variable.constant.ts";
import path from "node:path";
import fs from "fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const connectDb = async () => {
    try {
        const connected = await mongoose.connect(`${MONGO_URI}/${DbName}`);
        console.log(
            `Database connected successfully and host name :: ${connected.connection.host}`,
        );

        // const modelPath = path.join(__dirname, "../src/model");
        // fs.readdirSync(modelPath).forEach((file) => {
        //     if (file !== "index.ts") {
        //         require(path.join(modelPath, file));
        //     }
        // });
    } catch (error) {
        console.log(`error in connecting database : ${error}`);
        process.exit(1);
    }
};

export default connectDb;
