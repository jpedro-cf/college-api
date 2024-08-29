import { UserModel } from '@/infra/database/models/UserModel'
import { DbUsersRepository } from '@/infra/database/repositories/DbUsersRepository'
import { makeFakeSignUpData } from '@/tests/mocks/entities/User.mock'
import mongoose, { Collection } from 'mongoose'

let usersCollection: Collection

interface ISut {
    sut: DbUsersRepository
}

const makeSut = (): ISut => {
    const sut = new DbUsersRepository()
    return { sut }
}

describe('UsersRepository', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/college-api')
    }, 5000)
    afterAll(async () => {
        usersCollection = UserModel.collection
        await usersCollection.deleteMany({})
        await mongoose.disconnect()
    })
    describe('create()', () => {
        test('Should return an account on success', async () => {
            const { sut } = makeSut()

            const account = await sut.create(makeFakeSignUpData())
            expect(account.name).toBe('any_name')
            expect(account.email).toBe('any_email@email.com')
            expect(account.password).toBe('any_password')
            expect(account.roles).toEqual(['student'])
            expect(account.points).toBe(0)
            await UserModel.deleteOne({
                _id: account._id
            })
        })
    })

    describe('updateUser()', () => {
        test('Should return a user on success', async () => {
            const { sut } = makeSut()
            const user = new UserModel({
                name: 'fake_name',
                email: 'fake_email@email.com',
                password: 'fake_password'
            })
            await user.save()

            const account = await sut.update(user._id, { email: 'updated_email@email.com' })

            expect(account).toBeTruthy()
            await UserModel.deleteOne({
                email: 'updated_email@email.com'
            })
        })
    })
    describe('deleteUser()', () => {
        test('should delete a user on success', async () => {
            const { sut } = makeSut()
            const user = new UserModel({
                name: 'fake_name',
                discord_username: 'discord',
                email: 'fake_email@email.com',
                password: 'fake_password'
            })
            await user.save()

            const deleted = await sut.delete(user.id)
            expect(deleted).toBeTruthy()
        })
    })

    describe('getByField()', () => {
        test('should return a user on success', async () => {
            const { sut } = makeSut()

            const user = new UserModel({
                name: 'fake_name',
                email: 'fake_email@email.com',
                access_token: 'token',
                password: 'fake_password'
            })

            await user.save()

            const exists = await sut.queryOne({ _id: { _equals: user.id } })
            expect(exists).toBeTruthy()
            await UserModel.deleteOne({
                email: 'fake_email@email.com'
            })
        })
    })
    describe('getAll()', () => {
        test('should return a list of users on success', async () => {
            await UserModel.deleteMany({})
            const { sut } = makeSut()

            const user = new UserModel({
                name: 'fake_name',
                email: 'fake_email@email.com',
                access_token: 'token',
                password: 'fake_password'
            })
            const user2 = new UserModel({
                name: 'other_name',
                email: 'other_email@email.com',
                access_token: 'token',
                password: 'fake_password'
            })

            await user.save()
            await user2.save()

            const response = await sut.queryMany({ query: {}, pagination: { per_page: 2, page: 1 } })
            expect(response.items.length).toBeGreaterThan(0)
            expect(response.total_pages).toBe(1)
        })
    })
})
