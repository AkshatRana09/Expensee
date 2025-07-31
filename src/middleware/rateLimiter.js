import ratelimit from "../config/upstash.js";
const ratelimiter = async (req, res, next) => {
    try {
        //userId,
        const { success } = await ratelimit.limit(req.ip);

        if(!success) {
            return res.status(429).json({ message: "Too many requests, please try again later." });
        }
        next();
    } catch (error) {
        console.error("Rate limiter error:", error);
        next(error);
        // res.status(500).json({ message: "Internal Server Error" });
    }
};   
export default ratelimiter;