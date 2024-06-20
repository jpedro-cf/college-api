import { IDiscordUserSchema } from '@/domain/DiscordUser'
import { IDiscordUsersRepository } from '@/interfaces/application/repositories/DiscordUsersRepository'

export class DbDiscordUsersRepository implements IDiscordUsersRepository {
    create(data: Omit<IDiscordUserSchema, 'createdAt' | 'updatedAt'>): Promise<IDiscordUserSchema> {
        throw new Error('Method not implemented.')
    }
    getByField(field: keyof IDiscordUserSchema, value: any): Promise<IDiscordUserSchema> {
        throw new Error('Method not implemented.')
    }
    delete(id: string): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
}
