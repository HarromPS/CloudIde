import express from "express";
import { handleCreateUser, handleHandleTestLogin, handleIncomingRequest, handleVerifyTestUser } from "../controllers/test-controllers.js";

const router = express.Router();

// lets say we have a user in data base 

// user is having other requests, its time to verify user using his jwt token 
router.post("/create-test-user", handleCreateUser);

// a user is logged in and a jwt auth token is created
router.post("/login-a-user",handleHandleTestLogin);

// user is having other requests, its time to verify user using his jwt token 
router.post("/verify-user",handleVerifyTestUser);

// check if request is properly getting resolved
router.post("/check-request",handleIncomingRequest);

// PUT creates or replaces a resource, while PATCH modifies an existing resource 
// PUT has high bandwidth, while PATCH has comparatively low bandwidth
// router.patch();

export default router;