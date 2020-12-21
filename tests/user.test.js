const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '324123',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}


beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup a new user', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: "Gabriel Lobo",
            email: "lofgrenlobo2@gmail.com",
            password: "221123"
        }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            name: 'Gabriel Lobo',
            email: 'lofgrenlobo2@gmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe("221123")
})

test('Should login a user', async () => {
    const response = await request(app)
    .post('/users/login')
    .send({
        email: userOne.email,
        password: userOne.password
    })
    .expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)

})

test('Shouldn\'t login an unexisting user', async () => {
    await request(app)
    .post('/users/login')
    .send({
        email: 'Gabriel',
        password: userOne.password
    })
    .expect(404)
})

test('Should not login a user with wrong password', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: '400'
        }).expect(404)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unathenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account of user', async () => {
    await request(app)
        .delete('/users/me/')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account of unathenticated user', async () => {
    await request(app)
        .delete('/users/me/')
        .send()
        .expect(401)
})

test('Should send a new avatar', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/tumblr_inline_p1brmcd9Dk1rr08jv_500.jpg')
        .expect(200)
})

