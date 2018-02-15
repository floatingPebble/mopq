import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
  }

  onSubmit() {
    this.dataService.login(this.loginForm.value)
    .subscribe(
      (isSuccess: boolean) => {
      if(isSuccess){
        this.router.navigate(['questionnaire-list']);
      }
    });   
  };
}
