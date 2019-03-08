export interface IFrequentlyAskedQuestions {
    question: string
    answer: string
}

export class FrequentlyAskedQuestions implements IFrequentlyAskedQuestions {
    question: string
    answer: string

    constructor(o: any) {
        this.question = o.question
        this.answer = o.answer
    }
}
