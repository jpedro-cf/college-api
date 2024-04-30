import { GetDiscordUserByUserNameUseCase } from '@/application/discord/users/GetUserByUserNameUseCase'
import { IDiscordUsersService } from '@/interfaces/application/discord/DiscordUsersService'
import { makeFakeDiscordUsersService } from '@/tests/mocks/discord/DiscordUsersService.mock'

interface ISut {
    discordUsersService: IDiscordUsersService
    sut: GetDiscordUserByUserNameUseCase
}

const makeSut = (): ISut => {
    const discordUsersService = makeFakeDiscordUsersService()
    const sut = new GetDiscordUserByUserNameUseCase(discordUsersService)
    return { sut, discordUsersService }
}

describe('GetDiscordUserByUserNameUseCase', () => {
    test('Should throw if discordUsersService throws', async () => {
        const { sut, discordUsersService } = makeSut()

        jest.spyOn(discordUsersService, 'getByUsername').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.get('joao')
        expect(res).rejects.toThrow()
    })
})
