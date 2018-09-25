import { CalendarPageModule } from './../calendar/calendar.module';
import { CreatetaskPageModule } from './../createtask/createtask.module';
import { SingletaskComponent } from './../components/singletask/singletask';
import { BgPopOverPageModule } from '../bg-pop-over/bg-pop-over.module';
import { TaskCommentService } from './../../../service/taskcommentservice';
import { TaskService } from './../../../service/taskservice';
import { TaskdetailsPageModule } from '../taskdetails/taskdetails.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { TaskdetailsPage } from '../taskdetails/taskdetails';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TasksPage } from './tasks';
import { DragulaModule } from 'ng2-dragula';
import { Calendar } from '@ionic-native/calendar';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { TasknotificationserviceService } from '../../../service/tasknotificationservice.service';
import { LocalNotifications } from '@ionic-native/local-notifications';

@NgModule({
  declarations: [
    TasksPage,
    SingletaskComponent
  ],
  imports: [
    IonicPageModule.forChild(TasksPage),
    TaskdetailsPageModule,
    BgPopOverPageModule,
    PipesModule,
    DragulaModule ,
    CreatetaskPageModule,
    CalendarPageModule
    
  ],
  providers: [
    TaskService,
    TaskCommentService,
    Calendar,
    SpeechRecognition,
    TasknotificationserviceService,
    LocalNotifications
  ]
})
export class TasksPageModule {}
