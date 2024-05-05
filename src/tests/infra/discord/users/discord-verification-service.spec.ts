import { client } from '@/infra/discord/client'
import { DiscordVerificationService } from '@/infra/discord/verification/DiscordVerificationService'
import { IConfirmVerification } from '@/interfaces/domain/useCases/discord/verification/ConfirmVerification'
import { env } from '@/main/config/env'
import { makeConfirmVerification } from '@/tests/mocks/useCases/ConfirmVerificationUseCase.mock'
import { makeDenyVerification } from '@/tests/mocks/useCases/DenyVerificationUseCase.mock'

interface ISut {
    verifyAccount: IConfirmVerification
    sut: DiscordVerificationService
}

const makeSut = (): ISut => {
    const verifyAccount = makeConfirmVerification()
    const denyAccount = makeDenyVerification()
    const sut = new DiscordVerificationService(client, verifyAccount, denyAccount)
    return { sut, verifyAccount }
}

describe('DiscordVerificationService', () => {
    beforeAll(async () => {
        await client.login(env.discordToken)
    })
    afterAll(() => {
        client.destroy()
    })
    describe('sendVerification()', () => {
        test('Should send a verification message', async () => {
            const { sut } = makeSut()
            const guild = client.guilds.cache.first()

            await guild.members.fetch()

            const user = guild.members.cache.find((member) => member.user.username === 'joao09537')
            const res = await sut.sendVerificationMessage(user.id)
            expect(res).toBeTruthy()
        }, 20000)
    })
    // Esse teste é necessário reagir manualmente a mensagem no discord
    describe('confirmVerification()', () => {
        test('Should return true on confirm account', async () => {
            const { sut } = makeSut()
            const guild = client.guilds.cache.first()

            await guild.members.fetch()

            const user = guild.members.cache.find((member) => member.user.username === 'joao09537')
            const mensagem = await user.send('Esta é uma mensagem para reagir.')
            const author = mensagem.author
            author.username = 'joao09537'
            const res = await sut.confirmVerification('joao09537', mensagem, author)
            expect(res).toBeTruthy()
        }, 20000)
        test('Should delete the user on deny account', async () => {
            const { sut } = makeSut()
            const guild = client.guilds.cache.first()

            await guild.members.fetch()

            const user = guild.members.cache.find((member) => member.user.username === 'joao09537')
            const mensagem = await user.send('Esta é uma mensagem para reagir.')
            const author = mensagem.author
            author.username = 'joao09537'
            const res = await sut.confirmVerification('joao09537', mensagem, author)
            expect(res).toBeTruthy()
        }, 20000)
    })
})
