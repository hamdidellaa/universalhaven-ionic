import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FundraisingEventDetailPage } from './fundraising-event-detail';

@NgModule({
  declarations: [
    FundraisingEventDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FundraisingEventDetailPage),
  ],
})
export class FundraisingEventDetailPageModule {}
