import express from "express"
import type {Router } from "express"
import authRouter from "./authRouter.ts"


const apiV1Router:Router=express.Router()


apiV1Router.use("/auth",authRouter)

export default apiV1Router