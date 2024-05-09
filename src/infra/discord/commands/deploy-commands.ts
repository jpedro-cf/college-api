import { REST, Routes } from 'discord.js'
import { commands } from './ping'
import { env } from '@/main/config/env'

const commandsData = Object.values(commands).map((command) => command.data)

const rest = new REST({ version: '10' }).setToken(env.discordToken)

type DeployCommandsProps = {
    guildId: string
}

export async function deployCommands({ guildId }: DeployCommandsProps) {
    try {
        await rest.put(Routes.applicationGuildCommands(env.discordClientID, guildId), {
            body: commandsData
        })
    } catch (error) {
        console.error(error)
    }
}
