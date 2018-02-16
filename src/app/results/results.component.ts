import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { User } from '../shared/user.model';
import { Questionnaire } from '../shared/questionnaire.model';
import { Question } from '../shared/question.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  users: User[];
  userQuestionnaires: Questionnaire[];
  questions: Question[];
  activeUserId: number;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAllUsers()
    .subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
  }

  getUserQuestionnaires(userId: number) {
    this.activeUserId = userId;
    this.dataService.getQuestionnaires(userId)
    .subscribe(
      (questionnaires: Questionnaire[]) => {
        this.userQuestionnaires = questionnaires.filter(q => q.isCompleted);
      }
    );
  }

  getQuestionsWithAnswers(questionnaireId: number) {
    this.dataService.getQuestionsWithAnswers(questionnaireId, this.activeUserId)
    .subscribe(
      (questions: Question[]) => {
        this.questions = questions;
      }
    );
  }
}
