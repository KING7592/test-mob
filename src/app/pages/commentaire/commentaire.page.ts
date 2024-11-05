import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Storage } from '@ionic/storage-angular';
import { ActionSheetController, AlertController, LoadingController, NavController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.page.html',
  styleUrls: ['./commentaire.page.scss'],
})
export class CommentairePage implements OnInit {
  items= [];
  idFood: any;
  name: any;
  start: number;
  limit: number;
  comment: string ;
  constructor(public activateroute: ActivatedRoute,public apiService: ApiService,public storage: Storage,
    public actionSheetController: ActionSheetController,public navctrl: NavController,public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,public toastController: ToastController) {
   }

  ngOnInit() {
    this.start =0;
    this.limit=10;
    this.idFood=this.activateroute.snapshot.paramMap.get('idFood');
    this.storage.create();
    this.storage.get('storage_xxx').then((res)=>{
      if(res!=null){
        this.name=res.your_name;
      }
    });
    this.addMoreItems();
  }
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.start=this.start+this.limit-1;
      this.addMoreItems();
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
    }, 2000);
  }
  addMoreItems(){
   // this.items=[];
    const data = {
      start: this.start,
      limit: this.limit,
      foodId: this.idFood
    };
    this.apiService.getListComment(data).subscribe((res: any) => {
      if(res.status === 'succes'){
       // console.log(res.status);
        for(const datas of res.data){
          this.items.push(datas);
        }
       // console.log(res.data);
      }
      else {
        console.log(res.status);
      }
    },(error: any) => {
      this.presentAlert('Time Out');
       console.log('erroe');});
    }
    addComment(){
      const commentaire={
        name:this.name,
        comment:this.comment,
        idFood:this.idFood
      };
     // console.log(commentaire);
      this.apiService.addComment(commentaire).subscribe((res: any) => {
        if(res.status === 'success'){
          this.comment='';
          this.items=[];
          this.start=0;
          this.addMoreItems();
          //this.ngOnInit();
        }
        else {
          console.log(res.status);
        }
      },(error: any) => {
        this.presentAlert('TimeOut');
        console.log('erroe');});
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
