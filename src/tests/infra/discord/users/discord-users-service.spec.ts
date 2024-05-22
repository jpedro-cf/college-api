import { client } from '@/infra/discord/client'
import { DiscordUsersService } from '@/infra/discord/users/DiscordUsersService'
import { env } from '@/main/config/env'
import {
    makeFakeDiscordConfigModel,
    makeFakeDiscordConfigRepository
} from '@/tests/mocks/repositories/DiscordConfigRepository.mock'
import { config } from 'dotenv'

const makeSut = () => {
    const configRepository = makeFakeDiscordConfigRepository()
    const sut = new DiscordUsersService(configRepository)
    return { sut, configRepository }
}

describe('DiscordUsersService', () => {
    beforeAll(async () => {
        await client.login(env.discordToken)
    })
    test('Should return a discord user', async () => {
        const { sut, configRepository } = makeSut()

        const guild = await client.guilds.cache.first()
        const model = await makeFakeDiscordConfigModel()
        model.guild_id = guild.id

        jest.spyOn(configRepository, 'getAll').mockReturnValueOnce(Promise.resolve([model]))
        const res = await sut.getByUsername('joao09537')
        expect(res).toBeTruthy()
        expect(res.username).toBe('joao09537')
    })

    test('Should return null if user doesnt exist', async () => {
        const { sut, configRepository } = makeSut()
        const guild = await client.guilds.cache.first()
        const model = await makeFakeDiscordConfigModel()
        model.guild_id = guild.id

        jest.spyOn(configRepository, 'getAll').mockReturnValueOnce(Promise.resolve([model]))
        const res = await sut.getByUsername('blablablabla')
        expect(res).toBeNull()
    })
})
