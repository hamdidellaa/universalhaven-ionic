import { IndexvisitorPage } from './../indexvisitor/indexvisitor';
import { IndexuserPage } from './../indexuser/indexuser';
import { UserService } from './../../service/userservice';
import { Component, OnInit,ViewChild  } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  
  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private userService: UserService
    , private toastCtrl : ToastController) {

    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });



  }

  ngOnInit() {
    this.userService.getUser().then((val) => {
      if (val != null) {
        console.log("Already logged in, must redirect");

        this.navCtrl.setRoot(IndexuserPage);

        
      }
      else {
        console.log("Not logged in ");
      }
    }).catch((err)=>{
      console.log(err);
    });
  }



  public invalidCredentials = false;

  public loginForm: FormGroup;

  goBack(){
      this.navCtrl.setRoot(IndexvisitorPage);
  }

  handleLogin() {
    let login = this.loginForm.get("login").value;
    let password = this.loginForm.get("password").value;
    this.invalidCredentials = false;
    console.log("Logging in " + login + " and pass = " + password);
    this.userService.login(login, password).subscribe(resp => {

      if (resp.status == 200) {
        let token = (resp.headers.get("Authorization"));
        console.log("Logged in !  and token is " + token);

        this.userService.postLogin(JSON.stringify(resp.json()), token);

       

        this.navCtrl.setRoot(IndexuserPage);
      }
    }, err => {
      if (err.status == 502) {
        this.invalidCredentials = true;
      }
      else {
        let toast = this.toastCtrl.create({
          message: 'We were unable to reach our server, please try again later',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
    });
  }



}
