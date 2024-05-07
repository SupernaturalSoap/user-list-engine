import ListItem from "../../models/listItem";
import MongoDao from "../../utils/dao/mongo.dao";
import ListItemDao from "../listItem-dao";

export default class ListItemDaoMongo extends MongoDao<string, ListItem> implements ListItemDao {
    constructor() {
        super('list-items');
    }
}