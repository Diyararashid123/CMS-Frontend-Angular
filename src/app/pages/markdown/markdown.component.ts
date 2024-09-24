import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from "@angular/forms";

import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { marked } from "marked";
@Component({
  selector: "app-markdown",
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: "./markdown.component.html",
  styleUrl: "./markdown.component.scss",
})
export class MarkdownComponent implements OnInit {
  projects: any[] = [];
  createpageForm!: FormGroup;
  projectName: string = '';
  pageName: string = '';
  htmlContent: SafeHtml = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    
    
    this.createpageForm = this.fb.group({
      project_name: ["", Validators.required],
      page_name: ["", Validators.required],
    });

    this.auth.getPagemarkdown({ project: this.projectName, page: this.pageName }).subscribe({
      next: async (res) => {
        const markdownText = res.content || '';
        const html: string = await marked(markdownText);
        this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
      },
      error: (err) => {
        console.error('Error fetching markdown:', err);
      }

    });

    
    this.auth.getproject().subscribe({
      next: (res) => {
        this.projects = res.projects.map((project) => ({
          ProjectName: project.ProjectName,
          ProjectDescription: project.ProjectDescription,
          showPages: false, 
          pages: [],
          fetchedPages: false,
        }));
      },
      error: (err) => {
        console.error("Error fetching projects", err);
      },
    });
    
  }
  goToPageEditor(projectName: string, pageName: string) {
    this.router.navigate(['/editpage', projectName, pageName]);
  }

  togglePages(project: any) {
    if (!project.fetchedPages) {
      // Fetch pages only if they haven't been fetched already
      this.auth.getprojects(project.ProjectName).subscribe({
        next: (res) => {
          project.pages = res.pages || [];
          project.showPages = !project.showPages;
          project.fetchedPages = true; 
        },
        error: (err) => {
          console.error("Error fetching project pages", err);
          alert("Failed to fetch project pages. Please try again later.");
        },
      });
    } else {
      project.showPages = !project.showPages;
    }
  }

  onSubmit() {
    if (this.createpageForm.valid) {
      this.auth.createpage(this.createpageForm.value).subscribe({
        next: (res) => {
          alert("Page created successfully!");
          this.router.navigate(["/editpage"]);
        },
        error: (err) => {
          console.error("Error creating page", err);
          alert("Failed to create the page.");
        },
      });
    }
  }
}