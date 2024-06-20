import { Client, GatewayIntentBits } from 'discord.js'
import { deployCommands } from './commands/deploy-commands'
import { DiscordCommands } from './commands'
import { ConfigurationCommand } from './commands/config-commands'
import { DbDiscordConfigurationRepository } from '../database/repositories/DbDiscordConfigurationRepository'
import { DbDiscordUsersRepository } from '../database/repositories/DbDiscordUsersRepository'

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessageReactions
    ]
})
export const setupDiscord = async () => {
    const configCommand = new ConfigurationCommand(
        new DbDiscordConfigurationRepository(),
        new DbDiscordUsersRepository()
    )
    const discordCommands = new DiscordCommands([configCommand])

    client.once('ready', async () => {
        const guilds = client.guilds.cache

        for (const guild of guilds.values()) {
            await deployCommands({ guildId: guild.id })
        }
        console.log('DiscordBot ready')
    })
    client.on('guildCreate', async (guild) => {
        await deployCommands({ guildId: guild.id })
    })
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) {
            return
        }
        await discordCommands.execute(interaction)
    })
}

export { client }
