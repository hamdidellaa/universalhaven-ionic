import { FundraisingEventDetailPage } from './../fundraising-event-detail/fundraising-event-detail';
import { AddFundraisingEventPage } from './../add-fundraising-event/add-fundraising-event';
import { Storage } from '@ionic/storage';
import { FundraisingEventService } from './../../service/fundraisingeventservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';


/**
 * Generated class for the FundraisingEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fundraising-event',
  templateUrl: 'fundraising-event.html',
})
export class FundraisingEventPage {
  public people: any = [];
  events=[];
  searchTerm: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private service:FundraisingEventService, public modalCtrl:ModalController,
      public storage:Storage,public toast : ToastController) {
      this.getAll();
      localStorage.removeItem('id');
     
  }
    doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
    getAll()
  {
    this.service.getAll().subscribe(data =>
      {
       this.events = data ;
      } ) ;
   
    
  }
  goToSomethingElse(id) {
    localStorage.setItem('id',id);
    this.navCtrl.push(FundraisingEventDetailPage); 
}
  goToAddEvent() {
    
    this.navCtrl.push(AddFundraisingEventPage); 
}
  AddEvent(){
    this.navCtrl.push('AddFundraisingEventPage');
  }

  addItem() {
    let addModal = this.modalCtrl.create('AddFundraisingEventPage');
    
    addModal.present();
  }

  
  getItems(ev: any) {
    // Reset items back to all of the items
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if ( val.trim() != '') {
      this.events = this.events.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
     else{ 
       this.service.getAll().
    subscribe(fundraisingEvent=>this.events=fundraisingEvent);
  }
  }
  
  


  ionViewDidLoad() {
    console.log('ionViewDidLoad FundraisingEventPage');
  }

}
