import { MyEventsPage } from './../my-events/my-events';
import { AddFundraisingEventPage } from './../add-fundraising-event/add-fundraising-event';
import { TaskdetailsPage } from './../tasks/taskdetails/taskdetails';
import { Task } from './../../models/task';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { TasknotificationserviceService } from './../../service/tasknotificationservice.service';
import { BackgroundMode } from '@ionic-native/background-mode';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { TasksPage } from './../tasks/all/tasks';
import { IndexvisitorPage } from './../indexvisitor/indexvisitor';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HomePage } from './../home/home';
import { UserService } from './../../service/userservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform, Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { TaskComment } from '../../models/taskcomment';

/**
 * Generated class for the IndexuserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-indexuser',
  templateUrl: 'indexuser.html',
})
export class IndexuserPage {
  user: any;
  username: string = "";
  pages: Array<{ title: string, component: any }>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private service: UserService,
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private FingerPrint: FingerprintAIO,
    private toastCtrl: ToastController,
    private backgroundMode: BackgroundMode,
    private taskNotifications: TasknotificationserviceService,
    private localNotification: LocalNotifications,
    private events : Events) {
    this.initializeApp();
    this.pages = [
      { title: 'Tasks', component: TasksPage },
      { title: 'Home', component: IndexvisitorPage },

      { title: 'My events',component: MyEventsPage }  
    ];
    var other = this;
    service.getUser().then(function (val) {
      // this.user= JSON.parse(val);
      other.user = JSON.parse(val);
    })
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      let that = this;
      this.backgroundMode.configure({
        silent: true
      });

      this.backgroundMode.enable();
      this.backgroundMode.on("enable").subscribe(function () {
        that.service.getUser().then(val => {
          let user = JSON.parse(val);
          that.taskNotifications.listenForNewTasks().subscribe((t: string) => {
            let task: Task = JSON.parse(t);
            if (task.taskExecutor == user.login) {
              that.events.publish("newtask",task);
              that.localNotification.schedule({
                id: task.id,
                text: 'A new task has been assigned to you, check it out !',
                data: { type: "task", task: task }
              });
            }
          })
          that.taskNotifications.listenForComments().subscribe((c: string) => {
            let comment: TaskComment = JSON.parse(c);
            if (comment.to == user.login) {
              that.localNotification.schedule({
                id: comment.TaskCommentId,
                text: comment.Publisher + " : "+comment.Content,
                data: { type: "comment", comment: comment }
              });
              that.events.publish("newcomment",comment);
            }
          })

          that.localNotification.on("click", notification => {
            console.log(notification);
            that.backgroundMode.moveToForeground();
            let task: Task = new Task();
            if (notification.data.type == "task") {
              
              that.menu.enable(false);
              that.navCtrl.setRoot(IndexuserPage);
              that.navCtrl.push(TasksPage);
              that.navCtrl.push(TaskdetailsPage, { task: notification.data.task });
            }

            else {
              that.menu.enable(false);
              that.navCtrl.setRoot(IndexuserPage);
              that.navCtrl.push(TasksPage);
            }
          })

        })


      });
    });
  }
  ionViewDidLoad() {
    let that = this;
    this.service.getLocked().then(function (val) {
      if (val == "true") {
        that.showFingerPrint();
      }
    })
  }

  logout() {
    let nav = this.navCtrl;
    this.service.logOut().then(function () {
      nav.setRoot(HomePage);
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();

    console.log(page.component);
    if (page.component == IndexvisitorPage) {
      this.menu.enable(false);
      this.navCtrl.popToRoot();
      this.navCtrl.setRoot(IndexvisitorPage);

    }
    else {
      this.navCtrl.push(page.component);
    }

    // navigate to the new page if it is not the current page

  }

  toggleMenu() {
    this.menu.open();
  }

  showFingerPrint() {
    let that = this;
    that.FingerPrint.show({
      clientId: "Fingerprint-Demo",
      clientSecret: "password" //Only necessary for Android
    }).then(resp => {
      that.service.unlock();
    }, (err) => {
      that.menu.enable(false);
      that.navCtrl.setRoot(IndexvisitorPage);
    });
  }

  lock() {
    this.FingerPrint.isAvailable().then(isAvailableSuccess).catch(isAvailableError);
    let that = this;
    function isAvailableSuccess(result) {
      that.service.lock();
      console.log("Fingerprint available");
      let toast = that.toastCtrl.create({
        message: 'The user area was succesfully locked',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      that.menu.enable(false);
      that.navCtrl.setRoot(IndexvisitorPage);
    }

    function isAvailableError(message) {
      let toast = that.toastCtrl.create({
        message: 'This feature is not supported by your phone',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
  }

}
