import { Client, EmbedBuilder, MessageReaction, User } from 'discord.js'

export class DiscordVerificationService {
    constructor(private readonly client: Client) {}
    async sendVerificationMessage(user_id: string): Promise<boolean> {
        try {
            const user = await this.client.users.fetch(user_id)
            const embed = new EmbedBuilder()
                .setTitle('Verificação')
                .setDescription('Reaja com ✅ para confirmar seu cadastro.\n Ou reaja com 🟥 para negar a verificação.')
                .setColor('Blue')

            const message = await user.send({ embeds: [embed] })

            await message.react('✅')
            await message.react('🟥')
            const filter = (reaction: MessageReaction, user: User) => ['✅', '🟥'].includes(reaction.emoji.name)

            const collector = message.createReactionCollector({ filter, time: 120000 })

            collector.once('collect', async (reaction, user) => {
                if (reaction.emoji.name === '✅') {
                    await this.confirmVerification()
                    await user.send('Conta verificada com sucesso ✅')
                } else {
                    await this.denyVerification()
                    await user.send('Verificação negada 🟥')
                }
            })

            return true
        } catch (error) {
            console.log('Erro ao enviar mensagem ou adicionar reação:', error)
            return false
        }
    }
    private async confirmVerification() {
        console.log('testeee')
        return true
    }
    private async denyVerification() {}
}
