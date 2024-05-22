import { IDiscordUser } from '@/domain/DiscordUser'
import { IDiscordUsersService } from '@/interfaces/application/discord/DiscordUsersService'
import { client } from '../client'
import { IDiscordConfigurationRepository } from '@/interfaces/application/repositories/DiscordConfigurationRepository'

export class DiscordUsersService implements IDiscordUsersService {
    constructor(private readonly configRepository: IDiscordConfigurationRepository) {}
    async getByUsername(username: string): Promise<IDiscordUser> {
        try {
            const configs = await this.configRepository.getAll()
            for (const config of configs) {
                const guild = client.guilds.cache.get(config.guild_id)
                const members = await guild.members.fetch()

                const user = members.find((member) => member.user.username === username)

                if (!user) {
                    continue
                }

                const discordUser: IDiscordUser = {
                    id: user.user.id,
                    username: user.user.username,
                    globalName: user.user.globalName
                }

                return discordUser
            }
            return null
        } catch (error) {
            console.error('Erro ao buscar usuário do Discord: ', error)
            throw new Error('Erro ao buscar usuário do Discord: ' + error)
        }
    }
}
