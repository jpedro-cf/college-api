import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import { DiscordQuestionsService } from '../questions/DiscordQuestionsService'
import { client } from '../client'
import { DbDiscordConfigurationRepository } from '@/infra/database/repositories/DbDiscordConfigurationRepository'

export const testeCommand = new SlashCommandBuilder().setName('teste').setDescription('Replies with Teste!')

export async function executeTeste(interaction: ChatInputCommandInteraction) {
    const question = {
        _id: '321123123',
        question: 'Titulo da questão',
        category_id: '213idoau2e89q',
        category_title: 'titulo da categoria',
        material: 'https://google.com.br',
        answers: [
            {
                id: 1,
                title: 'Título resposta 1'
            },
            {
                id: 2,
                title: 'Título resposta 2'
            },
            {
                id: 3,
                title: 'Título resposta 3'
            }
        ],
        correct_answer_id: 3,
        created_at: new Date()
    }
    const questionsService = new DiscordQuestionsService(client, new DbDiscordConfigurationRepository())
    return questionsService.sendQuestion(question)
}
