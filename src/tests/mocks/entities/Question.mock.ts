export const makeCreateQuestionData = () => {
    return {
        question: 'Titulo da questão',
        answers: [
            {
                id: '45',
                title: 'Título resposta 1 '
            },
            {
                id: '32',
                title: 'Título resposta 2'
            },
            {
                id: '9',
                title: 'Título resposta 3'
            }
        ],
        correct_answer: '9'
    }
}
