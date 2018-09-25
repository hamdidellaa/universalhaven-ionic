import { FundraisingEventPage } from './../fundraising-event/fundraising-event';
import { Endpoints } from './../../service/endpoints';
import { DonatePage } from './../donate/donate';
import { HomePage } from './../home/home';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, MenuController } from 'ionic-angular';

/**
 * Generated class for the IndexvisitorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-indexvisitor',
  templateUrl: 'indexvisitor.html',
})
export class IndexvisitorPage {
  pages: Array<{ title: string, component: any }>;
  public ip: string = "None";
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen) {

    this.pages = [

      { title: 'Donate', component: DonatePage },
      { title: 'Dashboard', component: HomePage },
       { title: 'Fundraising events', component: FundraisingEventPage }
    ];
    this.ip = Endpoints.JAVA_EE;
       
  }

  ionViewDidLoad() {
    this.splashScreen.hide();
    this.menu.enable(true);
   
  }

  openPage(page) {
    if (page.component == HomePage) {
      this.navCtrl.setRoot(HomePage);
    }
    else {
      this.navCtrl.push(page.component);
    }
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page

  }

  toggleMenu() {
    this.menu.open();
  }

}
