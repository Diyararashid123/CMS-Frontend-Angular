import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl} from "@angular/forms";
import { CommonModule } from "@angular/common";
import ValidateForm from "../../helpers/validateForm";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });

    this.auth.validatesession().subscribe({
      next:(res=>{console.log(res)}),
      error:(err=>{console})
  });
  }



  onLogin() {

    if (this.loginForm.valid ) {
      //Senbd the object to database
      this.auth.login(this.loginForm.value).subscribe({
        next:(res=>{
          this.router.navigate(['dashboard'])
        }),
        error:(err=>{
          console.log(err)
         
        }
        )
      })
      console.log(this.loginForm.value);
    } else {
      console.log("Invalid form");

      ValidateForm.validateALlFormFields(this.loginForm);
      alert("Please fill the form correctly");
    }
  }

  isText: boolean = false;
  type: string = "password";
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth:AuthService,private router:Router) {}

 
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
