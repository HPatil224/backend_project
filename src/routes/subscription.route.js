import { Router } from "express";
import {
    getSubscribedChannels,
    getUserChannelSubscribers,
    toggleSubscription,
} from "../controllers/subscription.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// only a logged-in user can subscribe/unsubscribe
router.route("/c/:channelId").post(verifyJWT, toggleSubscription);

// public - anyone can see who subscribes to a channel
router.route("/c/:channelId/subscribers").get(getUserChannelSubscribers);

// public - anyone can see which channels a user has subscribed to
router.route("/u/:subscriberId/channels").get(getSubscribedChannels);

export default router;