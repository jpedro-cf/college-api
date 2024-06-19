import { IDiscordConfigurationRepository } from '@/interfaces/application/repositories/DiscordConfigurationRepository'
import { IDiscordConfigurationSchema } from '@/interfaces/application/schemas/DiscordConfigurationSchema'
import { DiscordConfigModel } from '../models/DiscordConfigurationModel'

export class DbDiscordConfigurationRepository implements IDiscordConfigurationRepository {
    async getAll(): Promise<IDiscordConfigurationSchema[]> {
        const configs = await DiscordConfigModel.find()
        return configs
    }
    async getFieldValue(guild_id: string, field: string): Promise<any> {
        const config = await DiscordConfigModel.findOne({
            guild_id
        })
        if (!config) {
            return null
        }
        if (!config[field]) {
            return null
        }
        return config[field]
    }
    async createConfig(guild_id: string): Promise<IDiscordConfigurationSchema> {
        const config = new DiscordConfigModel({
            guild_id
        })
        await config.save()
        return config.toObject()
    }
    async getByField(field: string, value: any): Promise<IDiscordConfigurationSchema> {
        const query = { [field]: value }

        const config = await DiscordConfigModel.findOne(query)

        if (config) {
            return config.toObject()
        }
        return null
    }
    async updateConfig(data: IDiscordConfigurationSchema): Promise<IDiscordConfigurationSchema> {
        const updated = await DiscordConfigModel.findOneAndUpdate(
            { _id: data._id },
            {
                $set: {
                    guild_id: data.guild_id,
                    ranking_channel_id: data.ranking_channel_id,
                    questions_channel_id: data.questions_channel_id,
                    role_id: data.role_id
                }
            },
            { new: true }
        )
        return updated.toObject()
    }
}
