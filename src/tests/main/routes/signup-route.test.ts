import { UserModel } from '@/infra/database/models/UserModel'
import { app } from '@/main/server'
import mongoose from 'mongoose'
import request from 'supertest'

describe('SignUp route', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/college-api')
    }, 5000)
    afterAll(async () => {
        await mongoose.disconnect()
    })
    describe('Register', () => {
        test('Should return 200 on signup success', async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            const res = await request(app.server).post('/api/register').send({
                name: 'Joao',
                email: 'joao@gmail.com',
                password: '123',
                password_confirmation: '123'
            })

            expect(res.statusCode).toBe(200)
            await UserModel.deleteOne({
                _id: res.body.id
            })
        })
    })
})
