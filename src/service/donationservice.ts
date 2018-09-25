import { Endpoints } from './endpoints';
import { Donation } from './../models/donation';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class DonationService{
    private key = "Bearer pk_test_VX83luKmf3HeJ7JI8B1ItSOU";
    private stripeEndpoint ="https://api.stripe.com/v1/tokens";
    private resourceEndpoint = Endpoints.JAVA_EE+"donation";
    constructor (private http: Http) {
        
    } 

    getCardToken(cardnumber :string, expMonth : number, expYear: number, cvc: number){
        var data= "card[number]="+cardnumber+"&card[exp_month]="+expMonth+"&card[exp_year]="
        +expYear+"&card[cvc]="+cvc;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' , 'Accept': 'application/json',
            'Authorization': this.key });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.stripeEndpoint, data, options);
    }
    
    
    donate( donation:Donation, token: string ){
        console.log(donation);
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        var data = { 
            "donation" : (donation),
            "method" : "stripe",
            "token" : token
        };
        console.log(JSON.stringify(data));

        return this.http.post(this.resourceEndpoint,JSON.stringify(data),options);
    }


}