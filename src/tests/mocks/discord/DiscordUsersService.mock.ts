import { IDiscordUser } from '@/domain/DiscordUser'
import { IDiscordUsersService } from '@/interfaces/application/discord/DiscordUsersService'

export const makeFakeDiscordUsersService = (): IDiscordUsersService => {
    class DiscordUsersServiceStub implements IDiscordUsersService {
        getByUsername(username: string): Promise<IDiscordUser> {
            return Promise.resolve({
                id: 'id',
                username: username,
                globalName: 'Joao'
            })
        }
    }
    return new DiscordUsersServiceStub()
}
