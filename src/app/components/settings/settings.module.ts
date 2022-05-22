import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { GeneralSettingsComponent } from "./general-settings/general-settings.component";
import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";

@NgModule({
    declarations: [
        SettingsComponent,
        AccountSettingsComponent,
        GeneralSettingsComponent
    ],
    imports: [RouterModule, SettingsRoutingModule]
})
export class SettingsModule {}