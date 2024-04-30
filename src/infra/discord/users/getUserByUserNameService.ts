import { IDiscordUser } from '@/domain/DiscordUser'
import { IDiscordUsersService } from '@/interfaces/application/discord/DiscordUsersService'

export class DiscordUsersService implements IDiscordUsersService {
    getByUsername(username: string): Promise<IDiscordUser> {
        throw new Error('Method not implemented.')
    }
}
