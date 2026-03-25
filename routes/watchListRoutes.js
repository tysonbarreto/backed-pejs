import express from "express";
import { updateFromWatchlist, removeFromWatchlist, addToWatchlist } from "../controllers/watchListController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchlistSchema } from "../validators/watchlistValidator.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/",validateRequest(addToWatchlistSchema), addToWatchlist); //middleware can be added to specific routers as a parameter
// router.post("/login",login);
// router.post("/logout",logout);

router.delete("/:id",removeFromWatchlist);

router.put("/:id",updateFromWatchlist);

export default router;
