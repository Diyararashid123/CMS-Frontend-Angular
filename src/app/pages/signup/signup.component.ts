import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import ValidateForm from "../../helpers/validateForm";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isText: boolean = false;
  type: string = "password";
  eyeIcon: string = "fa-eye-slash";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      userName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });

    this.auth.validatesession().subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console;
      },
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      // Send the object to the database
      this.auth.signUp(this.signupForm.value).subscribe({
        next: (res) => {
          console.log(res);
          alert(res.message);
          this.router.navigate(["dashboard"]);
        },
        error: (err) => {
          console.log(err);
          alert(err.error.message);
        },
      });

      console.log(this.signupForm.value);
    } else {
      console.log("Invalid form");
      ValidateForm.validateALlFormFields(this.signupForm);
      alert("Please fill the form correctly");
    }
  }

  hideShowPass() {
    this.isText = !this.isText;
    if (this.isText) {
      this.type = "text";
      this.eyeIcon = "fa-eye";
    } else {
      this.type = "password";
      this.eyeIcon = "fa-eye-slash";
    }
  }
}
