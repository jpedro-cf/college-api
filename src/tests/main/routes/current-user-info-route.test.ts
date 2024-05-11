import { UserModel } from '@/infra/database/models/UserModel'
import { app } from '@/main/server'
import mongoose from 'mongoose'
import request from 'supertest'
import { hash } from 'bcrypt'
import { JWTAdapter } from '@/infra/cryptography/Jwt'

describe('CurrentUserInfo', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/college-api')
    }, 5000)
    afterAll(async () => {
        await mongoose.disconnect()
    })
    describe('current_user', () => {
        test('Should return 200 on login success', async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            const password = await hash('123', 8)
            const jwt = new JWTAdapter()
            const token = await jwt.encrypt('any_token')
            const user = new UserModel({
                name: 'Joao',
                email: 'joaoteste@gmail.com',
                password,
                access_token: token
            })
            await user.save()
            const res = await request(app.server)
                .get('/api/current_user')
                .send()
                .set('Cookie', ['access_token=' + token])

            expect(res.statusCode).toBe(200)
            await UserModel.deleteOne({
                _id: res.body.id
            })
        })
        test('Should return 401 if no access token provided', async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            const res = await request(app.server).get('/api/current_user').send()
            expect(res.statusCode).toBe(401)
        })
    })
})
