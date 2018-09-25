import { UserService } from './../../service/userservice';
import { FundraisingEventService } from './../../service/fundraisingeventservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FundraisingEvent } from './../../models/FundraisingEvent';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';
/**
 * Generated class for the AddFundraisingEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-fundraising-event',
  templateUrl: 'add-fundraising-event.html',
})
export class AddFundraisingEventPage {
  user: any;
  public fundraisingEvent:FundraisingEvent;
  public spinner : LoadingController;
  public camps:any[];
  urgency:string[]=["HIGH","LOW","MEDIUM"];
  public eventFormulaire : FormGroup = this.builder.group({
    "title" : ["",Validators.required],
    "description" : ["",[Validators.required,Validators.email]],
    "urgency": ["",Validators.required],
    "goal": ["",Validators.required],
    "imagePath": ["",Validators.required],
    "camp": ["",Validators.required],
    "publisher": ["",Validators.required]
  });

  constructor(public navCtrl: NavController, public navParams: NavParams,private builder: FormBuilder
  , public  services : FundraisingEventService
  ,public toast : ToastController ,public loadingCtrl: LoadingController,private serviceUser : UserService
    ,private localNotification: PhonegapLocalNotification) {
    this.getAllCamps();
    this.urgency;
    var other= this;
    serviceUser.getUser().then(function(val){
       // this.user= JSON.parse(val);
       other.user= JSON.parse(val);
    })
  }
  getAllCamps(){
    this.services.getCamps().subscribe(
      res => {
        this.camps = res;
      }
    )
  }
  notification(){
    this.localNotification.requestPermission().then(
      (permission) => {
        if (permission === 'granted') {
    
          // Create the notification
          this.localNotification.create('UniversalHaven', {
            tag: 'Fundraising event',
            body: 'Thnak you adding this event',
            icon: 'assets/icon/favicon.ico'
          });
    
        }
      }
    );
  }

    
  Submit(){
    this.fundraisingEvent = new FundraisingEvent();
    this.fundraisingEvent.title= this.eventFormulaire.get("title").value;
    this.fundraisingEvent.description = this.eventFormulaire.get("description").value;
    this.fundraisingEvent.goal = this.eventFormulaire.get("goal").value;
    this.fundraisingEvent.imagePath ='rohingya.jpg'; //this.eventFormulaire.get("imagePath").value;
    this.fundraisingEvent.urgency = this.eventFormulaire.get("urgency").value;
    this.fundraisingEvent.camp = this.eventFormulaire.get("camp").value;
    this.fundraisingEvent.publisher =this.user.id/* this.eventFormulaire.get("publisher").value*/;
    this.services.addEvent(this.fundraisingEvent).subscribe(resp=> {
      this.fundraisingEvent=resp.json();
      let toast = this.toast.create({
        message: 'Event was successful added ',
        duration: 3000,
        position: 'middle'

        
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
          });
      toast.present();
      this.notification();
      
    })
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFundraisingEventPage');
  }
}


