import { NgModule } from "@angular/core";
import { RegisterComponent } from "./register/register.component";
import { ComponentsModule } from "../components/components.module";

@NgModule({
    imports: [
        ComponentsModule
    ],
    declarations: [
        RegisterComponent
    ],
    exports: [
        RegisterComponent
    ]
})

export class PagesModule {}