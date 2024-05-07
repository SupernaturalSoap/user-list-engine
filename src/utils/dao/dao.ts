export default interface Dao<ID, T> {
    findById(id: ID): Promise<T>;

    findAll(page: number, limit: number): Promise<T[]>;

    countAll(): Promise<number>;

    upsert(id: ID, entity: T): Promise<void>;

    delete(id: ID): Promise<void>;
}
