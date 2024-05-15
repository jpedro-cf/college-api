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

            expect(account).toBeTruthy()
            expect(account.name).toBe('any_name')
            expect(account.discord_username).toBe(null)
            expect(account.email).toBe('any_email@email.com')
            expect(account.password).toBe('any_password')
            expect(account.roles).toEqual(['student'])
            expect(account.points).toBe(0)
            expect(account.discord_confirmed).toBe(false)
            await UserModel.deleteOne({
                _id: account.id
            })
        })
    })
    describe('getByEmail()', () => {
        test('Should return an account on success', async () => {
            const { sut } = makeSut()
            const user = new UserModel({
                name: 'fake_name',
                email: 'fake_email@email.com',
                password: 'fake_password'
            })
            await user.save()
            const account = await sut.getByEmail('fake_email@email.com')

            expect(account).toBeTruthy()
            expect(account.email).toBe('fake_email@email.com')
            await UserModel.deleteOne({
                email: 'fake_email@email.com'
            })
        })
    })
    describe('getByDiscord()', () => {
        test('Should return a user on success', async () => {
            const { sut } = makeSut()
            const user = new UserModel({
                name: 'fake_name',
                discord_username: 'discord',
                email: 'fake_email@email.com',
                password: 'fake_password'
            })
            await user.save()
            const account = await sut.getByDiscord('discord')

            expect(account).toBeTruthy()
            expect(account.discord_username).toBe('discord')
            await UserModel.deleteOne({
                email: 'fake_email@email.com'
            })
        })
    })
    describe('updateUser()', () => {
        test('Should return a user on success', async () => {
            const { sut } = makeSut()
            const user = new UserModel({
                name: 'fake_name',
                discord_username: 'discord',
                email: 'fake_email@email.com',
                password: 'fake_password'
            })
            await user.save()

            user.discord_username = 'updated_username'
            user.discord_confirmed = true

            const account = await sut.updateUser(user)

            expect(account).toBeTruthy()
            expect(account.discord_username).toBe('updated_username')
            expect(account.discord_confirmed).toBe(true)
            await UserModel.deleteOne({
                email: 'fake_email@email.com'
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

            const deleted = await sut.deleteUser(user.id)
            expect(deleted).toBeTruthy()
        })
    })
    describe('getByToken()', () => {
        test('should return a user on success', async () => {
            const { sut } = makeSut()

            const user = new UserModel({
                name: 'fake_name',
                email: 'fake_email@email.com',
                access_token: 'token',
                password: 'fake_password'
            })

            await user.save()

            const exists = await sut.getByToken('token')
            expect(exists).toBeTruthy()
            await UserModel.deleteOne({
                email: 'fake_email@email.com'
            })
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

            const exists = await sut.getByField('_id', user.id)
            expect(exists).toBeTruthy()
            await UserModel.deleteOne({
                email: 'fake_email@email.com'
            })
        })
    })
    describe('getAll()', () => {
        test('should return a list of users on success', async () => {
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

            const response = await sut.getAll({ per_page: 1 })
            expect(response.users.length).toBeGreaterThan(0)
            expect(response.pages).toBe(2)
            await UserModel.deleteOne({
                email: 'fake_email@email.com'
            })
            await UserModel.deleteOne({
                email: 'other_email@email.com'
            })
        })
    })
})
