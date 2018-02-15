export class Question {
  id: number;
  questionnaireId: number;
  questionText: string;
  answer: string;
  answers: string[];
  answerType: number;
  choices: string[];

  constructor(question?: Question) {
    this.id = question && question.id || 0;
    this.questionText = question && question.questionText || '';
    this.answer = question && question.answer || '';
    this.questionnaireId = question && question.questionnaireId || 0;
    this.answerType = question && question.answerType || 0;
    this.choices = question && question.choices || [];
    this.answers = question && question.answers || [];
  }
}