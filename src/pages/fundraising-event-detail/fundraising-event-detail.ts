import { FundraisingEventService } from './../../service/fundraisingeventservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { FundraisingEvent } from "../../models/FundraisingEvent";



/**
 * Generated class for the FundraisingEventDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fundraising-event-detail',
  templateUrl: 'fundraising-event-detail.html',
})
export class FundraisingEventDetailPage {

  x:any;
  event:any;
  events=[];
  amountRecolted:number;
 
  pdfObj = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private service:FundraisingEventService ,private socialSharing: SocialSharing
    , private plt: Platform, private file: File, private fileOpener: FileOpener)
     {
    this.x=localStorage.getItem('id');
    this.service.getById(this.x).subscribe(data => this.event = data  ) ;  
    this.service.getSumAmountDonationByEvent(this.x)
      .subscribe(amount=>this.amountRecolted=amount);
  }
  
  getEE(){
    this.service.getAll().subscribe(
      data =>{
         this.events = data;
         for(var i = 0; i < this.events.length ; i++) {
          if(parseInt(this.events[i].id) === this.x) {
            
            this.event = this.events[i];
            break;
          } 
        }
        }
    )
  }

  goBack() {
    this.navCtrl.pop();
}
/*shareInfo()
    {
        this.socialSharing.share("demo message", "Demo subject", "", "https://ampersandacademy.com").
        then(() => {
        alert("Sharing success");
        // Success!
        }).catch(() => {
        // Error!
        alert("Share failed");
        });
    }*/
       createPdf() {
    var docDefinition = {
      content: [
        { text: this.event.title, style: 'header' },
        { text: this.event.publishDate, alignment: 'right' },
 
        { text: this.event.description }, 
        { text: 'Goal', style: 'subheader' },
        { text: this.event.goal+' $' },  
        { text: 'Raised', style: 'subheader' },
        { text: this.amountRecolted+' $' },             
        { text: 'Urgency', style: 'subheader' },
        { text: this.event.urgency }, 
        { text: 'Camp', style: 'subheader' },
        { text: this.event.camp.country+' : '+this.event.camp.address }, 
        
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }
  downloadPdf() {
    
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
        this.pdfObj.download();
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FundraisingEventDetailPage');
  }

}
