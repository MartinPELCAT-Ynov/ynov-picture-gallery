import Redis from "ioredis";
import { ClientOpts } from "redis";

const port = 6380;

export const REDIS_CONFIG: Partial<ClientOpts> = {
  port,
};

const IOREDIS_CONFIG: Redis.RedisOptions = {
  port,
};

export const redisStore = new Redis(IOREDIS_CONFIG);
