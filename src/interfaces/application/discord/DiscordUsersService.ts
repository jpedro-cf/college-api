import { IDiscordUser } from '@/domain/DiscordUser'

export interface IDiscordUsersService {
    getByUsername(username: string): Promise<IDiscordUser>
}
