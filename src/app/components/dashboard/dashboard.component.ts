import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  username: string = ''; 

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
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
  
  
  
}
