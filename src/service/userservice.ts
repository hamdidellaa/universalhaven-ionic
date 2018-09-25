import { Endpoints } from './endpoints';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';


@Injectable()
export class UserService{

    static resourceEndpoint: string = Endpoints.JAVA_EE+"user";

    constructor(private http : Http,private storage: Storage){
        
    }
    setPrefTaskBackground(path){
        return this.storage.set("prefTaskImage",path);
    }
    getPrefTaskBackground(){
        return this.storage.get("prefTaskImage");
    }
    getUser(){
        return this.storage.get("user");
    }

    getToken(){
        return this.storage.get("token");
    }

    logOut(){
        this.storage.remove("user");
        return this.storage.remove("token");
    }
    postLogin(user,token){
        console.log(user);
        this.storage.set("user",user).catch(err=>console.log(err));
        this.storage.set("token",token).catch(err=>console.log(err));;
    }
    



    login(login:string,password:string){
       
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' , 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let data= "login="+login+"&password="+password;

        return this.http.post(UserService.resourceEndpoint+"/login",data,options);
        
    }


    registerDevice(token,userid){
        return this.http.post(UserService.resourceEndpoint+"/updateToken?token="+token+"&userid="+userid,{});
    }


    lock(){
        this.storage.set("locked","true");
    }

    unlock(){
        this.storage.set("locked","false");
    }

    getLocked(){
        return this.storage.get("locked");
    }

}