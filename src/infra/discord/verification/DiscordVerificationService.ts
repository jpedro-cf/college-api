import { IConfirmVerification } from '@/interfaces/domain/useCases/discord/verification/ConfirmVerification'
import { Client, EmbedBuilder, Message, MessageReaction, User } from 'discord.js'

export class DiscordVerificationService {
    constructor(private readonly client: Client, private readonly verifyAccount: IConfirmVerification) {}
    async sendVerificationMessage(user_id: string): Promise<boolean> {
        try {
            const user = await this.client.users.fetch(user_id)
            const embed = new EmbedBuilder()
                .setTitle('Verificação')
                .setDescription('Reaja com ✅ para confirmar seu cadastro.\n Ou reaja com 🔴 para negar a verificação.')
                .setColor('Blue')

            const message = await user.send({ embeds: [embed] })

            await message.react('✅')
            await message.react('🔴')
            this.confirmVerification(user.username, message, user)
            return true
        } catch (error) {
            console.log('Erro ao enviar mensagem ou adicionar reação:', error)
            return false
        }
    }

    async confirmVerification(discord_username: string, message: Message, user: User) {
        try {
            const filter = (reaction: MessageReaction, user: User) =>
                ['✅', '🔴'].includes(reaction.emoji.name) && user.username == discord_username

            const collector = message.createReactionCollector({ filter, time: 120000 })

            for await (const [reaction, user] of collector) {
                if (reaction.emoji.name === '✅') {
                    const confirmed = await this.verifyAccount.confirm(discord_username)
                    confirmed
                        ? await user.send('Conta verificada com sucesso ✅')
                        : await user.send('Ocorreu um erro ao verificar a conta.')
                    break
                } else {
                    await this.denyVerification()
                    await user.send('Verificação negada 🟥')
                    break
                }
            }
        } catch (error) {
            await user.send('Ocorreu um erro ao verificar a conta.')
            throw new Error(error)
        }
    }

    async denyVerification() {}
}
