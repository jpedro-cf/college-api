import { Client, GatewayIntentBits } from 'discord.js'
import { deployCommands } from './commands/deploy-commands'
import { commands } from './commands'

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
        const { commandName } = interaction
        if (commands[commandName as keyof typeof commands]) {
            commands[commandName as keyof typeof commands].execute(interaction)
        }
    })
}

export { client }
