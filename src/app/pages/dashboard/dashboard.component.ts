import { ChangeDetectorRef, Component, OnInit, Renderer2 } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  imports:[ReactiveFormsModule, CommonModule,FormsModule],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  username: string = ''; 
  urlroute:string = '';
  isDarkMode: boolean = false;

  constructor(private auth: AuthService, private router: Router,private renderer: Renderer2,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      this.renderer.addClass(document.body, 'dark-mode');
    }


    this.auth.validatesession().subscribe({
      next: (res) => {
     
        if (res && res.username) {
          this.username = res.username; 
        } else {
          this.username = 'test'; 
        }
        console.log('Session is valid. Username:', this.username);
      },
      error: (err) => {
        console.log('Session is invalid or expired', err);
        this.router.navigate(['login']); 
      }
    });
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
      localStorage.setItem('theme', 'light');
    }
  
    // Detect changes after toggling
    this.cdr.detectChanges();
  }
  onLogout() {
    this.auth.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.error('Logout failed', err);
      }
    });
  }

  goToCreateProject(urlroute:string){
    this.router.navigate([urlroute]);
  }


  startTutorial() {
 
    this.router.navigate(['/tutorial']); // Assuming you have a tutorial route
  }
  
}