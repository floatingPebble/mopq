import { Question } from "./question.model";

export class Questionnaire {
  id: number;
  name: string;
  isCompleted: boolean;
  questions: Question[]

  constructor(questionnaire?: Questionnaire) {
    this.id = questionnaire && questionnaire.id || 0;
    this.name = questionnaire && questionnaire.name || '';
    this.isCompleted = questionnaire && questionnaire.isCompleted || false;
    this.questions = questionnaire && questionnaire.questions || [];
  }
}