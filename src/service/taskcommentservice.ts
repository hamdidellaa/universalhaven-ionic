import { TaskComment } from './../models/taskcomment';
import { Endpoints } from './endpoints';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { UserService } from './userservice';



@Injectable()

export class TaskCommentService{

    ressourceEndpoint = Endpoints.DOTNET+"TaskComments";

    constructor(private http : Http,private userService : UserService){

    }

    getTaskComments(taskid: number){
        return this.http.get(this.ressourceEndpoint+"?taskId="+taskid);
    }


    addComment(comment: TaskComment, taskId: number){
        comment.PublishDate = new Date();
        comment.TaskId= taskId;
        return this.http.post(this.ressourceEndpoint,comment);
    }

}