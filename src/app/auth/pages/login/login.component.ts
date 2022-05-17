import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../interfaces/request/login';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../interfaces/response/login';
import { VerifyTokenRequest } from '../../interfaces/request/verify-token';
import { PayloadResponse } from '../../interfaces/response/payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  submitted: boolean = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email');

    this.loginForm = this.fb.group({
      email: [email ? email : '', Validators.required],
      password: ['', Validators.required],
      remember: [email ? true : false],
    });
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  determinateGreeting(): String {
    const splitAfternoon = 12;
    const splitEvening = 17;

    const currentHour = DateTime.local().hour;

    if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
      return 'Good afternoon';
    } else if (currentHour >= splitEvening) {
      return 'Good evening';
    } else {
      return 'Good morning';
    }
  }

  changeTypePasswordInput(input: any, iconShowPassword: any): void {
    const { type } = input;

    input.type = type === 'password' ? 'text' : 'password';
    iconShowPassword.className =
      type === 'password' ? 'bi bi-eye-slash' : 'bi bi-eye';
  }

  onSubmit() {
    this.submitted = true;
    this.isLoading = true;

    if (this.loginForm.valid) {
      const { email, password, remember } = this.loginForm.value;

      const body: LoginRequest = {
        email,
        password,
      };

      this.authService.login(body).subscribe({
        next: (response: LoginResponse) => {
          const { token } = response;

          const body: VerifyTokenRequest = {
            token,
          };

          this.authService.getPayloadToken(body).subscribe({
            next: (response: PayloadResponse) => {
              const { names, lastNames, email } = response;

              const userName = `${names.slice(0, 1).toUpperCase()}${lastNames
                .slice(0, 1)
                .toUpperCase()}`;

              localStorage.setItem('token', token);
              localStorage.setItem('user', userName);

              if (remember) {
                localStorage.setItem('email', email);
              }

              setTimeout(() => {
                this.router.navigate(['']);
              }, 1000);
            },
            error: (e) => {
              this.isLoading = false;
            },
          });
        },
        error: (e) => {
          setTimeout(() => {
            this.loginForm.reset();
            this.isLoading = false;
          }, 200);
        },
      });
    } else {
      this.isLoading = false;
    }
  }
}
