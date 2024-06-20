import { IDiscordUserSchema } from '@/domain/DiscordUser'

export interface ICreateDiscordUserDTO {
    discord_id: string
}

export interface ICreateDiscordUser {
    execute(data: ICreateDiscordUserDTO): Promise<IDiscordUserSchema>
}
