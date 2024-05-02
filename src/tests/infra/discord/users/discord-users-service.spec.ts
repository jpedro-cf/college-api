import { client } from '@/infra/discord/client'
import { DiscordUsersService } from '@/infra/discord/users/DiscordUsersService'
import { env } from '@/main/config/env'

const makeSut = (): DiscordUsersService => {
    const sut = new DiscordUsersService()
    return sut
}

describe('DiscordUsersService', () => {
    beforeAll(async () => {
        await client.login(env.discordToken)
    })
    test('Should return a discord user', async () => {
        const sut = makeSut()
        const res = await sut.getByUsername('joao09537')
        expect(res).toBeTruthy()
        expect(res.username).toBe('joao09537')
    })

    test('Should return null if user doesnt exist', async () => {
        const sut = makeSut()
        const res = await sut.getByUsername('blablablabla')
        expect(res).toBeNull()
    })
})
