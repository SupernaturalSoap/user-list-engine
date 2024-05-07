import ListItem from "../models/listItem";
import Dao from "../utils/dao/dao";

export default interface ListItemDao extends Dao<string, ListItem> {
    
    findAllByUserId(userId: string, page: number, limit: number): Promise<ListItem[]>;
}