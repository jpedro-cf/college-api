import { UserModel } from '@/infra/database/models/UserModel'
import { app } from '@/main/server'
import mongoose from 'mongoose'
import request from 'supertest'
import { hash } from 'bcrypt'

describe('Authentication', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/college-api')
    }, 5000)
    afterAll(async () => {
        await mongoose.disconnect()
    })
    describe('Login', () => {
        test('Should return 200 on login success', async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            const password = await hash('123', 8)
            const user = new UserModel({
                name: 'Joao',
                email: 'joaoteste@gmail.com',
                password
            })
            await user.save()
            const res = await request(app.server).post('/api/login').send({
                email: 'joaoteste@gmail.com',
                password: '123'
            })

            expect(res.statusCode).toBe(200)
            await UserModel.deleteOne({
                _id: res.body.id
            })
        })
    })
})
