import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { Question } from '../../shared/question.model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../shared/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  questionnaireForm: FormGroup;
  questions: Question[];

  activeUser: User;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.activeUser = this.dataService.activeUser;

    this.dataService.getQuestions(id)
      .subscribe(
      (questions: Question[]) => {
        this.questions = questions;

        this.mapQuestionToForm();
      });
  }

  mapQuestionToForm() {
    this.questionnaireForm = new FormGroup({
      'questions': new FormArray(this.questions.map((q) => {
        return new FormGroup({
          'answer': new FormControl('', Validators.required),
          'answers': new FormArray(q.choices.map(c => {
            return new FormGroup({
              'answerText': new FormControl(false, Validators.required)
            })
          }))
        })
      }))
    })
  }

  onSubmit() {
    this.mapFormToQuestions();

    this.dataService.saveAnsweredQuestions(this.questions)
      .subscribe(data => {
        alert('Your questionnaire was saved!');
        this.router.navigate(['questionnaire-list']);
      }, error => {
        console.error(error);
        alert('Something went wrong please try again or contact support');
      });
  }

  private mapFormToQuestions() {
    const formAnswers = <FormArray>this.questionnaireForm.get('questions');
    for (let i = 0; i < this.questions.length; i++) {
      this.questions[i].answer = <string>formAnswers.at(i).get('answer').value;
      const multipleChoices = <FormArray>formAnswers.at(i).get('answers');
      this.questions[i].answers = [];
        for (let j = 0; j < multipleChoices.length; j++) {
          const answer = multipleChoices.at(j).get('answerText');
          if (answer && answer.value) {
            this.questions[i].answers.push(this.questions[i].choices[j]);
          }
        }
    }
  }
}
