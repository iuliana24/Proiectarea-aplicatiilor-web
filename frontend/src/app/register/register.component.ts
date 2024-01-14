import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage: string = ''

  constructor(private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register(registerForm: NgForm) {

    if (!registerForm.value.userName || !registerForm.value.userPassword) {
      this.errorMessage = "Nume de utilizator și parolă sunt obligatorii.";
      return;
    }

    console.log(registerForm.value);
    this.userService.register(registerForm.value)
      .pipe(
        catchError(error => {
          const errorMessage = (error && error.error && error.error.message) ? error.error.message : 'Acest nume de utilizator este deja înregistrat.';
          this.errorMessage = errorMessage;
          return throwError(errorMessage);
        })
      )
      .subscribe(
        (resp) => {
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);
        }
      );
  }

}
