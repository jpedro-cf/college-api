import { IDiscordUser } from '@/domain/DiscordUser'
import { IGetDiscordUserByUserName } from '@/interfaces/domain/useCases/discord/users/GetUserByUserName'

export const makeGetDiscordUserByName = (): IGetDiscordUserByUserName => {
    class GetDiscordUserByNameStub implements IGetDiscordUserByUserName {
        async get(username: string): Promise<IDiscordUser> {
            return Promise.resolve({ id: 'string', username: 'string', globalName: 'string' })
        }
    }
    return new GetDiscordUserByNameStub()
}
