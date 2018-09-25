import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatetaskPage } from './createtask';

@NgModule({
  declarations: [
    CreatetaskPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatetaskPage),
  ],
})
export class CreatetaskPageModule {}
