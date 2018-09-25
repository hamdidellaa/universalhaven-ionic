import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Donation } from './../../models/donation';
import { DonationService } from './../../service/donationservice';
import { Countries } from './../../utils/countries';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,Loading,ToastController } from 'ionic-angular';

/**
 * Generated class for the DonatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-donate',
  templateUrl: 'donate.html',
})
export class DonatePage {
  public checkingOut : boolean = false;
  public countries : any;
  public donation  : Donation;
  public cardNumber: string;
  public expYear : number;
  public expMonth : number;
  public cvc : number;
  public spinner : Loading;
  public donationForm : FormGroup =this.builder.group({
    "firstName" : ["",Validators.required],
    "lastName": ["",Validators.required],
    "email" : ["",[Validators.required,Validators.email]],
    "amount": ["",[Validators.required,Validators.min(1)]],
    "country": ["",Validators.required],
    "address": ["",Validators.required],
    "creditCardNumber": ["",[Validators.required]],
    "expYear": ["", [Validators.required,Validators.min(2017)]],
    "expMonth": ["", [Validators.required,Validators.min(1),Validators.max(12)]],
    "cvc": ["",[Validators.required]] 
  });
  constructor(public navCtrl: NavController, public navParams: NavParams,public service :DonationService
    , private builder: FormBuilder ,public loadingCtrl: LoadingController,public toastCtrl : ToastController) {
    this.countries= Countries.getCountries();
    
    
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonatePage');
  }

  handleSubmit(){
    console.log(this.donationForm);
    if (this.donationForm.valid==false){
      return;
    }
    this.spinner = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.spinner.present();
    this.donation = new Donation();
    this.donation.contributorName= this.getFormControl("firstName").value+" "+this.getFormControl("lastName").value;
    this.donation.amount = this.getFormControl("amount").value;
    this.donation.country = this.getFormControl("country").value;
    this.donation.contributorEmail = this.getFormControl("email").value;
    this.donation.contributorAddress= this.getFormControl("address").value;
    this.cardNumber= this.getFormControl("creditCardNumber").value;
    this.expMonth = this.getFormControl("expMonth").value;
    this.expYear = this.getFormControl("expYear").value;
    this.cvc =  this.getFormControl("cvc").value;
    
    this.service.getCardToken(this.cardNumber,this.expMonth,this.expYear,this.cvc).subscribe(resp=>{
      this.service.donate(this.donation,resp.json().id).subscribe( resp => {
          this.spinner.dismiss();
          let toast = this.toastCtrl.create({
            message: 'Donation was successful',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          console.log(resp.text());
          this.navCtrl.popToRoot();
      }, err=>{
        let toast =this.toastCtrl.create({
          message: 'Error connecting to our server, please try again later..',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.spinner.dismiss();
        console.log(err);
      } );
    },err=>{
      console.log("Error");
      let toast = this.toastCtrl.create({
        message: 'Please check your credit card information',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      this.spinner.dismiss();
      //console.log(err.message);
    });
  }

  getFormControl(name:string){
    return this.donationForm.get(name);
  }
  
  checkout(){
    if ( (this.getFormControl("firstName").valid) && (this.getFormControl("lastName").valid)
    && (this.getFormControl("email").valid) && (this.getFormControl("address").valid) 
    && (this.getFormControl("country").valid))
    this.checkingOut=true;
  }

  goBack(){
    if (this.checkingOut==false){
      this.navCtrl.popToRoot();
    }
    this.checkingOut=false;
  }
}
