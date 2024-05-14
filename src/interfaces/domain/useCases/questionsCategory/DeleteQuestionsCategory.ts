export interface IDeleteQuestionsCategory {
    delete(id: string): Promise<boolean>
}
