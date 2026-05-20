import express from "express";
import isAuth from "../middleware/isAuth.js";
import { addReview, getReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/createreview", isAuth, addReview);
reviewRouter.get("/getreview", getReviews);

export default reviewRouter;