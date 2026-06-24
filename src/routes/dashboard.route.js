import { Router } from "express";
import {
    getChannelStats,
    getChannelVideos,
} from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// dashboard is only for the logged-in channel owner viewing their own stats
router.use(verifyJWT);

router.route("/stats").get(getChannelStats);
router.route("/videos").get(getChannelVideos);

export default router;