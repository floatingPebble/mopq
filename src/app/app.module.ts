import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';


import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';
import { QuestionnaireComponent } from './questionnaire-list/questionnaire/questionnaire.component';
import { QuestionComponent } from './questionnaire-list/questionnaire/question/question.component';
import { DataService } from './shared/data.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './shared/auth-guard.service';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  {path: '', component: MainComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'questionnaire-list', component: QuestionnaireListComponent},
  {path: 'questionnaire/:id', component: QuestionnaireComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    RegisterComponent,
    LoginComponent,
    QuestionnaireListComponent,
    QuestionnaireComponent,
    QuestionComponent,
    MainComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    [RouterModule.forRoot(appRoutes, {preloadingStrategy:PreloadAllModules})]
  ],
  providers: [DataService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
