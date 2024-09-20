import { Component, HostListener, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {
  isModalOpen: boolean = false;
  searchQuery: string = '';
  searchResults: string[] = []
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}



  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      this.openModal();
    }
  }

  onSearch() {
    if (this.searchQuery.trim() === '') {
      alert('Please enter a search query');
      return;
    }
  
    this.auth.getResults(this.searchQuery).subscribe({
      next: (res) => {
        this.searchResults = res.data;  
      },
      error: (err) => {
        console.error('Error fetching search results', err);
        alert('Failed to fetch search results. Please try again later.');
      }
    });
}
openModal() {
  this.isModalOpen = true;
  this.searchQuery = ''; 
}
toggleModal() {
  this.isModalOpen = !this.isModalOpen;
}

closeModal(event: MouseEvent) {
  if ((event.target as HTMLElement).classList.contains('search-modal')) {
    this.isModalOpen = false;
  }
}
}
