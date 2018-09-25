import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FundraisingEventPage } from './fundraising-event';

@NgModule({
  declarations: [
    FundraisingEventPage,
  ],
  imports: [
    IonicPageModule.forChild(FundraisingEventPage),
  ],
})
export class FundraisingEventPageModule {}
