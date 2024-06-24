import {
    CacheType,
    ChannelType,
    ChatInputCommandInteraction,
    EmbedBuilder,
    GuildMember,
    MessageReaction,
    SlashCommandBuilder,
    TextChannel,
    User
} from 'discord.js'
import { IDiscordCommand } from '.'
import { IDiscordConfigurationRepository } from '@/interfaces/application/repositories/DiscordConfigurationRepository'
import { IDiscordUsersRepository } from '@/interfaces/application/repositories/DiscordUsersRepository'

export const configCommand = new SlashCommandBuilder()
    .setName('config')
    .setDescription('Configuração do BOT')
    .setDMPermission(false)
    .addChannelOption((option) =>
        option
            .setName('canal_questoes')
            .setDescription('Canal que irá aparecer as questões.')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
    )
    .addChannelOption((option) =>
        option
            .setName('canal_ranking')
            .setDescription('Canal irá mostrar o ranking, status e etc.')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
    )
    .addRoleOption((option) =>
        option
            .setName('cargo')
            .setDescription('Cargo que será usado para verificação e menção de participantes.')
            .setRequired(true)
    )

export class ConfigurationCommand implements IDiscordCommand {
    public name: string
    constructor(
        private readonly configRepository: IDiscordConfigurationRepository,
        private readonly discordUsersRepository: IDiscordUsersRepository
    ) {
        this.name = 'config'
    }
    async execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
        try {
            const member = interaction.member as GuildMember
            if (!member.permissions.has('Administrator')) {
                await interaction.reply('Sem permissões para realizar esse comando.')
                return
            }

            let discordConfiguration = await this.configRepository.getByField('guild_id', interaction.guildId)

            if (discordConfiguration) {
                await interaction.reply(
                    'Este comando já foi executado anteriormente e não pode ser executado novamente.'
                )
                return
            }

            const questions_channel = interaction.options.getChannel('canal_questoes') as TextChannel
            const role = interaction.options.getRole('cargo')
            const ranking_channel_id = interaction.options.getChannel('canal_ranking')

            discordConfiguration = await this.configRepository.createConfig(interaction.guildId)

            discordConfiguration.questions_channel_id = questions_channel.id
            discordConfiguration.ranking_channel_id = ranking_channel_id.id
            discordConfiguration.role_id = role.id

            await this.configRepository.updateConfig(discordConfiguration)

            const embed = new EmbedBuilder()
                .setTitle('Verificação')
                .setColor('Red')
                .setDescription('Reaja com ✅ para ter acesso ao chat.')
            const reactionMessage = await questions_channel.send({ embeds: [embed] })
            await reactionMessage.react('✅')

            const filter = (reaction: MessageReaction, user: User) => !user.bot && reaction.emoji.name == '✅'
            const collector = reactionMessage.createReactionCollector({ filter })

            collector.on('collect', async (reaction, user) => {
                try {
                    const guildMember = await reaction.message.guild.members.fetch(user.id)
                    if (guildMember.roles.cache.has(role.id)) {
                        await user.send(`Você já possui o cargo ${role.name}.`)
                    } else {
                        const data = {
                            discord_id: user.id,
                            username: user.username,
                            globalName: user.globalName
                        }
                        await this.discordUsersRepository.create(data)
                        await guildMember.roles.add(role.id)
                        await user.send(`Você recebeu o cargo "${role.name}" ao reagir à mensagem.`)
                    }
                } catch (error) {
                    await user.send(`Ocorreu um erro ao adicionar o seu cargo.`)
                }
            })
            await interaction.reply('Configurado com sucesso.')
            return
        } catch (error) {
            console.log(error)
        }
    }
}
