import { IDiscordConfigurationSchema } from '../schemas/DiscordConfigurationSchema'

export interface IDiscordConfigurationRepository {
    createConfig(guild_id: string): Promise<IDiscordConfigurationSchema>
    getByField(field: string, value: any): Promise<IDiscordConfigurationSchema>
    getFieldValue(guild_id: string, field: string): Promise<any>
    updateConfig(data: IDiscordConfigurationSchema): Promise<IDiscordConfigurationSchema>
    getAll(): Promise<IDiscordConfigurationSchema[]>
}
