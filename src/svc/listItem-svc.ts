import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/client/logger';

import ListItem from '../models/listItem';
import ListItemDaoMongo from '../dao/mongo/listItem-dao-mongo';
import UserList from '../models/userList';

import { Media } from '../models/userList';
import { RedisClient } from '../utils/client/redis';

export default class ListItemSvc {
    private listItemDao: ListItemDaoMongo;
    private redisClient: RedisClient;

    constructor() {
        this.listItemDao = new ListItemDaoMongo();
        this.redisClient = new RedisClient();
    }

    async create(context: any) {
        const listItemId = uuidv4();
        if(context.userId == null || context.userId == undefined || context.userId == "") {
            throw new Error('INVALID_LIST_ITEM');
        }

        if(context.mediaId == null || context.mediaId == undefined || context.mediaId == "") {
            throw new Error('INVALID_LIST_ITEM');
        }

        const count: number = await this.listItemDao.countAllFiltered({userId: context.userId, mediaId: context.mediaId});
        if(count > 0) {
            throw new Error('INVALID_LIST_ITEM');
        }

        if(context.mediaType == null || context.mediaType == undefined || context.mediaType == "") {
            throw new Error('INVALID_LIST_ITEM');
        }

        if(context.mediaItem == null || context.mediaItem == undefined) {
            throw new Error('INVALID_LIST_ITEM');
        }

        const listItem: ListItem = {
            userId: context.userId,
            mediaId: context.mediaId,
            mediaType: context.mediaType,
            mediaItem: context.mediaItem
        }

        await this.listItemDao.upsert(listItemId, listItem);

        logger.info(`UserList created with ID ${listItemId}`);

        return listItemId;
    }

    async update(id: string, context: any) {
        const listItem: ListItem = await this.listItemDao.findById(id);

        if(!listItem) {
            throw new Error('INVALID_LIST_ITEM_ID');
        }

        delete context.id;
        const update: any = context;

        await this.listItemDao.upsert(id, { ...listItem, ...update });
        logger.info(`listItem updated with id: ${id}`);

        return listItem;
    }

    async findById(id: string) {
        let item: ListItem;

        const cached = await this.redisClient.get(id);
        if(cached == null) {
            logger.debug("Cache Miss !");
            item = await this.listItemDao.findById(id);
            await this.redisClient.set(id, JSON.stringify(item));
        } else {
            logger.debug("Cache Hit !");
            item = JSON.parse(cached);
        }
        
        return item;
    }

    async removeListItem(id: string) {
        await this.listItemDao.delete(id);
        return;
    }

    async countAllByUserId(userId: string) {
        const count: number = await this.listItemDao.countAllFiltered({userId: userId});
        return count;
    }


    async getUserListItems(userId: string, page: string, limit: string) {
        const _limit = parseInt(limit);
        const _page =  parseInt(page);

        let userList: UserList;

        const redisKey: string = userId + '_' + page + '_' + limit;
        const cached = await this.redisClient.get(redisKey);
        if(cached == null) {
            logger.debug("Cache Miss!");

            const listItems: ListItem[] = await this.listItemDao.findAllByUserId(userId, _page, _limit);
            let media: Media[] = [];
            listItems.forEach(item => media.push(item.mediaItem));

            userList = {
                userId: userId,
                moviesAndShows: media
            }

            await this.redisClient.set(redisKey, JSON.stringify(userList));

        } else {
            logger.debug("Cache Hit !");
            userList = JSON.parse(cached);
        }

        return userList;
    }
}