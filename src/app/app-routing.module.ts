import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Layouts
import { EmptyLayoutComponent } from './layouts/empty/empty-layout.component';

//components
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { page404Component } from './components/page404/page404.component';

const routes: Routes = [
  // { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
    ],
  },

  {path: '**', component: page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
