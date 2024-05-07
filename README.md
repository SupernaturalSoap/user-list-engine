# user-list-engine
## Run in development mode
- Make sure you have all the dependencies installed. Run `npm install` in root.
- Install mongo.
- Install redis
- Create .env file in root and add env variables in it
- Execute `npm run start:dev`

## Run tests
- Execute `npm run test`

### ENV Variables
```
LANG=en-IN
TZ=Asia/Kolkata
APP_NAME=user-list-engine
APP_PORT=9090
APP_LOGGER_DIR=.
APP_LOGGER_LEVEL=debug
APP_MONGO_URL=mongodb://localhost/user-list-engine
APP_MONGO_DB_NAME=user-list-engine
NODE_ENV=development
BASE_URL=http://localhost:9090
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Design Descisons

## Layered Architecture
- To ensure modularity and clean code layered architecture used.
- Three Layers : 
   - Presentation( route layer ), 
   - Business (service layer), 
   - Data (data layer)

## Caching 
- Redis used for caching to enhance performance of the app.


## Models 
- To ensure scalability and performance the following models are adpted

- UserList {
    userId: string,
    moviesAndShows: Media[]
}

- ListItem {
    userId: string,
    mediaId: string,
    mediaType: string,
    mediaItem: Media
}

- Media = Movie | TVShow;

- Movie {
    id: string,
    title: string,
    description: string,
    genre: Genre[],
    releaseDate: string,
    director: string,
    actors: string[]
}

- TVShow {
    id: string,
    title: string,
    description: string,
    genre: string[],
    episodes: Episode[]
}

- Episode {
    episodenumber: number,
    seasonNumber: number,
    releaseDate: Date,
    director: string,
    actors: string[]
}

# API Reference

## Create User List Item

### API Details
```
API : Create Event

End point : /api/listItem

Method : POST

Parameters :  
{
    "userId" : "3",
    "mediaId": "22",
    "mediaType": "Movie",
    "mediaItem" : {
        "id": "22",
        "title": "Koi Mil Gaya",
        "description": "Love Drama Thriller with SciFi",
        "genre": ["Drama", "SciFi"],
        "releaseDate": "12-2-2004",
        "director": "Vinod Chopra",
        "actors": ["Preeti Zinta", "Hrithik Roshan"]
    }
}

Response : 
{
    "message": "Successful",
    "data": "3f7389be-44df-4f6e-b4b0-d4600437c637"
}

---------------------------------------------------------

API : Get All User List Items

End Point : /api/listItem/userId/:userId?page=1&limit=3

Method : GET

Response :
{
    "message": "Sucessful",
    "data": {
        "userId": "1",
        "moviesAndShows": [
            {
                "id": "11",
                "title": "Kaho Na Pyar Hai",
                "description": "Love Drama Thriller",
                "genre": [
                    "Drama",
                    "Romance"
                ],
                "releaseDate": "12-2-2002",
                "director": "Vinod Chopra",
                "actors": [
                    "Amisha Patel",
                    "Hrithik Roshan"
                ]
            },
            {
                "id": "12",
                "title": "Suits",
                "description": "Drama Thriller",
                "genre": [
                    "Drama",
                    "Romance"
                ],
                "episodes": [
                    {
                        "episodeNumber": "1",
                        "seasonNumber": "1",
                        "releaseDate": "12-2-2012",
                        "director": "Russo Brothers",
                        "actors": [
                            "Mike",
                            "Harvey",
                            "Louis",
                            "Donna",
                            "Rachel",
                            "Jessica"
                        ]
                    },
                    {
                        "episodeNumber": "1",
                        "seasonNumber": "1",
                        "releaseDate": "12-2-2012",
                        "director": "Russo Brothers",
                        "actors": [
                            "Mike",
                            "Harvey",
                            "Louis",
                            "Donna",
                            "Rachel",
                            "Jessica"
                        ]
                    }
                ]
            },
            {
                "id": "22",
                "title": "Koi Mil Gaya",
                "description": "Love Drama Thriller with SciFi",
                "genre": [
                    "Drama",
                    "SciFi"
                ],
                "releaseDate": "12-2-2004",
                "director": "Vinod Chopra",
                "actors": [
                    "Preeti Zinta",
                    "Hrithik Roshan"
                ]
            }
        ],
        "pagination": {
            "page": 1,
            "limit": 3,
            "total": 3
        }
    }
}

------------------------------------------------------------------------

API : Get List Item By Id

End Point : /api/listItem/81d03626-e641-4ba9-b276-1c69d32497df

Method : GET

Response :
{
    "message": "Sucessful",
    "data": {
        "createdAt": "2024-05-07T05:17:01.771Z",
        "mediaId": "22",
        "mediaItem": {
            "id": "22",
            "title": "Koi Mil Gaya",
            "description": "Love Drama Thriller with SciFi",
            "genre": [
                "Drama",
                "SciFi"
            ],
            "releaseDate": "12-2-2004",
            "director": "Vinod Chopra",
            "actors": [
                "Preeti Zinta",
                "Hrithik Roshan"
            ]
        },
        "mediaType": "Movie",
        "updatedAt": "2024-05-07T05:17:01.774Z",
        "userId": "1",
        "id": "81d03626-e641-4ba9-b276-1c69d32497df"
    }
}


------------------------------------------------------------------------

API : Remove Item From User List

End Point : /api/listItem

Method : DELETE

Parameters: 
{
    "id" : "3f7389be-44df-4f6e-b4b0-d4600437c637"
}

Response : 
{
    "message": "Sucessfully Removed From User List"
}

```