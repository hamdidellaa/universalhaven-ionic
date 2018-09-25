
import { TasksPage } from './../pages/tasks/all/tasks';
import { UserService } from './../service/userservice';
import { TaskdetailsPage } from './../pages/tasks/taskdetails/taskdetails';

import { DonatePage } from './../pages/donate/donate';
import { IndexvisitorPage } from './../pages/indexvisitor/indexvisitor';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { OneSignal } from '@ionic-native/OneSignal';
import { IndexuserPage } from '../pages/indexuser/indexuser';
import { Shake } from '@ionic-native/shake';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { TaskComment } from '../models/taskcomment';
import { NavController } from 'ionic-angular/navigation/nav-controller';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = IndexvisitorPage;

  constructor( platform: Platform, statusBar: StatusBar, private userService: UserService, splashScreen: SplashScreen,
    ) {
    splashScreen.show();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      //splashScreen.hide();
      // OneSignal Code start:
      // Enable to debug issues:
      // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
      let that = this;
      var notificationOpenedCallback = function (jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };
      

    });
  }
}

