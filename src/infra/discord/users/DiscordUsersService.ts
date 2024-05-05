import { IDiscordUser } from '@/domain/DiscordUser'
import { IDiscordUsersService } from '@/interfaces/application/discord/DiscordUsersService'
import { client } from '../client'

export class DiscordUsersService implements IDiscordUsersService {
    async getByUsername(username: string): Promise<IDiscordUser> {
        try {
            const guild = client.guilds.cache.first()

            await guild.members.fetch()

            const user = guild.members.cache.find((member) => member.user.username === username)

            if (!user) {
                return null
            }

            const discordUser: IDiscordUser = {
                id: user.user.id,
                username: user.user.username,
                globalName: user.user.globalName
            }

            return discordUser
        } catch (error) {
            console.error('Erro ao buscar usuário do Discord: ', error)
            throw new Error('Erro ao buscar usuário do Discord: ' + error)
        }
    }
}
