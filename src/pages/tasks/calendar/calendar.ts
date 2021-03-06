import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public FingerPrint: FingerprintAIO) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

}
