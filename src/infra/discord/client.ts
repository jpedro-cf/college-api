import { Client, GatewayIntentBits } from 'discord.js'
import { deployCommands } from './commands/deploy-commands'
import { commands } from './commands/ping'

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
        const guild = client.guilds.cache.first()
        await deployCommands({ guildId: guild.id })
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
}

export { client }
