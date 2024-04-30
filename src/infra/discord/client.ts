import { Client } from 'discord.js'
import { deployCommands } from './commands/deploy-commands'
import { commands } from './commands/ping'
import { env } from '@/main/config/env'

export const setupDiscord = async () => {
    const client = new Client({
        intents: ['Guilds', 'GuildMessages']
    })
    client.once('ready', async () => {
        console.log('Discord bot is ready! 🤖')
        client.guilds.cache.forEach(async (guild) => {
            await deployCommands({ guildId: guild.id })
        })
    })

    client.on('guildCreate', async (guild) => {
        await deployCommands({ guildId: guild.id })
    })

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) {
            return
        }

        const { commandName } = interaction
        if (commands[commandName as keyof typeof commands]) {
            commands[commandName as keyof typeof commands].execute(interaction)
        }
    })
    await client.login(env.discordToken)
}
