export const makeCreateQuestionData = () => {
    return {
        question: 'QUESTÃO DE TESTE (IGNORAR)',
        categories: ['000000'],
        material: 'https://google.com.br',
        answers: [
            {
                id: 1,
                title: 'Título resposta 1 '
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
        createdAt: new Date()
    }
}
