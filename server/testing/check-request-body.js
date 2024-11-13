import express from "express";
const router = express.Router();

// check if request is properly getting resolved
router.post("/check-request",async(request,response)=>{
    try {
        const body = request.body;
        return response.status(200).json({body});
    } catch (error) {
        return response.status(500).json({"error":"Internal Server Error"});
    }
});

export default router;