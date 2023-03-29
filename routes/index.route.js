import express from "express";
import { indexPage, signinPage, signupPage, signup, signin, signout } from "../controller/index.controller.js";
import { verify } from "../middleware/authenticate.js";
const router = express.Router();

// htto://localhost:3002/
router.get("/", indexPage);
router.get("/signin", signinPage);//ye jab sign krna pdega emailand password allready rahega
router.get("/signup", signupPage);
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", verify, signout);
export default router;