import { Redis } from 'ioredis';

const redis_queue_client = new Redis({
    host: 'redis',  
    port: 6379,
  });
  
  const redis_pubsunb_client = new Redis({
    host: 'redis',
    port: 6379,
  });
export {redis_pubsunb_client,redis_queue_client};