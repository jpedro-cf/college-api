import { IDiscordUser } from '@/domain/DiscordUser'
import { IDiscordUsersService } from '@/interfaces/application/discord/DiscordUsersService'

export const makeFakeDiscordUsersService = (): IDiscordUsersService => {
    class DiscordUsersServiceStub implements IDiscordUsersService {
        getByUsername(username: string): Promise<IDiscordUser> {
            return Promise.resolve({
                id: 'id',
                bot: false,
                system: false,
                flags: { bitfield: 0 },
                username: username,
                globalName: 'Joao',
                discriminator: '0',
                avatar: null,
                banner: undefined,
                accentColor: undefined,
                avatarDecoration: null
            })
        }
    }
    return new DiscordUsersServiceStub()
}
