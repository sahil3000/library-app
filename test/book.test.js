const request = require('supertest');
const app = require('../server');
const authorizationToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTMzMzdkNzU4NmU1YzZmODRhYzNkYyIsImlhdCI6MTY4NzM3MDc1MH0.FZMb4v4_yHaiMNsNKQ_IIjMT55Tmp9k5SCgbcYPxc8Q";

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
            .set('Accept', 'application/json')

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
            .set('Accept', 'application/json')
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
            .send(body)
            .set('Accept', 'application/json')
            .set('Authorization', authorizationToken);

        expect(response.statusCode).toBe(201);
        expect(response.body.error).toBe(false);
        expect(response.body.msg).toBe("book inserted successfully");
        expect(response.body.body).toHaveProperty('_id');
        expect(response.body.body.title).toBe(body.title);
        expect(response.body.body.authorId).toBe(body.authorId);
        expect(response.body.body.genreId).toBe(body.genreId);
        expect(response.body.body.isbn).toBe(body.isbn);
        expect(response.body.body.qty).toBe(Number(body.qty));
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
