import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Questionnaire } from '../shared/questionnaire.model';
import { Question } from '../shared/question.model';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  questionnaireForm: FormGroup;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.questionnaireForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'questions': new FormArray([this.getNewGroup()])
    })
  }

  public plus() {
    (<FormArray>this.questionnaireForm.get('questions')).push(this.getNewGroup());
  }

  public plusChoice(questionCtrl) {
    questionCtrl.get('choices').push(this.getNewChoice());
  }

  private getNewGroup() {
    return new FormGroup({
      'question': new FormControl('', Validators.required),
      'answerType': new FormControl('0', Validators.required),
      'choices': new FormArray([this.getNewChoice()])
    });
  }

  private getNewChoice() {
    return new FormGroup({
      'choiceText': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const questionnaire = this.mapFormToQuestionnaire();
    this.dataService.addQuestionnaire(questionnaire)
    .subscribe(data => {
      alert('Your questionnaire was added!');
    }, error => {
      console.error(error);
      alert('Something went wrong please try again or contact support');
    });
  }

  private mapFormToQuestionnaire() {
    let questionnaire = new Questionnaire();
    const formAnswers = <FormArray>this.questionnaireForm.get('questions');
    questionnaire.name = <string>this.questionnaireForm.get('title').value;

    for (let i = 0; i < formAnswers.length; i++) {
      let question = new Question();

      question.questionText = <string>formAnswers.at(i).get('question').value;
      question.answerType = +<string>formAnswers.at(i).get('answerType').value;

      let choicesFormGroup = <FormArray>formAnswers.at(i).get('choices');

      for (let j = 0; j < choicesFormGroup.length; j++) {
        question.choices.push(<string>choicesFormGroup.at(j).get('choiceText').value);
      }

      questionnaire.questions.push(question);
    }

    return questionnaire;
  }

}
