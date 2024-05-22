import { DiscordConfigModel } from '@/infra/database/models/DiscordConfigurationModel'
import { DbDiscordConfigurationRepository } from '@/infra/database/repositories/DbDiscordConfigurationRepository'
import mongoose, { Collection } from 'mongoose'

const makeSut = () => {
    const sut = new DbDiscordConfigurationRepository()
    return { sut }
}

let collection: Collection

describe('DiscordConfigurationRepository', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/college-api')
    }, 5000)
    afterAll(async () => {
        collection = DiscordConfigModel.collection
        await collection.deleteMany({})
    })
    describe('create()', () => {
        test('should return a config on success', async () => {
            const { sut } = makeSut()

            const res = await sut.createConfig('213')
            expect(res.guild_id).toBe('213')
        })
    })
    describe('create()', () => {
        test('should return a config on success', async () => {
            const { sut } = makeSut()

            const res = await sut.createConfig('213')
            expect(res.guild_id).toBe('213')
        })
    })
    describe('getAll()', () => {
        test('should return a list of config on success', async () => {
            const { sut } = makeSut()

            await sut.createConfig('213')
            const res = await sut.getAll()
            expect(res.length).toBeGreaterThan(0)
        })
    })
    describe('getFieldValue()', () => {
        test('should return a field value on success', async () => {
            const { sut } = makeSut()
            const model = new DiscordConfigModel({
                guild_id: '123456',
                questions_channel_id: '123'
            })
            await model.save()

            const res = await sut.getFieldValue('123456', 'questions_channel_id')
            expect(res).toBe('123')
        })
    })
    describe('getByField()', () => {
        test('should return a config on success', async () => {
            const { sut } = makeSut()
            const model = new DiscordConfigModel({
                guild_id: '123456'
            })
            await model.save()

            const res = await sut.getByField('guild_id', '123456')
            expect(res.guild_id).toBe('123456')
        })
    })
    describe('updateConfig()', () => {
        test('should return a updated config on success', async () => {
            const { sut } = makeSut()
            const model = new DiscordConfigModel({
                guild_id: '123456'
            })
            await model.save()
            model.guild_id = '2222'

            const res = await sut.updateConfig(model)
            expect(res.guild_id).toBe('2222')
        })
    })
})
