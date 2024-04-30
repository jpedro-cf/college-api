import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

const pingCommand = new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!')
const testeCommand = new SlashCommandBuilder().setName('teste').setDescription('Replies with Teste!')

async function executePing(interaction: CommandInteraction) {
    return interaction.reply('Pong!')
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
