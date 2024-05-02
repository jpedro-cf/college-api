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
})
