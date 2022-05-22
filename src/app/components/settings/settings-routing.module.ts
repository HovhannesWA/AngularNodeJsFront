import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,    
    children: [
      { path: 'account', component: AccountSettingsComponent },
      { path: 'general', component: GeneralSettingsComponent },
    ]    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class SettingsRoutingModule {}
