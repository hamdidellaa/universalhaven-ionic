import { TasknotificationserviceService } from './../../../service/tasknotificationservice.service';
import { TaskService } from './../../../service/taskservice';
import { UserService } from './../../../service/userservice';
import { Task } from './../../../models/task';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the CreatetaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createtask',
  templateUrl: 'createtask.html',
})
export class CreatetaskPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private userService:  UserService
    ,private taskService:TaskService,public events: Events,private taskNotification: TasknotificationserviceService) {
  }

  public task : Task = new Task();
  public color: string="secondary";
  public text:  string="LOW";
  
  public form : FormGroup = new FormGroup({
      'description':new FormControl('',Validators.required),
      'deadline': new FormControl('',Validators.required),
      'userid': new FormControl('',Validators.required),
      'priority': new FormControl('0',Validators.required)
  });


  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatetaskPage');
  }
  
  addTask(){
      this.userService.getUser().then(val=>{
          this.task.TaskAssignerId= JSON.parse(val).id;
          console.log(this.task);
          this.task.Priority= (Number(this.task.Priority)+1) +"";
          this.taskService.addTask(this.task).subscribe(resp=>{
              this.events.publish("newtask",resp.json());
              this.taskNotification.sendNewTaskNotification(resp.json());
              this.navCtrl.pop();
          });
      })
  }

  onChange(){
      console.log("here");
      if (this.task.Priority=="0"){
        this.color="secondary";
        this.text="LOW";
      }
      
      if (this.task.Priority=="1"){
        this.color="primary";
        this.text="MEDIUM";
      }
      if (this.task.Priority=="2"){
        this.color="danger";
        this.text="HIGH";
      }
  }
}
