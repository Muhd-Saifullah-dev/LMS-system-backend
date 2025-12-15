import app from "./app.ts";
import connectDb from "./config/db.config.ts";
import { PORT } from "./config/env.config.ts";

(async function () {
    await connectDb()
        .then(() => {
            console.log("database connected!");
            app.listen(PORT,() => console.log(`server is running on port ${PORT}`));
        })

        .catch((error) => {
            console.log(error);
            process.exit(1);
        });
})();
