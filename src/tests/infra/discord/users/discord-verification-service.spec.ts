// import { client } from '@/infra/discord/client'
// import { DiscordVerificationService } from '@/infra/discord/verification/DiscordVerificationService'
// import { env } from '@/main/config/env'

// interface ISut {
//     sut: DiscordVerificationService
// }

// const makeSut = (): ISut => {
//     const sut = new DiscordVerificationService(client)
//     return { sut }
// }

// describe('DiscordVerificationService', () => {
//     beforeAll(async () => {
//         await client.login(env.discordToken)
//     })
//     describe('sendVerification()', () => {
//         test('Should send a verification message', async () => {
//             const { sut } = makeSut()
//             const guild = client.guilds.cache.first()

//             await guild.members.fetch()

//             const user = guild.members.cache.find((member) => member.user.username === 'joao09537')
//             const res = await sut.sendVerificationMessage(user.id)
//             expect(res).toBeTruthy()
//         })
//     })
// })
