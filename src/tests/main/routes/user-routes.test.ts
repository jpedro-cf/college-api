import { JWTAdapter } from '@/infra/cryptography/Jwt'
import { UserModel } from '@/infra/database/models/UserModel'
import { app } from '@/main/server'
import mongoose from 'mongoose'
import request from 'supertest'

describe('User Routes', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/college-api')
    }, 7000)
    afterAll(async () => {
        await mongoose.disconnect()
    })
    describe('PUT', () => {
        test('should return 401 if unauthorized', async () => {
            const jwt = new JWTAdapter()

            const token = await jwt.encrypt('any_token')
            const second_token = await jwt.encrypt('token_teste')

            const user = new UserModel({
                name: 'Joao',
                email: 'joaoteste@email.com',
                password: '123',
                access_token: token
            })
            const user2 = new UserModel({
                name: 'Joao 2',
                email: 'aaaaa@email.com',
                password: '12345',
                access_token: second_token
            })
            await user.save()
            await user2.save()

            const res = await request(app.server)
                .put('/api/users')
                .query({ id: user.id.toString(), name: 'joao teste', roles: ['admin'], points: 200 })
                .set('Cookie', ['access_token=' + second_token])

            expect(res.statusCode).toBe(401)

            await UserModel.findOneAndDelete({
                _id: user.id
            })
            await UserModel.findOneAndDelete({
                _id: user2.id
            })
        })
        test('should return 200 on update success (non admin)', async () => {
            const jwt = new JWTAdapter()
            const token = await jwt.encrypt('any_token')
            const user = new UserModel({
                name: 'Joao',
                email: 'joaoteste@email.com',
                password: '123',
                access_token: token
            })
            await user.save()

            const res = await request(app.server)
                .put('/api/users')
                .query({ id: user.id.toString(), name: 'joao teste', roles: ['admin'], points: 200 })
                .set('Cookie', ['access_token=' + token])

            expect(res.body.name).toContain('joao teste')
            expect(res.body.roles).toEqual(['student'])
            expect(res.body.points).toBe(0)
            expect(res.statusCode).toBe(200)

            await UserModel.findOneAndDelete({
                _id: user.id
            })
        })
        test('should return 200 on update success (admin)', async () => {
            const jwt = new JWTAdapter()
            const token = await jwt.encrypt('any_token')
            const user = new UserModel({
                name: 'Joao',
                email: 'joaoteste@email.com',
                password: '123',
                roles: ['admin'],
                access_token: token
            })
            const user2 = new UserModel({
                name: 'Joao 2',
                email: 'aaaaa@email.com',
                password: '12345',
                access_token: 'token'
            })
            await user.save()
            await user2.save()

            const res = await request(app.server)
                .put('/api/users')
                .query({ id: user2.id.toString(), name: 'joao teste', roles: ['admin'], points: 200 })
                .set('Cookie', ['access_token=' + token])

            expect(res.body.name).toContain('joao teste')
            expect(res.body.roles).toEqual(['admin'])
            expect(res.statusCode).toBe(200)

            await UserModel.findOneAndDelete({
                _id: user.id
            })
            await UserModel.findOneAndDelete({
                _id: user2.id
            })
        })
    })
    describe('GET', () => {
        test('should return 401 if unauthorized', async () => {
            const jwt = new JWTAdapter()

            const token = await jwt.encrypt('any_token')
            const second_token = await jwt.encrypt('token_teste')

            const user = new UserModel({
                name: 'Joao',
                email: 'joaoteste@email.com',
                password: '123',
                access_token: token
            })
            const user2 = new UserModel({
                name: 'Joao 2',
                email: 'aaaaa@email.com',
                password: '12345',
                access_token: second_token
            })
            await user.save()
            await user2.save()

            const res = await request(app.server)
                .get('/api/users')
                .query({ per_page: 1 })
                .set('Cookie', ['access_token=' + second_token])

            expect(res.statusCode).toBe(401)

            await UserModel.findOneAndDelete({
                _id: user.id
            })
            await UserModel.findOneAndDelete({
                _id: user2.id
            })
        })
        test('should return 200 with correct search and pagination', async () => {
            const jwt = new JWTAdapter()

            const token = await jwt.encrypt('any_token')
            const second_token = await jwt.encrypt('token')

            const user = new UserModel({
                name: 'Joao',
                email: 'joaoteste@email.com',
                password: '123',
                access_token: token
            })
            const user2 = new UserModel({
                name: 'Joao 2',
                email: 'aaaaa@email.com',
                password: '12345',
                roles: ['admin'],
                access_token: second_token
            })
            await user.save()
            await user2.save()

            const res = await request(app.server)
                .get('/api/users')
                .query({ per_page: 1, search: 'Joao' })
                .set('Cookie', ['access_token=' + second_token])

            expect(res.statusCode).toBe(200)
            expect(res.body.pages).toBe(2)

            await UserModel.findOneAndDelete({
                _id: user.id
            })
            await UserModel.findOneAndDelete({
                _id: user2.id
            })
        })
    })
})
