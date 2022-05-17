import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../../interfaces/request/login';
import { UserRequest } from '../../interfaces/request/user';
import { VerifyTokenRequest } from '../../interfaces/request/verify-token';
import { LoginResponse } from '../../interfaces/response/login';
import { PayloadResponse } from '../../interfaces/response/payload';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  submitted: boolean = false;
  isLoading: boolean = false;
  successSignUp: boolean = false;

  step: number = 1;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      names: ['', Validators.required],
      lastNames: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get signUpFormControl() {
    return this.signUpForm.controls;
  }

  next() {
    if (this.step === 1) {
      const { names, lastNames } = this.signUpFormControl;

      if (names.invalid) {
        names.markAsTouched();
      }

      if (lastNames.invalid) {
        lastNames.markAsTouched();
      }

      if (!names.invalid && !lastNames.invalid) {
        this.step++;
      }
    }
  }

  previous() {
    if (this.step === 2) {
      this.step--;
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

    if (this.signUpForm.valid) {
      const { names, lastNames, email, password } = this.signUpForm.value;

      const body: UserRequest = {
        names,
        lastNames,
        email,
        password,
      };

      this.authService.createUser(body).subscribe({
        next: () => {
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
                  const { names, lastNames } = response;

                  const userName = `${names
                    .slice(0, 1)
                    .toUpperCase()}${lastNames.slice(0, 1).toUpperCase()}`;

                  localStorage.clear();

                  localStorage.setItem('token', token);
                  localStorage.setItem('user', userName);

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
                this.signUpFormControl.email.reset();
                this.isLoading = false;
              }, 200);
            },
          });
        },
        error: (e) => {
          setTimeout(() => {
            this.signUpFormControl.email.reset();
            this.isLoading = false;
          }, 200);
        },
      });
    } else {
      this.isLoading = false;
    }
  }
}
