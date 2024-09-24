import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { marked } from "marked";

@Component({
  selector: 'app-editpage',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './editpage.component.html',
  styleUrls: ['./editpage.component.scss']
})
export class EditpageComponent {
  
  updatePageForm!: FormGroup;
  markdownContent: string = "";
  htmlContent: SafeHtml = "";
  createpageForm!: FormGroup;
  markdownForm!: FormGroup;
  isUpdateMode: boolean = false;
  projectName!: string;
  pageName!: string;
  cssForm!: FormGroup;
  cssContent: string = ""; 
  dynamicStyles: any = {};
  @ViewChild('markdownTextArea') textAreaRef!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.projectName = this.route.snapshot.paramMap.get('projectName') || '';
    this.pageName = this.route.snapshot.paramMap.get('pageName') || '';

    this.auth.validatesession().subscribe({
      next: (res => { console.log(res) }),
      error: (err => { console.error(err) })
    });

    this.updatePageForm = this.fb.group({
      project_name: ["", Validators.required],
      page_name: ["", Validators.required],
      content: ["", Validators.required],
    });

    this.markdownForm = this.fb.group({
      project_name: [this.projectName, Validators.required],
      page_name: [this.pageName, Validators.required],
      content: [{ value: '', disabled: true }, Validators.required],
    });
    this.cssForm = this.fb.group({
      cssContent: ['', Validators.required],  
    });


    this.fetchMarkdown();
  }
  
  applyDynamicStyles(css: string) {
    const cssRules: any = {};
    
    // Split CSS into rules
    css.split(';').forEach(rule => {
      const [property, value] = rule.split(':').map(r => r.trim());
      if (property && value) {
        cssRules[property] = value;
      }
    });

    this.dynamicStyles = cssRules;
  }
  enableUpdateMode() {
    this.isUpdateMode = true;
    this.markdownForm.controls['content'].enable();
  }

  fetchMarkdown() {
    if (this.projectName && this.pageName) {
      this.auth.getPagemarkdown({ project: this.projectName, page: this.pageName }).subscribe({
        next: (res) => {
          if (res.content) {
            this.markdownContent = res.content;
            this.markdownForm.patchValue({ content: res.content });
            this.isUpdateMode = false;
          } else {
            alert('No content found, please add content.');
            this.enableUpdateMode();
          }
        },
        error: (err) => {
          console.error('Error fetching markdown:', err);
          alert('Failed to fetch markdown content.');
        },
      });
    } else {
      alert('Please enter both project name and page name.');
    }
  }

  applyFormatting(syntaxType: string) {
    const textarea: HTMLTextAreaElement = this.textAreaRef.nativeElement;
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;
    const selectedText = textarea.value.substring(selectionStart, selectionEnd);

    let formattedText = selectedText;

   
    switch (syntaxType) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'strikethrough':
        formattedText = `~~${selectedText}~~`;
        break;
      case 'header1':
        formattedText = `# ${selectedText}`;
        break;
      case 'header2':
        formattedText = `## ${selectedText}`;
        break;
      case 'header3':
        formattedText = `### ${selectedText}`;
        break;
      case 'link':
        const url = prompt('Enter the URL');
        formattedText = `[${selectedText}](${url})`;
        break;
      case 'code':
        formattedText = `\`${selectedText}\``;
        break;
      case 'blockquote':
        formattedText = `> ${selectedText}`;
        break;
      case 'bulletList':
        const linesd = selectedText.split('\n')
        formattedText = linesd.map((line) => `- ${line}`).join('\n');
        break;
        case 'numberedList':
          const lines = selectedText.split('\n');
          formattedText = lines.map((line, index) => `${index + 1}. ${line}`).join('\n');
          break;
      default:
        break;
    }
    

    // Update the textarea value
    const beforeText = textarea.value.substring(0, selectionStart);
    const afterText = textarea.value.substring(selectionEnd);
    const newText = beforeText + formattedText + afterText;

    textarea.value = newText;

    
    this.markdownForm.controls['content'].setValue(newText);
  }

  onUpdate() {
    const updateData = this.markdownForm.getRawValue();
    if (!updateData.project_name || !updateData.page_name) {
      alert('Project name and Page name are required!');
      return;
    }

    this.auth.savemarkdown(updateData).subscribe({
      next: () => {
        alert("Page updated successfully!");
        this.isUpdateMode = false;
      },
      error: (err) => {
        console.error("Error updating page:", err);
        alert("Failed to update the page.");
      },
    });
  }

  async convertMarkdown(): Promise<void> {
    const markdownText = this.markdownForm.get('content')?.value;
    if (markdownText) {
      const html: string = await marked(markdownText);
      const key = `${this.projectName}-${this.pageName}`;
      localStorage.setItem(key, html);
      this.router.navigate([`/viewpage/${this.projectName}/${this.pageName}`]);
    } else {
      alert("No markdown content to convert.");
    }
  }
}
