import { Task } from './../models/task';
import { Endpoints } from './endpoints';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';



@Injectable()


export class TaskService{

    ressourceEndpoint = Endpoints.DOTNET+"Task"
    constructor(private http : Http,private storage: Storage){

    }

    getTasksByUser(userid){
        return this.http.get(this.ressourceEndpoint+"/?userId="+userid);
    }


    updateTaskStatus(task : Task, status: String){
        return this.http.put(this.ressourceEndpoint+'/'+task.id+'?status='+status,task);
    }


    addTask(task:Task){
        return this.http.post(this.ressourceEndpoint,task);
    }
    

    saveCalendar(id){
        this.storage.set("calendar",id);
    }

    getCalendar(){
        return this.storage.get("calendar");
    }


    

}