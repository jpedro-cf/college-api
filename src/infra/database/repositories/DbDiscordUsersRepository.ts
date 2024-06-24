import { IDiscordUserSchema } from '@/domain/DiscordUser'
import { IDiscordUsersRepository } from '@/interfaces/application/repositories/DiscordUsersRepository'
import { DiscordUserModel } from '../models/DiscordUserModel'

export class DbDiscordUsersRepository implements IDiscordUsersRepository {
    async create(data: Omit<IDiscordUserSchema, 'createdAt' | 'updatedAt' | 'points'>): Promise<IDiscordUserSchema> {
        const user = new DiscordUserModel({
            discord_id: data.discord_id,
            username: data.username,
            globalName: data.globalName
        })
        await user.save()
        return user.toObject()
    }
    async getByField(field: keyof IDiscordUserSchema, value: any): Promise<IDiscordUserSchema> {
        const query = { [field]: value }

        const user = await DiscordUserModel.findOne(query)

        if (user) {
            return user.toObject()
        }
        return null
    }
    async delete(id: string): Promise<boolean> {
        const deleted = await DiscordUserModel.deleteOne({
            id
        })
        return deleted ? true : false
    }
}
