import { createClient } from 'redis';
import { promisify } from 'util';

export class CacheRepository {
  client: any;
  get: any;
  set: any;
  del: any;

  async connect() {
    if (!this.client) {
      this.client = createClient(`//${process.env.REDIS_HOST}:6379`);
      this.get = promisify(this.client.get).bind(this.client);
      this.set = promisify(this.client.set).bind(this.client);
      this.del = promisify(this.client.del).bind(this.client);
    }
  }

  async getAndRemove(key) {
    this.connect();
    const value = await this.get(key);
    await this.del(key);
    return value;
  }
  
  async add(key, value) {
    this.connect();
    return this.set(key, value, 'EX', 60 * 60);
  }
}
