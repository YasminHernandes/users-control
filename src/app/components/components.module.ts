import { NgModule } from "@angular/core";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { CommonModule } from "@angular/common";
import { CepPipe, PhonePipe } from "../pipes/pipes";
import { MessageComponent } from './message/message.component';

@NgModule({
    imports: [
      AngularMaterialModule,
      ReactiveFormsModule,
      CommonModule,
      AngularSvgIconModule.forRoot(),
    ],
    declarations: [
      FormComponent,
      MessageComponent,
      CepPipe,
      PhonePipe,
    ],
    exports: [
      AngularMaterialModule,
      FormComponent,
      CommonModule
    ]
})

export class ComponentsModule {}