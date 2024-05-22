import { DiscordConfigModel } from '@/infra/database/models/DiscordConfigurationModel'
import { DbDiscordConfigurationRepository } from '@/infra/database/repositories/DbDiscordConfigurationRepository'
import { ChannelType, ChatInputCommandInteraction, GuildMember, SlashCommandBuilder } from 'discord.js'

export const configCommand = new SlashCommandBuilder()
    .setName('config')
    .setDescription('Configuração do BOT')
    .setDMPermission(false)
    .addChannelOption((option) =>
        option
            .setName('canal_questoes')
            .setDescription('Canal para configurar as questões')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
    )
    .addChannelOption((option) =>
        option
            .setName('canal_ranking')
            .setDescription('Canal para configurar as questões')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
    )

export async function executeConfig(interaction: ChatInputCommandInteraction) {
    const configRepository = new DbDiscordConfigurationRepository()

    const member = interaction.member as GuildMember
    if (!member.permissions.has('Administrator')) {
        await interaction.reply('Sem permissões para realizar esse comando.')
        return
    }
    const discordConfiguration = await configRepository.getByField('guild_id', interaction.guildId)

    const questions_channel = interaction.options.getChannel('canal_questoes')
    if (discordConfiguration.questions_channel_id == questions_channel.id) {
        await interaction.reply(`${questions_channel} já está configurado`)
        return
    }
    discordConfiguration.questions_channel_id = questions_channel.id

    await configRepository.updateConfig(discordConfiguration)

    const ranking_channel_id = interaction.options.getChannel('canal_ranking')
    if (discordConfiguration.ranking_channel_id == ranking_channel_id.id) {
        await interaction.reply(`${ranking_channel_id} já está configurado`)
        return
    }
    discordConfiguration.ranking_channel_id = ranking_channel_id.id

    await configRepository.updateConfig(discordConfiguration)
    await interaction.reply(`Canais configurados com sucesso.`)

    return
}
