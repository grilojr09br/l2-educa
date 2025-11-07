"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profileController_1 = require("../controllers/profileController");
const auth_1 = require("../middleware/auth");
const rateLimiter_1 = require("../middleware/rateLimiter");
const router = (0, express_1.Router)();
router.patch('/username', auth_1.supabaseAuthMiddleware, rateLimiter_1.rateLimiterMiddleware, profileController_1.updateUsername);
router.get('/username-status', auth_1.supabaseAuthMiddleware, profileController_1.getUsernameStatus);
exports.default = router;
//# sourceMappingURL=profile.js.map