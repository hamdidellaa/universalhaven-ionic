import { PipesModule } from './../../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskdetailsPage } from './taskdetails';

@NgModule({
  declarations: [
    TaskdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskdetailsPage),
    PipesModule
  ],
})
export class TaskdetailsPageModule {}
