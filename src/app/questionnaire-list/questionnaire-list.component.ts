import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { User } from '../shared/user.model';
import { Questionnaire } from '../shared/questionnaire.model';

@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.css']
})
export class QuestionnaireListComponent implements OnInit {
  activeUser: User;
  questionnaires: Questionnaire[];

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.activeUser = this.dataService.activeUser;
    this.dataService.getQuestionnaires()
    .subscribe(
      (questionnaires: Questionnaire[]) => {
        this.questionnaires = questionnaires;
      }
    )
  }

}
