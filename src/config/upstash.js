import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import "dotenv/config";

const ratelimit = new Ratelimit({
  
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(
    process.env.NODE_ENV === "development" ? 30 : 4,
    "60 s"
  )
});

export default ratelimit;
