import { createClient } from 'redis';

import logger from '../client/logger';

const config : { [key: string]: string } = {
    host: process.env.REDIS_HOST!,
    port: process.env.REDIS_PORT!
};

const timeToExpire: number = 60;

export class RedisClient {
  private client: any;

  constructor() {
    this.client = createClient(config);
    this.connect();

    this.client.on('error', (err: Error) => {
      logger.debug('Redis Client Error:', err);
    });

    this.client.on('connect', () => {
      logger.debug('Connected to Redis');
    });
  }

  async connect(): Promise<void> {
    await this.client.connect();
  }

  async disconnect(): Promise<void> {
    await this.client.quit();
  }


  async get(key: string): Promise<string | null> {
    const value = await this.client.get(key);
    logger.debug('Searching in redis for key : %s,', key);
    return value ? value : null;
  }

  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
    await this.client.expire(key, timeToExpire);

    logger.debug('Setting in redis for key : %s and value : %s for %s seconds,', key, value, timeToExpire);
  }
}
