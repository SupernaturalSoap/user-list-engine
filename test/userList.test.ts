import ListItemSvc from '../src/svc/listItem-svc';
import ListItem from "../src/models/listItem";

import { Genre } from "../src/models/genre";

const listItemSvc = new ListItemSvc();

const uuvidRegex = /^[a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}$/i;

let listItemId: string = "";


const listItemPayload: ListItem = {
    "userId" : Math.random().toString(),
    "mediaId": Math.random().toString(),
    "mediaType": "Movie",
    "mediaItem" : {
        "id": "22",
        "title": "Koi Mil Gaya",
        "description": "Love Drama Thriller with SciFi",
        "genre": [Genre.Drama, Genre.SciFi],
        "releaseDate": "12-2-2004",
        "director": "Vinod Chopra",
        "actors": ["Preeti Zinta", "Hrithik Roshan"]
    }
}



describe('addItemToUserList', () => {
    test('return an item Id', async () => {        
        const id: any = await listItemSvc.create(listItemPayload);
        listItemId = id;
        expect(listItemId).toMatch(uuvidRegex);
    });
});


describe('getListItemById', () => {
    test('return an List Item object', async () => {
        const listItem = await listItemSvc.findById(listItemId);
        expect(listItem).toMatchObject({
            userId: expect.any(String),
            mediaId: expect.any(String),
            mediaType: expect.any(String),
            mediaItem: expect.any(Object)
        });
    });
});

