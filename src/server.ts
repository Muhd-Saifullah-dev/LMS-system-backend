import app from "./app.ts";
import { PORT } from "./config/env.config.ts";

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
