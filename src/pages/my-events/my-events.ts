import { User } from './../../models/user';
import { FundraisingEventDetailPage } from './../fundraising-event-detail/fundraising-event-detail';
import { AddFundraisingEventPage } from './../add-fundraising-event/add-fundraising-event';
import { UserService } from './../../service/userservice';
import { FundraisingEventService } from './../../service/fundraisingeventservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyEventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-events',
  templateUrl: 'my-events.html',
})
export class MyEventsPage {

   events=[];
   user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams
  ,private service:FundraisingEventService,private serviceUser : UserService) {
    this.getAll();
    var other= this;
    serviceUser.getUser().then(function(val){
       // this.user= JSON.parse(val);
       other.user= JSON.parse(val);
    })
      
     
  }
   getAll()
  {
    this.service.getMyEvents(1).subscribe(data =>
      {
       this.events = data ;
      } ) ;
   
    
  }
    doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  goToAddEvent() {
    
    this.navCtrl.push(AddFundraisingEventPage); 
  }
  getItems(ev: any) {
    let val = ev.target.value;
    if ( val.trim() != '') {
      this.events = this.events.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
     else{ 
       this.service.getMyEvents(1).
    subscribe(fundraisingEvent=>this.events=fundraisingEvent);
  }
  }
goToSomethingElse(id) {
    localStorage.setItem('id',id);
    this.navCtrl.push(FundraisingEventDetailPage); 
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyEventsPage');
  }

}
