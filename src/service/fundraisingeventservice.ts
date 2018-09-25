import { Endpoints } from './endpoints';
import { FundraisingEvent } from './../models/FundraisingEvent';
import { Injectable } from '@angular/core';
import { Http,Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
@Injectable()
export class FundraisingEventService{
     private resourceEndpoint = Endpoints.JAVA_EE+"fundraisingEvent";
     private resourceEndpointCamp = Endpoints.JAVA_EE+"camp";
     constructor (private http: Http) {
        
    } 
    getAll (){
       
       return this.http.get(this.resourceEndpoint)
       .map(resp=>resp.json());
    }
      getMyEvents(idUser){
      return this.http.get(this.resourceEndpoint+"/event?idUser="
      +idUser).map(resp=>resp.json());
  }
    addEvent(event:FundraisingEvent){
        console.log(event);
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        var data = event ; 
        return this.http.post(this.resourceEndpoint,JSON.stringify(data),options);

    }

    getCamps(){
      return this.http.get(this.resourceEndpointCamp+"/findallcamps")
      .map(resp=>resp.json());
      }
    getById(id)
    {
       return  this.http.get(this.resourceEndpoint+"/event?idEvent="+id)
       .map(resp=>resp.json());
    }
     getSumAmountDonationByEvent(id:number)
     {
      return  this.http.get(this.resourceEndpoint+"/event?idFundraisingEvent="+id)
     .map(resp=>resp.json());
      }
     

}