import { IDiscordUser } from '@/domain/DiscordUser'

export interface IGetDiscordUserByUserName {
    get(username: string): Promise<IDiscordUser>
}
