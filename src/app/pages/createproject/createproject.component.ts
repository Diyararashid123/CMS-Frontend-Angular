import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-createproject",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: "./createproject.component.html",
  styleUrls: ["./createproject.component.scss"],
})
export class CreateProjectComponent implements OnInit {
  projectForm!: FormGroup;
  projects: any[] = [];
  description: any[] = [];
  searchQuery: string = "";
  searchResults: string[] = [];
  projectname: string = "";
  pages:string[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      project_name: ["", Validators.required],
      project_description: ["", Validators.required],
    });

    this.auth.getproject().subscribe({
      next: (res) => {
        if (res && res.projects) {
          this.projects = res.projects.map((p) => p.ProjectName);
          this.description = res.projects.map((p) => p.ProjectDescription);
        } else {
          this.projects = ["Default project name"];
          this.description = ["Default project description"];
        }
        console.log("Project names", this.projects);
        console.log("Project descriptions", this.description);
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.auth.getprojects(this.projectname).subscribe({
      next: (res) => {
        console.log(res);
        this.projectname = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.auth.validatesession().subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  onSubmit() {
    console.log(this.projectForm.value);
    if (this.projectForm.valid) {
      this.auth.createProject(this.projectForm.value).subscribe({
        next: (res) => {
          console.log(res);
          alert("Project created successfully!");
          this.router.navigate(["dashboard"]);
        },
        error: (err) => {
          console.error(err);
          alert("Failed to create project");
        },
      });
    } else {
      console.log("Invalid form");
      alert("Please enter the project name");
    }
  }

  onSearch() {
    if (this.projectname.trim() === "") {
      alert("Please enter a search query");
      return;
    }

    this.auth.getprojects(this.projectname).subscribe({
      next: (res) => {
        this.pages = res.pages;
      },
      error: (err) => {
        console.error("Error fetching search results", err);
        alert("Failed to fetch search results. Please try again later.");
      },
    });
  }
}
