const request = require('supertest')
const app = require('../src/app')

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Andrew',
        email: 'idk@idknoww.com',
        password: '123456'
    }).expect(201)
})