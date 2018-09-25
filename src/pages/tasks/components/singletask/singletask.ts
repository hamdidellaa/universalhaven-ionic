import { Component, Input } from '@angular/core';
import { Task } from '../../../../models/task';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { TaskdetailsPage } from '../../taskdetails/taskdetails';

/**
 * Generated class for the SingletaskComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'singletask',
  templateUrl: 'singletask.html'
})
export class SingletaskComponent {

  @Input()
  task: Task;

  constructor(public navCtrl: NavController) {
    console.log('Hello SingletaskComponent Component');
    
  }

  taskDetails(task :Task){
    this.navCtrl.push(TaskdetailsPage,{task:task});
  }

}
