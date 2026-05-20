import express from  "express"
import isAuth from "../middleware/isAuth.js";
import { askQuestions } from "../controllers/aiController.js";

const aiRouter = express.Router();
aiRouter.post("/ask-questions", askQuestions)

export default aiRouter;