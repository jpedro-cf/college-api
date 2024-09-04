import { UserModel } from '@/infra/database/models/UserModel'
import { DbBaseRepository } from '@/infra/database/repositories/DbBaseRepository'
import exp from 'constants'
import mongoose, { mongo } from 'mongoose'

const makeSut = () => {
    const sut = new DbBaseRepository(UserModel)

    return { sut }
}

describe('BaseRepository', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/college-api')
    }, 5000)

    afterAll(async () => {
        await UserModel.deleteMany({})
        await mongoose.disconnect()
    })

    test('should return a item on success', async () => {
        const { sut } = makeSut()

        const user1 = new UserModel({
            name: 'nome',
            email: 'blabla@email.com',
            password: '123'
        })

        await user1.save()

        const user2 = new UserModel({
            name: 'testing',
            email: 'blabla2@email.com',
            password: '123',
            points: 50
        })

        await user2.save()

        const res = await sut.queryOne({
            email: {
                _equals: 'blabla@email.com'
            }
        })
        const res2 = await sut.queryOne({
            name: {
                _contains: 'test'
            }
        })
        const res3 = await sut.queryOne({
            points: {
                _greater: 10
            }
        })

        expect(res.email).toBe('blabla@email.com')
        expect(res2.name).toContain('test')
        expect(res3.points).toBeGreaterThan(10)
    })

    test('should return many items with correct query and pagination results', async () => {
        const { sut } = makeSut()

        await UserModel.create([
            {
                name: 'testing',
                email: 'blabla@email.com',
                password: '123'
            },
            {
                name: 'pedro',
                email: 'cccccccc@email.com',
                password: '123'
            },
            {
                name: 'rafael',
                email: 'rafa@email.com',
                password: '123',
                points: 30
            },
            {
                name: 'rafael silva',
                email: 'rfslva@email.com',
                password: '123',
                points: 10
            }
        ])

        const result = await sut.queryMany(
            {
                query: {
                    name: { _contains: 'rafael' }
                },
                order: {
                    by: 'points',
                    direction: 'asc'
                },
                pagination: {
                    per_page: 1,
                    page: 1
                }
            },
            ['email']
        )

        expect(result.items[0].points).toBe(10)
        expect(result.items[0].name).toContain('rafael')
        expect(result.total_pages).toBeGreaterThan(1)
    })

    test('should create a item on success', async () => {
        const { sut } = makeSut()

        const res = await sut.create({
            name: 'nome',
            email: 'emailuser',
            password: '123435'
        })

        expect(res.name).toBeTruthy()
    })

    test('should update a item on success', async () => {
        const { sut } = makeSut()

        const user = await sut.create({
            name: 'nome',
            email: 'emailuser',
            password: '123435'
        })

        const res = await sut.update(user.id.toString(), { name: 'atualizado' })

        expect(res.name).toBe('atualizado')
    })

    test('should delete a item on success', async () => {
        const { sut } = makeSut()

        const user = await sut.create({
            name: 'nome',
            email: 'emailuser',
            password: '123435'
        })

        const res = await sut.delete(user.id.toString())

        expect(res).toBeTruthy()
    })

    test('should return all items on success', async () => {
        const { sut } = makeSut()

        await sut.create({
            name: 'nome',
            email: 'emailuser',
            password: '123435'
        })

        const res = await sut.getAll()

        expect(res.length).toBeGreaterThan(0)
    })
})
