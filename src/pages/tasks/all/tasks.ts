import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { CreatetaskPage } from './../createtask/createtask';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { BgPopOverPage } from './../bg-pop-over/bg-pop-over';
import { Task } from './../../../models/task';

import { TaskService } from './../../../service/taskservice';
import { UserService } from './../../../service/userservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { TaskdetailsPage } from '../taskdetails/taskdetails';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';

/**
 * Generated class for the TasksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage {

  userid: number;
  pending: Task[] = [];
  doing: Task[] = [];
  done: Task[] = [];
  declined: Task[] = [];
  isManager: boolean = false;
  bg: string = "assets/imgs/bg1.jpg";
  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService
    , private taskService: TaskService, public popoverCtrl: PopoverController, public events: Events
    , public serviceDragula: DragulaService) {

    

    var that = this;
    this.serviceDragula.drop.subscribe(val => {
      var id = (val[1].id);
      var to = (val[2].id);
      var from = (val[3].id);
      console.log(id);
      this.moveTask(id, from, to);
    });
    this.events.subscribe("newtask", function (task) {
      let tmp = [task];
      that.pending= tmp.concat(that.pending);
    });
    this.events.subscribe("statusUpdate", function (event) {
      let task = event.task;
      let status = event.status;
      console.log("From " + task.status + " to " + status);
      var from = [];
      var to = [];
      console.log(task);
      if (task.status == "PENDING") {
        from = that.pending;
      }
      else if (task.status == "DOING") {
        from = that.doing;
      }
      else if (task.status == "DONE") {
        from = that.done;
      }
      else if (task.status == "DECLINED") {
        from = that.declined;
      }
      if (status == "pending") {
        to = that.pending;
      }
      else if (status == "doing") {
        to = that.doing;
      }
      else if (status == "done") {
        to = that.done;
      }
      else if (status == "declined") {
        to = that.declined;
      }
      from.splice(from.indexOf(task), 1);
      to.push(task);
    })
    userService.getPrefTaskBackground().then(val => {
      if ((val !== undefined) && (val != null)) {
        this.bg = val;

      }

    })
    var other = this;
    userService.getUser().then(function (val) {
      let user = JSON.parse(val);
      other.userid = user.id;
      console.log(user.role);
      if (user.role == "CAMP_MANAGER") {
        other.isManager = true;
      }
      if (other.userid !== undefined) {
        other.taskService.getTasksByUser(other.userid).subscribe(resp => {
          let results = (resp.json());
          console.log(resp);
          other.pending = results.pending;
          other.doing = results.doing;
          other.done = results.done;
          other.declined = results.declined;
          other.pending.reverse();
          other.doing.reverse();
          other.done.reverse();
          other.declined.reverse();
        }
          , err => {
            console.log(err);
          });
      }
    })
  }


  moveTask(id, from, to) {
    let fromArray = [];
    let toArray = [];
    if (from == "pending") {
      fromArray = this.pending;
    }
    else if (from == "doing") {
      fromArray = this.doing;
    }
    else if (from == "done") {
      fromArray = this.done;
    }
    else {
      fromArray = this.declined;
    }
    if (to == "pending") {
      toArray = this.pending;
    }
    else if (to == "doing") {
      toArray = this.doing;
    }
    else if (to == "done") {
      toArray = this.done;
    }
    else {
      toArray = this.declined;
    }
    let task = new Task();
    for (var i = 0; i < fromArray.length; i++) {
      if (fromArray[i].id == id) {
        task = fromArray[i];
      }
    }
    this.taskService.updateTaskStatus(task, to).subscribe(resp => {
      fromArray.splice(fromArray.indexOf(task), 1);
      toArray.push(task);
    }, err => {

    })



  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TasksPage');
  }

  taskDetails(task: Task) {
    this.navCtrl.push(TaskdetailsPage, { task: task });
  }

  logDrag($event) {
    console.log($event);
  }


  changeBackground() {
    let ev = {
      target: {
        getBoundingClientRect: () => {
          return {
            top: 40,
            right: 0
          };
        }
      }
    };
    let that = this;
    let popover = this.popoverCtrl.create(BgPopOverPage);
    popover.present({ ev });

    popover.onDidDismiss(function () {
      that.userService.getPrefTaskBackground().then(val => {
        if (val !== undefined) {
          that.bg = val;
          console.log("Setting bg to " + val);
        }
      })
    })
  }

  addTask() {
    this.navCtrl.push(CreatetaskPage);
  }

}
