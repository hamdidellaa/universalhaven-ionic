import { Base64 } from '@ionic-native/base64';
import { UserService } from './../../../service/userservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ImagePicker,ImagePickerOptions } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
/**
 * Generated class for the BgPopOverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bg-pop-over',
  templateUrl: 'bg-pop-over.html',
})
export class BgPopOverPage {


  selected : any = {};

  images : any[]= [];
  chosenImage: any = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public service: UserService,
    public viewCtrl : ViewController,private imagePicker: ImagePicker,public file: File) {
    this.images= [

        {path: "assets/imgs/tasks/bg1.jpg",selected : false},
        {path: "assets/imgs/tasks/bg2.jpg",selected : false},
        {path: "assets/imgs/tasks/bg3.jpg",selected : false},
        {path: "assets/imgs/tasks/bg4.jpg",selected : false},
        {path: "assets/imgs/tasks/bg5.jpg",selected : false},
        {path: "assets/imgs/tasks/bg6.jpg",selected : false},
        {path: "assets/imgs/tasks/bg7.jpg",selected : false}       
    ];
    var that = this;
    service.getPrefTaskBackground().then(function(val){
        if ( (val!==undefined) && (val!=null) &&  (val.indexOf("file")!=-1) )
            that.images.push({"path":val,selected:true});
        that.images.forEach(element=>{
            if (element.path==val){
                element.selected=true;
            }
        });
    });
  }

  check(image){
    
    let index= this.images.indexOf(image);
    this.images.forEach(element => {
       if (element!=image){
         element.selected=false;
       }
       else{     
         element.selected=true;
         this.selected=element;
       }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BgPopOverPage');
  }

  change(){
    console.log(this.selected);
    if (this.selected===undefined)
      return;
      let that =this;
    this.service.setPrefTaskBackground(this.selected.path).then(
      function(){
        console.log("Changed");
        that.viewCtrl.dismiss();
      }
    ).catch(
      function(){
        console.log("Error");
      }
    );
  }


  upload(){
    let options = {maximumImagesCount:1,outputType:0};
    let that = this;
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
          
          let filePath: string = results[i];
          //this.chosenImage=filePath;
          console.log(this.file.cacheDirectory);
          var fileName =filePath.substring(filePath.lastIndexOf("/")+1,filePath.length);
          var file = this.file;
          this.file.copyFile(this.file.cacheDirectory,fileName,
          this.file.dataDirectory,fileName).then(function(){
            console.log("Moved !");
            that.chosenImage=file.dataDirectory+fileName;
            that.service.setPrefTaskBackground(that.chosenImage).then(function(){
              that.viewCtrl.dismiss()
            });

          }).catch(function(err){
            console.log(err);
          });

      }
    }, (err) => { this.chosenImage=err; });
  }

  

}
