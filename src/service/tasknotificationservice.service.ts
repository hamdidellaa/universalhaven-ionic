import { TaskComment } from './../models/taskcomment';
import { Injectable } from '@angular/core';


import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Task } from '../models/task';
import { Endpoints } from './endpoints';

@Injectable()
export class TasknotificationserviceService {

  constructor() { }
  private url = Endpoints.EXPRESS_IP;
  private socket;
  
  

  sendCommentNotification(comment:TaskComment){
      this.socket.emit("new comment",JSON.stringify(comment));
  }

  sendNewTaskNotification(task:Task){
    this.socket.emit("new task",JSON.stringify(task));
  }

  listenForNewTasks(){
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('new task', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  listenForComments(){
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('new comment', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }



  

}
