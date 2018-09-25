import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Endpoints } from './../../../service/endpoints';
import { TaskCommentService } from './../../../service/taskcommentservice';
import { Task } from './../../../models/task';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { TaskComment } from '../../../models/taskcomment';
import { UserService } from '../../../service/userservice';
import { TaskService } from '../../../service/taskservice';
import { Calendar } from '@ionic-native/calendar';
import { Shake } from '@ionic-native/shake';
import { TasknotificationserviceService } from '../../../service/tasknotificationservice.service';

/**
 * Generated class for the TaskdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-taskdetails',
  templateUrl: 'taskdetails.html',
})
export class TaskdetailsPage implements OnInit {

  task: Task = new Task();
  calendarId: number;
  fab1 = ["", "primary"];
  fab2 = ["", "primary"];
  fab3 = ["", "primary"];
  fab4 = ["", "primary"];
  public added = false;
  public dotnetUri = Endpoints.DOTNET_IP;
  comment: TaskComment = new TaskComment();
  isManager: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public service: TaskCommentService, public userService: UserService
    , public taskService: TaskService, public toastCtrl: ToastController, public events: Events,
    private calendar: Calendar, private shake: Shake, private speech: SpeechRecognition,private taskNotification: TasknotificationserviceService) {

  }
  initCalendar() {
    this.calendar.createCalendar('Universalhaven tasks').then(
      (msg) => {
        console.log("Created calendar with id " + msg);
        this.calendarId = msg;
        this.calendar.getCalendarOptions().calendarId = msg;
        this.calendarId = msg;
        this.taskService.saveCalendar(msg);
      },
      (err) => { console.log(err); }
    );

  }
  ngOnInit() {
    let that = this;
    this.events.subscribe("newcomment",comment=>{
        var tmp = [comment];
        this.task.comments = tmp.concat(this.task.comments);
    })
    this.calendar.hasReadWritePermission().then(val => {
      console.log(val);
    });
   
    
    this.shake.startWatch(40).subscribe(() => {
      that.speech.requestPermission().then(() => {
        that.speech.startListening({ language: "english" })
          .subscribe(
          (matches: Array<string>) => { 
            if (matches.length!=0){
              that.comment.Content= matches[0];
            }
           },
          (onerror) => console.log('error:', onerror)
          )
      });

    });

    this.taskService.getCalendar().then(function (val) {
      console.log(val);
      if ((val == null) || (val === undefined)) {
        that.initCalendar();
      }
      else {
        console.log("calendar exists, and id is " + val);
        that.calendarId = val;
        that.calendar.getCalendarOptions().calendarId = val;
        that.find();
      }
    }).catch(function (err) {
      that.initCalendar();
    })

    this.task = this.navParams.get("task");
    console.log("STATUS : " + this.task.status);
    console.log(this.task);
    if (this.task.status.toLowerCase() == "pending") {
      this.fab1 = ["primary", "white"];
    }
    if (this.task.status.toLowerCase() == "doing") {
      this.fab2 = ["primary", "white"];
    }
    if (this.task.status.toLowerCase() == "done") {
      this.fab3 = ["primary", "white"];
    }
    if (this.task.status.toLowerCase() == "declined") {
      this.fab4 = ["primary", "white"];
    }
    // this.task = new Task();
    // this.task.id= 20;
    // this.task.description="Test";

    this.userService.getUser().then(val => {
      let user = JSON.parse(val);
      if (user.role == "CAMP_MANAGER") {
        this.isManager = true;
      }
      else {
        this.isManager = false;
      }
    })
    this.service.getTaskComments(this.task.id).subscribe(resp => {
      this.task.comments = resp.json();
      this.task.comments.reverse();
    }, err => { })
  }

  addComment() {
    if (this.comment.Content==""){
      return;
    }
    this.userService.getUser().then(val => {
      let user = JSON.parse(val);
      this.comment.PublisherId = user.id;
      this.service.addComment(this.comment, this.task.id).subscribe(resp => {
        var tmp = [resp.json()];
        this.task.comments = tmp.concat(this.task.comments);
        let comment : TaskComment = resp.json();
        comment.to = this.task.taskAssigner==user.login ? this.task.taskExecutor : this.task.taskAssigner;
        this.taskNotification.sendCommentNotification(comment);
        this.comment.Content = "";
        console.log(resp);
      });
    });
    console.log("Commenting.. " + this.comment.Content);
  }
  updateStatus(status) {
    this.taskService.updateTaskStatus(this.task, status).subscribe(resp => {
      let toast = this.toastCtrl.create({
        message: 'Task moved to ' + status,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      this.events.publish("statusUpdate", { task: this.task, status: status });
      this.task.status = status;
    }, err => {
      let toast = this.toastCtrl.create({
        message: 'Problem connecting to our server',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });
  }
  find() {
    let that = this;
    this.calendar.findEventWithOptions(this.task.description, "" + this.task.id, "Assigned  by " + this.task.taskAssigner, new Date(this.task.startingDate),
      new Date(this.task.deadline), { calendarId: this.calendarId }).then(function (event) {
        if (event.length != 0) {
          that.added = true;
        }
      }).catch(function (error) {
        console.log("There is an error");
        console.log(error);
      })
  }
  addToCalendar() {


    // console.log(this.task.deadline);
    let that = this;
    this.calendar.createEventWithOptions(this.task.description, "" + this.task.id, "Assigned  by " + this.task.taskAssigner, new Date(this.task.startingDate),
      new Date(this.task.deadline), { calendarId: this.calendarId }).then(function (value) {
        that.added = true;
        let toast = that.toastCtrl.create({
          message: 'Task was added to your calendar',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        console.log(value);
      }, function (err) {
        console.log("There is an error");
        console.log(err);
      });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskdetailsPage');
  }
}
