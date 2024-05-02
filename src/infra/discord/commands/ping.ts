import { CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { DiscordVerificationService } from '../users/DiscordVerificationService'

const pingCommand = new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!')
const testeCommand = new SlashCommandBuilder().setName('teste').setDescription('Replies with Teste!')

const verification = new DiscordVerificationService()

async function executePing(interaction: CommandInteraction) {
    const result = await verification.sendVerificationMessage(interaction.user.id)
    console.log(result)
    return result
}
async function executeTeste(interaction: CommandInteraction) {
    return interaction.reply('Teste!')
}

export const commands = {
    ping: {
        data: pingCommand,
        execute: executePing
    },
    teste: {
        data: testeCommand,
        execute: executeTeste
    }
}
