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
        console.log('Started refreshing application (/) commands.')

        await rest.put(Routes.applicationGuildCommands(env.discordClientID, guildId), {
            body: commandsData
        })

        console.log('Successfully reloaded application (/) commands.')
    } catch (error) {
        console.error(error)
    }
}
