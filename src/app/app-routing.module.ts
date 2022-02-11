import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//Layouts
import { EmptyLayoutComponent } from './layouts/empty/empty-layout.component';

//components
import {LoginComponent} from './components/login/login.component';


 

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: EmptyLayoutComponent, children: [{path: '', component: LoginComponent}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
