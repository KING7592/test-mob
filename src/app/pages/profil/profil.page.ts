import { Component, OnInit } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';




@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

img: any;
newdate: string;
id: any;
users: any =[];
result: any=[];
currentImage: string;
  constructor(public camera: Camera,public apiService: ApiService,public activateroute: ActivatedRoute
    ,public alertCtrl: AlertController,public navCtrl: NavController) { }

ngOnInit() {
    this.id=this.activateroute.snapshot.paramMap.get('id');
    this.apiService.getUserById(this.id).subscribe((res: any) => {
      if(res.status === 'succes'){
          this.users =[];
          this.result=[];
        //console.log(res.data);
        this.result.push(res.data);
        for(const datas of this.result){
          this.users.push(datas);
        }
        console.log(this.users[0].img);
        this.img=this.users[0].img;
        this.currentImage=this.users[0].img;
        console.log(this.img);
      }
      else {
        console.log(res.status);
      }
    },(error: any) => {
      this.presentAlert('Time Out');
       console.log('erroe');});
    }

getCamera(){
this.camera.getPicture({
sourceType:this.camera.PictureSourceType.CAMERA,
destinationType:this.camera.DestinationType.DATA_URL,
}).then((res)=>{
  this.img='data:image/jpeg;base64,' +res;}).catch(e=>{
  console.log(e);
});

}
getGallery(){
  this.camera.getPicture({
    sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType:this.camera.DestinationType.DATA_URL,
    }).then((res)=>{
      this.img='data:image/jpeg;base64,' +res;}).catch(e=>{
      console.log(e);
    });
}
save(){
  const dateTime = new Date().toISOString();
  this.newdate=dateTime.replace(':','-');
  this.newdate=this.newdate.replace(':','-');
  this.newdate=this.newdate.replace('.','-');

  //console.log(this.newdate);

const data={
  file:this.img,
  path:'images/users/'+this.id+'-'+this.newdate+'.png',
  id:this.id,
  imgtodelete:this.currentImage.split('api/')[1]
};
this.apiService.save(data).subscribe((res: any) => {

    this.navCtrl.pop();

},(error: any) => {
  console.log('error',error);
  this.presentAlert('Try Again');

});
}
async presentAlert(msg) {
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: msg,
    buttons: [
      {
        text: 'close',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        }
      }, {
        text: 'Try Again',
        handler: () => {
          //this.tryLogin();
        }
      }
    ]
  });

  await alert.present();
}

}


