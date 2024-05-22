import { client } from '@/infra/discord/client'
import { DiscordQuestionsService } from '@/infra/discord/questions/DiscordQuestionsService'
import { env } from '@/main/config/env'
import { makeCreateQuestionData } from '@/tests/mocks/entities/Question.mock'
import {
    makeFakeDiscordConfigModel,
    makeFakeDiscordConfigRepository
} from '@/tests/mocks/repositories/DiscordConfigRepository.mock'

const makeSut = () => {
    const repository = makeFakeDiscordConfigRepository()
    const sut = new DiscordQuestionsService(client, repository)
    return { sut, repository }
}

describe('DiscordQuestionsService', () => {
    beforeAll(async () => {
        await client.login(env.discordToken)
    })
    test('should return true on success', async () => {
        const { sut, repository } = makeSut()
        await client.guilds.fetch()
        const guild = client.guilds.cache.last()
        const model = makeFakeDiscordConfigModel()
        await guild.channels.fetch()
        const channel = guild.channels.cache.last()
        model.guild_id = guild.id
        model.questions_channel_id = channel.id

        jest.spyOn(repository, 'getAll').mockReturnValueOnce(Promise.resolve([model]))
        const res = await sut.sendQuestion({ ...makeCreateQuestionData(), category_title: 'titulo' })
        console.log(res)
        expect(res).toBeTruthy()
    })
})
