export const makeCreateQuestionData = () => {
    return {
        _id: '0000000000',
        question: 'QUESTÃO DE TESTE (IGNORAR)',
        category_id: '000000',
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
        created_at: new Date()
    }
}
