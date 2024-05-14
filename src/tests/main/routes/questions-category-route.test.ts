import { JWTAdapter } from '@/infra/cryptography/Jwt'
import { QuestionsCategoryModel } from '@/infra/database/models/QuestionsCategoryModel'
import { UserModel } from '@/infra/database/models/UserModel'
import { app } from '@/main/server'
import { hash } from 'bcrypt'
import mongoose from 'mongoose'
import request from 'supertest'

describe('QuestionsCategoryRoutes', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/college-api')
    }, 5000)
    afterAll(async () => {
        await mongoose.disconnect()
    })
    describe('GET', () => {
        test('should return a list of categories', async () => {
            const password = await hash('123', 8)
            const jwt = new JWTAdapter()
            const token = await jwt.encrypt('any_token')
            const user = new UserModel({
                name: 'Joao',
                email: 'joaoteste@email.com',
                password,
                access_token: token
            })
            const category = new QuestionsCategoryModel({
                title: 'aaaaaaa',
                slug: 'aaaaaaa'
            })

            await category.save()
            await user.save()

            const res = await request(app.server)
                .get('/api/questions_category')
                .send()
                .set('Cookie', ['access_token=' + token])
            expect(res.statusCode).toBe(200)
            await UserModel.deleteOne({
                email: 'joaoteste@email.com'
            })
            await QuestionsCategoryModel.deleteOne({
                slug: 'aaaaaaa'
            })
        })
    })

    describe('PUT', () => {
        test('should return 401 if unauthorized', async () => {
            const password = await hash('123', 8)
            const jwt = new JWTAdapter()
            const token = await jwt.encrypt('any_token')
            const user = new UserModel({
                name: 'Joao',
                email: 'joaoteste@email.com',
                roles: ['student'],
                password,
                access_token: token
            })
            const category = new QuestionsCategoryModel({
                title: 'aaaaaaa',
                slug: 'aaaaaaa'
            })
            await category.save()
            await user.save()
            const res = await request(app.server)
                .put('/api/questions_category')
                .field('id', category.id)
                .field('title', 'titulo atualizado')
                .set('Content-Type', 'multipart/form-data')
                .set('Cookie', ['access_token=' + token])
            expect(res.statusCode).toBe(401)
            await UserModel.deleteOne({
                _id: user._id
            })
            await QuestionsCategoryModel.deleteOne({
                _id: category._id
            })
        })
        test('should return a updated category', async () => {
            const password = await hash('123', 8)
            const jwt = new JWTAdapter()
            const token = await jwt.encrypt('any_token')
            const user = new UserModel({
                name: 'Joao',
                email: 'joaoteste@email.com',
                roles: ['admin'],
                password,
                access_token: token
            })
            const category = new QuestionsCategoryModel({
                title: 'aaaaaaa',
                slug: 'aaaaaaa'
            })
            await category.save()
            await user.save()
            const res = await request(app.server)
                .put('/api/questions_category')
                .field('id', category.id)
                .field('title', 'titulo atualizado')
                .set('Content-Type', 'multipart/form-data')
                .set('Cookie', ['access_token=' + token])
            expect(res.statusCode).toBe(200)
            await UserModel.deleteOne({
                _id: user._id
            })
            await QuestionsCategoryModel.deleteOne({
                _id: category._id
            })
        })
    })
    describe('DELETE', () => {
        test('should return 401 if unauthorized', async () => {
            const password = await hash('123', 8)
            const jwt = new JWTAdapter()
            const token = await jwt.encrypt('any_token')
            const user = new UserModel({
                name: 'Joao',
                email: 'joaoteste@email.com',
                roles: ['student'],
                password,
                access_token: token
            })
            const category = new QuestionsCategoryModel({
                title: 'aaaaaaa',
                slug: 'aaaaaaa'
            })
            await category.save()
            await user.save()
            const res = await request(app.server)
                .delete('/api/questions_category')
                .send({ id: '1231454' })
                .set('Cookie', ['access_token=' + token])
            expect(res.statusCode).toBe(401)
            await UserModel.deleteOne({
                _id: user._id
            })
            await QuestionsCategoryModel.deleteOne({
                _id: category._id
            })
        })
        test('should return 200 on delete success', async () => {
            const password = await hash('123', 8)
            const jwt = new JWTAdapter()
            const token = await jwt.encrypt('any_token')
            const user = new UserModel({
                name: 'Joao',
                email: 'joaoteste@email.com',
                roles: ['admin'],
                password,
                access_token: token
            })
            const category = new QuestionsCategoryModel({
                title: 'aaaaaaa',
                slug: 'aaaaaaa'
            })
            await category.save()
            await user.save()
            const res = await request(app.server)
                .delete('/api/questions_category')
                .query({ id: category.id })
                .set('Cookie', ['access_token=' + token])
            expect(res.statusCode).toBe(200)
            await UserModel.deleteOne({
                _id: user._id
            })
        })
    })
})
