export const makeCreateQuestionData = () => {
    return {
        id: '132231312',
        question: 'Titulo da questão',
        category_id: '312312',
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
