import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewpage',
  template: `
    <div class="container">
      <h1>{{ projectName }} / {{ pageName }}</h1>
      <div [innerHTML]="htmlContent"></div>
    </div>
  `,
  styleUrls: ['./viewpage.component.scss']
})
export class ViewPageComponent implements OnInit {
  projectName!: string;
  pageName!: string;

  htmlContent: string = '';

  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.projectName = this.route.snapshot.paramMap.get('projectName') || '';
    this.pageName = this.route.snapshot.paramMap.get('pageName') || '';

    const key = `${this.projectName}-${this.pageName}`; 
    this.htmlContent = localStorage.getItem(key) || 'No content found';
  }
}
