import { EmbedBuilder, MessageReaction, User } from 'discord.js'
import { client } from '../client'

export class DiscordVerificationService {
    async sendVerificationMessage(user_id: string): Promise<boolean> {
        try {
            const user = await client.users.fetch(user_id)
            const embed = new EmbedBuilder()
                .setTitle('Verificação')
                .setDescription('Reaja com ✅ para confirmar seu cadastro.\n ou reaja com 🟥 para negar a verificação.')
                .setColor('Random')

            const message = await user.send({ embeds: [embed] })

            await message.react('✅')
            await message.react('🟥')
            const filter = (reaction: MessageReaction, user: User) => ['✅', '🟥'].includes(reaction.emoji.name)

            const collector = message.createReactionCollector({ filter, time: 30000 })

            // Create a promise to wait for the collector to collect the reaction
            const reactionPromise = new Promise<boolean>((resolve, reject) => {
                collector.once('collect', async (reaction, user) => {
                    if (reaction.emoji.name === '✅') {
                        await user.send('✅')
                        resolve(true)
                    } else {
                        await user.send('Verificação negada.')
                        resolve(false)
                    }
                })

                collector.once('end', () => {
                    resolve(false)
                })
            })

            // Wait for the promise to resolve
            const result = await reactionPromise
            return result
        } catch (error) {
            console.log('Erro ao enviar mensagem ou adicionar reação.' + error)
            throw new Error(error)
        }
    }
}
