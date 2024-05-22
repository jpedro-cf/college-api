import { REST, Routes } from 'discord.js'
import { commands } from '.'
import { env } from '@/main/config/env'
import { DbDiscordConfigurationRepository } from '@/infra/database/repositories/DbDiscordConfigurationRepository'

const commandsData = Object.values(commands).map((command) => command.data)

const rest = new REST({ version: '10' }).setToken(env.discordToken)

type DeployCommandsProps = {
    guildId: string
}

export async function deployCommands({ guildId }: DeployCommandsProps) {
    try {
        const configRepository = new DbDiscordConfigurationRepository()
        let discordConfiguration = await configRepository.getByField('guild_id', guildId)
        if (!discordConfiguration) {
            discordConfiguration = await configRepository.createConfig(guildId)
        }

        await rest.put(Routes.applicationGuildCommands(env.discordClientID, discordConfiguration.guild_id), {
            body: commandsData
        })
    } catch (error) {
        console.error(error)
    }
}
