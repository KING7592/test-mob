import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-historique-commande',
  templateUrl: './historique-commande.page.html',
  styleUrls: ['./historique-commande.page.scss'],
})
export class HistoriqueCommandePage implements OnInit {
  data: any;
  cmds: any =[];
  plats: any =[];
  dateex: string;
  datenv: string;
  verif: boolean;
  rate: number;
  start: number;
  limit: number;



  constructor(private storage: Storage, private navCtrl: NavController,private alertCtrl: AlertController,
    public apiService: ApiService,public loadingCtrl: LoadingController,public activateroute: ActivatedRoute) { }

  ngOnInit() {
    this.start =0;
    this.limit=10;
    this.verif=false;
    this.dateex='';
    this.datenv='';
    this.rate=0;
    this.data=this.activateroute.snapshot.paramMap.get('iduser');
    //console.log(this.data);
    this.getHostorique();
  }
  async rating(foodIdPlus,timePlus){
    //console.log(msg);
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: 'noter ce plat (1-5)',
        inputs: [
          {
            name: 'name6',
            type: 'number',
            value:1,
            max:5,
            min:1
          }],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
            }, {
              text: 'Ok',
              handler: dataaa => {
                if(Number(dataaa.name6)>5 || Number(dataaa.name6)<1){
                  //console.log('svp donner une note entre 0 et 10');
                  this.rating(foodIdPlus,timePlus);
                }
                else{
                  //Find index of specific object using findIndex method.
                  const objIndex = this.plats.findIndex((obj => obj.foodId === foodIdPlus));
                  //Log object to Console.
                  //console.log(this.plats[objIndex]);
                  //Update object's name property.
                  this.plats[objIndex].rate = dataaa.name6;
                  const dataRate ={
                    userId:this.data,
                    time:timePlus,
                    rate:dataaa.name6,
                    foodId:foodIdPlus
                  };
                  console.log(dataRate);
                  this.apiService.rating(dataRate).subscribe((res: any) => {
                    if(res.status === 'Success'){
                      //loader.dismiss();
                      console.log(res.status);
                      //this.cmds=[];
                     // this.storage.set(this.data,this.cmds);
                      //this.verif=false;
                      //this.presentToast(res.status);
                      //this.navCtrl.navigateBack('/listfood/'+this.idRecap);
                      //this.navCtrl.pop();
                    }
                    else {
                    //loader.dismiss();
                    console.log(res.status);
                    //this.presentToast(res.status);
                    }
                  },(error: any) => {
                    this.presentAlert('TimeOut');
                    console.log('error',error);
                    //loader.dismiss();
                    //this.presentAlert('Time Out');
                  });
                }
              }
            }
          ]
        });
        await alert.present();
    }
    loadData(event) {
      setTimeout(() => {
        console.log('Done');
        this.start=this.start+this.limit;
        this.getHostorique();
        //this.addMoreItems();
        event.target.complete();
        // App logic to determine if all data is loaded
        // and disable the infinite scroll
      }, 2000);
    }
    getHostorique(){
      const histodata={
        clientId:this.data,
        start:this.start,
        limit:this.limit
      };
      this.apiService.getHistoCmd(histodata).subscribe((res: any) => {
        if(res.status === 'succes'){
          this.verif=true;
          for(const cmd of res.data){
            for(const val of (cmd.listCmd)){
              const plat ={
                foodId:val.split('@')[0],
                cuistotName:cmd.cuistotname,
                time:cmd.time,
                name:val.split('@')[2],
                nbr:val.split('@')[1],
                rate:val.split('@')[3]
              };
                //console.log(cmd.time);
                //console.log(this.dateex);
              if(cmd.time===this.dateex){
                //plat.time='';
                plat.cuistotName='';
              }
              else{
                this.dateex=cmd.time;
              }
              this.plats.push(plat);
            }
          }
          //console.log(this.plats);
        }
        else {
          //console.log(res.status);
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
