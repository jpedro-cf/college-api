import { IDiscordConfigurationRepository } from '@/interfaces/application/repositories/DiscordConfigurationRepository'
import { IDiscordUsersRepository } from '@/interfaces/application/repositories/DiscordUsersRepository'

export class DiscordUserRole {
    constructor(private readonly discordUsersRepository: IDiscordUsersRepository) {}
    async sendMessage(channel: string, role: string): Promise<boolean> {
        return false
    }
}
