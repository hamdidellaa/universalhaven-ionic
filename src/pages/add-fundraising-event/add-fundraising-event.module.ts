import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddFundraisingEventPage } from './add-fundraising-event';

@NgModule({
  declarations: [
    AddFundraisingEventPage,
  ],
  imports: [
    IonicPageModule.forChild(AddFundraisingEventPage),
  ],
})
export class AddFundraisingEventPageModule {}
