import { FundraisingEventDetailPageModule } from './../pages/fundraising-event-detail/fundraising-event-detail.module';
import { TasksPageModule } from './../pages/tasks/all/tasks.module';
import { AddFundraisingEventPageModule } from './../pages/add-fundraising-event/add-fundraising-event.module';
import { MyEventsPageModule } from './../pages/my-events/my-events.module';
import { FundraisingEventPageModule } from './../pages/fundraising-event/fundraising-event.module';
import { OneSignal } from '@ionic-native/OneSignal';
import { ImagePicker } from '@ionic-native/image-picker';
import { TaskCommentService } from './../service/taskcommentservice';
import { MyEventsPage } from './../pages/my-events/my-events';
import { FundraisingEventDetailPage } from './../pages/fundraising-event-detail/fundraising-event-detail';
import { AddFundraisingEventPage } from './../pages/add-fundraising-event/add-fundraising-event';
import { FundraisingEventService } from './../service/fundraisingeventservice';
import { FundraisingEventPage } from './../pages/fundraising-event/fundraising-event';
import { AbsoluteDragDirective } from './../directives/absolute-drag/absolute-drag';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { Shake } from '@ionic-native/shake';
import { DonationService } from './../service/donationservice';
import { DonatePage } from './../pages/donate/donate';
import { IndexvisitorPage } from './../pages/indexvisitor/indexvisitor';
import { IndexuserPage } from './../pages/indexuser/indexuser';
import { UserService } from './../service/userservice';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {FormsModule} from '@angular/forms';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {HttpModule} from "@angular/http";
import { IonicStorageModule } from '@ionic/storage';
import { TaskService } from '../service/taskservice';
import { PipesModule } from '../pipes/pipes.module';
import { Camera } from '@ionic-native/camera';
import { SMS } from '@ionic-native/sms';
import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { Base64 } from '@ionic-native/base64';
import { BackgroundMode } from '@ionic-native/background-mode';
import { NavController } from 'ionic-angular/navigation/nav-controller';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IndexuserPage,
    IndexvisitorPage,
    DonatePage,
    AbsoluteDragDirective,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,    
    HttpModule,
    IonicStorageModule.forRoot({
         name: 'universalhaven',
         driverOrder: ['websql', 'sqlite']
    }),
    PipesModule,
    TasksPageModule,
    FundraisingEventPageModule,
    MyEventsPageModule,
    AddFundraisingEventPageModule,
    FundraisingEventDetailPageModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IndexuserPage,
    IndexvisitorPage,
    DonatePage
  ],
  providers: [
   
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    DonationService,
    ImagePicker,
    Base64,
    File,
    OneSignal,
    FingerprintAIO,
    Shake,
    BackgroundMode,
    DonationService,FundraisingEventService,
    AddFundraisingEventPage,
    SocialSharing,
    PhonegapLocalNotification,File,
    FileOpener
    
  ]
})
export class AppModule {}
