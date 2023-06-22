const request = require('supertest');
const app = require('../server');
const fs = require('fs');
const { rootFolder } = require('../rootFile');
const authorizationToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTMzMzdkNzU4NmU1YzZmODRhYzNkYyIsImlhdCI6MTY4NzM3MDc1MH0.FZMb4v4_yHaiMNsNKQ_IIjMT55Tmp9k5SCgbcYPxc8Q";
const removingBookCollectionId = "649474710bfb9570c0cc2b2c";

describe('post /api/book/add', () => {
    it("without token error", async () => {
        const body = {
            "title": "test book",
            "authorId": "64933cf63668d7906c0e63ae",
            "genreId": "64933d703668d7906c0e63b1",
            "isbn": "kkbmkg-vnjvfd",
            "qty": "2"
        }

        const response = await request(app)
            .post('/api/book/add')
            .send(body)
            .set('Accept', 'multipart/form-data')

        expect(response.status).toBe(403);
        expect(response.body.msg).toEqual(`please provide token`);
        expect(response.body.error).toEqual(true);
        expect(response.body.error).toEqual(true);
    });

    it("check input validation", async () => {
        const body = {
            "authorId": "64933cf63668d7906c0e63ae",
            "genreId": "64933d703668d7906c0e63b1",
            "isbn": "kkbmkg-vnjvfd",
            "qty": "2"
        }

        const response = await request(app)
            .post('/api/book/add')
            .send(body) // Missing title
            .set('Accept', 'multipart/form-data')
            .set('Authorization', authorizationToken);

        expect(response.status).toBe(422);
        expect(response.body.msg).toEqual(`\"title\" is required`);
        expect(response.body.error).toEqual(true);
    });

    it('should post a book', async () => {
        const body = {
            "title": "My life my journey",
            "authorId": "64933cf63668d7906c0e63ae",
            "genreId": "64933d703668d7906c0e63b1",
            "isbn": "kkbmkg-vnjvfd",
            "qty": "2"
        }
        const response = await request(app)
            .post('/api/book/add')

            .set('Accept', 'multipart/form-data')
            .set('Authorization', authorizationToken)
            .set('content-type', 'multipart/form-data')
                .field('title', body.title)
                .field('authorId', body.authorId)
                .field('genreId', body.genreId)
                .field('isbn', body.isbn)
                .field('qty', body.qty)
                .attach('image', fs.readFileSync(`${rootFolder}/images/test_image.png`))
        console.log("response.body",response.body)
        expect(response.body.msg).toBe("book inserted successfully");
        expect(response.statusCode).toBe(201);
        expect(response.body.error).toBe(false);
        expect(response.body.body).toHaveProperty('_id');
        expect(response.body.body.title).toBe(body.title);
        expect(response.body.body.authorId).toBe(body.authorId);
        expect(response.body.body.genreId).toBe(body.genreId);
        expect(response.body.body.isbn).toBe(body.isbn);
        expect(response.body.body.qty).toBe(Number(body.qty));
        expect(response.body.body).toHaveProperty('image');
    });

    it('check image validation', async () => {
        const body = {
            "title": "My life my journey",
            "authorId": "64933cf63668d7906c0e63ae",
            "genreId": "64933d703668d7906c0e63b1",
            "isbn": "kkbmkg-vnjvfd",
            "qty": "2"
        }
        const response = await request(app)
            .post('/api/book/add')

            .set('Accept', 'multipart/form-data')
            .set('Authorization', authorizationToken)
            .set('content-type', 'multipart/form-data')
                .field('title', body.title)
                .field('authorId', body.authorId)
                .field('genreId', body.genreId)
                .field('isbn', body.isbn)
                .field('qty', body.qty)
                
        expect(response.body.msg).toBe("please provide image");
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe(true);
    });
});

describe('post /api/book/addBookToCollection', () => {
    it("without token error", async () => {
        const body = {
            "bookId": "649343c88f375f175df04d17"
        }

        const response = await request(app)
            .post('/api/book/addBookToCollection')
            .send(body)
            .set('Accept', 'application/json')

        expect(response.status).toBe(403);
        expect(response.body.msg).toEqual(`please provide token`);
        expect(response.body.error).toEqual(true);
        expect(response.body.error).toEqual(true);
    });

    it("check input validation", async () => {
        const body = {
        }

        const response = await request(app)
            .post('/api/book/addBookToCollection')
            .send(body) // Missing bookId
            .set('Accept', 'application/json')
            .set('Authorization', authorizationToken);

        expect(response.status).toBe(422);
        expect(response.body.msg).toEqual(`\"bookId\" is required`);
        expect(response.body.error).toEqual(true);
    });

    it('should book add to user collection', async () => {
        const body = {
            "bookId": "649343c88f375f175df04d17"
        }
        const response = await request(app)
            .post('/api/book/addBookToCollection')
            .send(body)
            .set('Accept', 'application/json')
            .set('Authorization', authorizationToken);

        expect(response.statusCode).toBe(201);
        expect(response.body.error).toBe(false);
        expect(response.body.msg).toBe("book successfully added to user collection");
        expect(response.body.body).toHaveProperty('_id');
        expect(response.body.body.bookId).toBe(body.bookId);
        expect(response.body.body).toHaveProperty("userId");
    });
});


