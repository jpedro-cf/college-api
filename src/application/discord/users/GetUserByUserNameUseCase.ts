import { IDiscordUser } from '@/domain/DiscordUser'
import { IDiscordUsersService } from '@/interfaces/application/discord/DiscordUsersService'
import { IGetDiscordUserByUserName } from '@/interfaces/domain/useCases/discord/users/GetUserByUserName'

export class GetDiscordUserByUserNameUseCase implements IGetDiscordUserByUserName {
    constructor(private readonly discordUsersService: IDiscordUsersService) {}
    async get(username: string): Promise<IDiscordUser> {
        const discordUser = await this.discordUsersService.getByUsername(username)
        return discordUser
    }
}
