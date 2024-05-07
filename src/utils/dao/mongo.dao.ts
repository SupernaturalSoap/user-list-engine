import { query } from 'express';
import { MongoClient, Db, Collection, Document, Filter } from 'mongodb';

import logger from '../client/logger';

import Dao from './dao';

const config: { [key: string]: string } = {
    APP_MONGO_URL: process.env.APP_MONGO_URL!,
    APP_MONGO_DB_NAME: process.env.APP_MONGO_DB_NAME!
};

export default abstract class MongoDao<ID, T> implements Dao<ID, T> {
    static db: Db;

    static {
        const client: MongoClient = new MongoClient(config.APP_MONGO_URL);
        MongoDao.db = client.db(config.APP_MONGO_DB_NAME);
    }

    private name: string;

    protected constructor(_name: string) {
        this.name = _name;
    }

    private coll(): Collection<Document> {
        return MongoDao.db.collection(this.name);
    }

    private async find(query: Filter<any>, options?: any): Promise<T[]> {
        logger.debug('Finding with query %s', JSON.stringify(query));

        const records: Document[] = await this.coll().find(query, options).toArray();

        const result: T[] = records.map((record: Document) => {
            record.id = record._id;
            delete record._id;
            return record as T;
        });

        return result;
    }

    public async findById(id: any): Promise<T> {
        const query: Filter<Document> = { _id: id };

        logger.debug('Finding by ID %o', query);

        const records: T[] = await this.find(query);

        return records[0];
    }

    /**
     * @param page - Must be greter than 0
     * @param limit - Must be less than equal to 1000
     */
    public async findAll(page: number, limit: number, options?: any): Promise<T[]> {
        const skip = page > 0 ? (page - 1) * limit : 0;
        if (limit > 1000) throw new Error('INVALID_PAGE_LIMIT');

        logger.debug('Finding all with skip %s and limit %s', skip, limit);

        const result: T[] = await this.find({}, { ...options, skip, limit });

        return result;
    }

    public async findAllByUserId(userId: string, page: number, limit: number, options?: any): Promise<T[]> {
        const skip = page > 0 ? (page - 1) * limit : 0;
        if (limit > 1000) throw new Error('INVALID_PAGE_LIMIT');

        logger.debug('Finding all with userId %s skip %s and limit %s',userId, skip, limit);

        const result: T[] = await this.find({userId: userId}, { ...options, skip, limit });

        return result;
    }

    public countAll(): Promise<number> {
        logger.debug('Finding count of all documents');

        return this.coll().estimatedDocumentCount();
    }

    public async countAllFiltered(query: Filter<any>): Promise<number> {
        logger.debug('Finding count of all documents where %s', JSON.stringify(query));

        const records: number = await this.coll().find(query).count();


        return records;
    }

    /**
     *
     * @param id Entity ID
     * @param entity Entity to be upserted
     */
    public async upsert(id: any, entity: T, upsert = true): Promise<void> {
        const query: Filter<Document> = { _id: id };
        const record: Document = Object.assign({}, entity) as Document;

        if (!record.createdAt) record.createdAt = new Date().toISOString();
        record.updatedAt = new Date().toISOString();

        delete record.id;

        const update = { $set: record };

        logger.debug('Upserting with query %o for record %o', query, record);

        await this.coll().updateOne(query, update, { upsert });
    }

    public async delete(id: any): Promise<void> {
        const query: Filter<Document> = { _id: id };

        logger.debug('Deleting record with ID %q', query);

        await this.coll().deleteOne(query);
    }
}