describe('delete /api/book/removeBookToCollection/:id', () => {
    it("without token error", async () => {
        const id = "649351f224858a1804309794";
        const response = await request(app)
            .delete(`/api/book/removeBookToCollection/${id}`)
            .send()
            .set('Accept', 'application/json')

        expect(response.status).toBe(403);
        expect(response.body.msg).toEqual(`please provide token`);
        expect(response.body.error).toEqual(true);
        expect(response.body.error).toEqual(true);
    });

    it("book should be remove from user book collection", async () => {
        const response = await request(app)
            .delete(`/api/book/removeBookToCollection/${removingBookCollectionId}`)
            .send()
            .set('Accept', 'application/json')
            .set('Authorization', authorizationToken);

        expect(response.status).toBe(200);
        expect(response.body.msg).toEqual(`book successfully remove from user collection`);
        expect(response.body.error).toEqual(false);
    });

    it("book should be remove from user book collection", async () => {
        const id = "bvfjhrtbks3563";
        const response = await request(app)
            .delete(`/api/book/removeBookToCollection/${id}`)
            .send()
            .set('Accept', 'application/json')
            .set('Authorization', authorizationToken);

        expect(response.status).toBe(500);
        expect(response.body.error).toEqual(true);
    });
});

describe('post book review /api/book/addBookReview', () => {
    it("without token error", async () => {
        const body = {
            "bookId": "649342458147668cb7baf4d0",
            "rating": "3"
        }
        const response = await request(app)
            .post(`/api/book/addBookReview`)
            .send(body)
            .set('Accept', 'application/json')

        expect(response.status).toBe(403);
        expect(response.body.msg).toEqual(`please provide token`);
        expect(response.body.error).toEqual(true);
        expect(response.body.error).toEqual(true);
    });

    it("add book review", async () => {
        const body = {
            "bookId": "649342458147668cb7baf4d0",
            "rating": "3"
        }

        const response = await request(app)
            .post('/api/book/addBookReview')
            .send(body)
            .set('Accept', 'application/json')
            .set('Authorization', authorizationToken);
        expect(response.status).toBe(201);
        expect(response.body.msg).toEqual(`book review successfully added`);
        expect(response.body.error).toEqual(false);
        expect(response.body.body).toHaveProperty('_id');
        expect(response.body.body.bookId).toBe(body.bookId);
        expect(response.body.body).toHaveProperty("userId");
    });

    it("check input validation", async () => {
        const body = {
            "bookId": "649342458147668cb7baf4d0",
        }

        const response = await request(app)
            .post('/api/book/addBookReview')
            .send(body) // Missing rating
            .set('Accept', 'application/json')
            .set('Authorization', authorizationToken);

        expect(response.status).toBe(422);
        expect(response.body.msg).toEqual(`\"rating\" is required`);
        expect(response.body.error).toEqual(true);
    });
});


describe('get books /api/book', () => {
    it("without token error", async () => {

        const response = await request(app)
            .get(`/api/book`)
            .send()
            .set('Accept', 'application/json')

        expect(response.status).toBe(403);
        expect(response.body.msg).toEqual(`please provide token`);
        expect(response.body.error).toEqual(true);
        expect(response.body.error).toEqual(true);
    });

    it("get all books", async () => {

        const response = await request(app)
            .get('/api/book')
            .send()
            .set('Accept', 'application/json')
            .set('Authorization', authorizationToken);
        expect(response.status).toBe(200);
        expect(response.body.msg).toEqual(`all books data`);
        expect(response.body.error).toEqual(false);
    });

    it("get books by book title", async () => {
        const search = "python"
        const field = "title"
        const response = await request(app)
            .get(`/api/book?search=${search}&field=${field}`)
            .send()
            .set('Accept', 'application/json')
            .set('Authorization', authorizationToken);

        expect(response.status).toBe(200);
        expect(response.body.msg).toEqual(`all books data`);
        expect(response.body.error).toEqual(false);
    });

    it("get books by genre", async () => {
        const search = "action"
        const field = "genre"
        const response = await request(app)
            .get(`/api/book?search=${search}&field=${field}`)
            .send()
            .set('Accept', 'application/json')
            .set('Authorization', authorizationToken);

        expect(response.status).toBe(200);
        expect(response.body.msg).toEqual(`all books data`);
        expect(response.body.error).toEqual(false);
    });

    it("get books by author name", async () => {
        const search = "john"
        const field = "author"
        const response = await request(app)
            .get(`/api/book?search=${search}&field=${field}`)
            .send()
            .set('Accept', 'application/json')
            .set('Authorization', authorizationToken);

        expect(response.status).toBe(200);
        expect(response.body.msg).toEqual(`all books data`);
        expect(response.body.error).toEqual(false);
    });
});