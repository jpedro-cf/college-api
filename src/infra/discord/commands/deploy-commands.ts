import { REST, Routes } from 'discord.js'
import { env } from '@/main/config/env'
import { DbDiscordConfigurationRepository } from '@/infra/database/repositories/DbDiscordConfigurationRepository'
import { testeCommand } from './teste-command'
import { configCommand } from './config-commands'

const rest = new REST({ version: '10' }).setToken(env.discordToken)

type DeployCommandsProps = {
    guildId: string
}

export async function deployCommands({ guildId }: DeployCommandsProps) {
    try {
        const commands = {
            teste: testeCommand,
            config: configCommand
        }
        const commandsData = Object.values(commands).map((command) => command)

        await rest.put(Routes.applicationGuildCommands(env.discordClientID, guildId), {
            body: commandsData
        })
    } catch (error) {
        console.error(error)
    }
}
