import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../shared/user.model';
import { DataService } from '../shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.dataService.register(this.registerForm.value)
        .subscribe(
        (isSuccess: boolean) => {
          if (isSuccess) {
            this.router.navigate(['questionnaire-list']);
          }
        });
    }
  };
}
