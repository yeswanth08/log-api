import { Redis } from 'ioredis';

const redis_queue_client = new Redis();
  
const redis_pubsunb_client = new Redis();

export {redis_pubsunb_client,redis_queue_client};