import { register } from "../controller/auth.controller.ts"

import type {Router } from "express";
import express from "express"

const authRouter:Router=express.Router()


authRouter.post("/register",register)


export default authRouter
