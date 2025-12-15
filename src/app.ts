import express from 'express';
import type { Request, Response, NextFunction, Application } from 'express';
import {req_logger} from "./config/logger.ts"
const app: Application = express();
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(req_logger);

app.get('/health-check', (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ success: true, message: 'server is running up' });
});

export default app;
