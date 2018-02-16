import { HttpClient, HttpClientModule, HttpRequest } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from "./user.model";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject'
import { Questionnaire } from './questionnaire.model';
import { Question } from './question.model';

@Injectable()
export class DataService {
  activeUser: User;

  private domain = 'http://localhost:3000/';
  private userSource = new Subject<User>();
  public userLoaded = this.userSource.asObservable();

  constructor(private httpClient: HttpClient,
              private router: Router, 
              private route: ActivatedRoute) {
                const lsUser = localStorage.getItem("user");
                this.activeUser = lsUser ? new User(JSON.parse(lsUser)) : new User();
              }

  register (newUser: User): Observable<boolean> {
    return this.httpClient.put(this.domain + 'users/register', newUser)
    .map(
      (user: User) => {
        if(user) {
          this.activeUser = new User(user);
        }
        return !!user;
      }
    )
  }
  login (email: string): Observable<boolean> {
    return this.httpClient.post<User>(this.domain + 'users/login', email)
    .map(
      (user: User) => {
        if(user) {
          this.activeUser = new User(user);
          localStorage.setItem("user", JSON.stringify(this.activeUser));
          this.userSource.next(this.activeUser);
        }
        return !!user;    
      }
    )
  }
  getQuestionnaires(userId?): Observable<Questionnaire[]> {
    userId = userId || this.activeUser.id;
    return this.httpClient.get<Questionnaire[]>(this.domain + 'questionnaires/list/' + userId);
  }
  getQuestions(questionnaireId: number): Observable<Question[]> {
    return this.httpClient.get<Question[]>(this.domain + 'questionnaires/questionnaire/' + questionnaireId);
  }
  saveAnsweredQuestions(questions: Question[]) {
    const request = {
      userId: this.activeUser.id,
      questions: questions
    };
    return this.httpClient.put(this.domain + 'questionnaires/save', request);
  }
  addQuestionnaire(questionnaire: Questionnaire) {
    return this.httpClient.put(this.domain + 'questionnaires/add', questionnaire);
  }
  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.domain + 'users/userlist');
  }
  getQuestionsWithAnswers(questionnaireId: number, userId: number): Observable<Question[]> {
    const request = {
      questionnaireId: questionnaireId,
      userId: userId
    }
    return this.httpClient.post<Question[]>(this.domain + 'questionnaires/answers/', request);
  }
}