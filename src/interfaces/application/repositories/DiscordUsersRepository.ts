import { IDiscordUserSchema } from '@/domain/DiscordUser'

export interface IDiscordUsersRepository {
    create(data: Omit<IDiscordUserSchema, 'createdAt' | 'updatedAt'>): Promise<IDiscordUserSchema>
    getByField(field: keyof IDiscordUserSchema, value: any): Promise<IDiscordUserSchema>
    delete(id: string): Promise<boolean>
}
