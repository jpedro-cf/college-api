import { IDiscordConfigurationRepository } from '@/interfaces/application/repositories/DiscordConfigurationRepository'
import { IDiscordConfigurationSchema } from '@/interfaces/application/schemas/DiscordConfigurationSchema'

export const makeFakeDiscordConfigRepository = (): IDiscordConfigurationRepository => {
    class DiscordConfigurationRepositoryStub implements IDiscordConfigurationRepository {
        createConfig(guild_id: string): Promise<IDiscordConfigurationSchema> {
            return Promise.resolve(makeFakeDiscordConfigModel())
        }
        getByField(field: string, value: any): Promise<IDiscordConfigurationSchema> {
            return Promise.resolve(makeFakeDiscordConfigModel())
        }
        getFieldValue(guild_id: string, field: string): Promise<any> {
            return Promise.resolve(makeFakeDiscordConfigModel())
        }
        updateConfig(data: IDiscordConfigurationSchema): Promise<IDiscordConfigurationSchema> {
            return Promise.resolve(makeFakeDiscordConfigModel())
        }
        getAll(): Promise<IDiscordConfigurationSchema[]> {
            return Promise.resolve([makeFakeDiscordConfigModel()])
        }
    }
    return new DiscordConfigurationRepositoryStub()
}

export const makeFakeDiscordConfigModel = (): IDiscordConfigurationSchema => {
    return {
        _id: '111111',
        guild_id: '2222222222',
        createdAt: new Date(),
        updatedAt: new Date(),
        questions_channel_id: '333333',
        ranking_channel_id: '44444'
    }
}
