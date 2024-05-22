import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    TextChannel,
    MessageActionRowComponentBuilder,
    ComponentType,
    EmbedBuilder,
    Client
} from 'discord.js'
import { IDiscordQuestionsService, ISendQuestionDTO } from '@/interfaces/application/discord/DiscordQuestionsService'
import { format } from 'date-fns'
import { IDiscordConfigurationRepository } from '@/interfaces/application/repositories/DiscordConfigurationRepository'

export class DiscordQuestionsService implements IDiscordQuestionsService {
    constructor(private readonly client: Client, private readonly configRepository: IDiscordConfigurationRepository) {}

    async sendQuestion(data: ISendQuestionDTO): Promise<boolean> {
        const configs = await this.configRepository.getAll()

        for (const config of configs) {
            if (!config.questions_channel_id) {
                console.error('No questions channel configured for this guild: ' + config.guild_id)
                continue
            }

            const channel = this.client.channels.cache.get(config.questions_channel_id)

            if (!channel || !(channel instanceof TextChannel || channel.isThread())) {
                console.error(`Invalid or non-text channel: ${config.questions_channel_id}`)
                continue
            }

            try {
                const embed = new EmbedBuilder()
                    .setTitle(data.question)
                    .setColor('Blue')
                    .setDescription(
                        `**Criado em:** ${format(data.created_at, 'dd/MM/yyyy HH:mm')} \n **Categoria:** ${
                            data.category_title
                        } \n **Material de apoio:** ${data.material ?? 'Indisponível'}`
                    )

                data.answers.forEach((answer) => {
                    embed.addFields({ name: `Opção ${answer.id}`, value: answer.title })
                })

                const buttons = data.answers.map((answer) =>
                    new ButtonBuilder()
                        .setCustomId(`${answer.id}`)
                        .setLabel(`Opção ${answer.id}`)
                        .setStyle(ButtonStyle.Primary)
                )

                const row = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(buttons)

                const message = await channel.send({
                    embeds: [embed],
                    components: [row]
                })

                const collector = message.createMessageComponentCollector({
                    componentType: ComponentType.Button
                })

                collector.on('collect', async (interaction) => {
                    await interaction.deferUpdate()
                })

                console.log(`Question sent successfully to channel: ${config.questions_channel_id}`)
            } catch (error) {
                console.error('Error sending question:', error)
                return false
            }
        }
        return true
    }
}
