import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectComponent } from './pages/createproject/createproject.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MarkdownComponent } from './pages/markdown/markdown.component';
import { EditpageComponent } from './pages/editpage/editpage.component';
import { ViewPageComponent } from './pages/viewpage/viewpage.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard',  component: DashboardComponent},
  { path: 'createproject',  component:CreateProjectComponent},
  { path: 'markdown', component: MarkdownComponent },
  { path: 'editpage', component: EditpageComponent },
  { path: 'editpage/:projectName/:pageName', component: EditpageComponent },
  { path: 'viewpage/:projectName/:pageName', component: ViewPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
