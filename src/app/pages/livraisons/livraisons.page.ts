import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/api.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-livraisons',
  templateUrl: './livraisons.page.html',
  styleUrls: ['./livraisons.page.scss'],
})
export class LivraisonsPage implements OnInit {
  idUser: any;
  platTab: any=[];
  livraison: any=[];
  livraisons: any=[];
  livraisonsToday: any=[];
  livraisonsold: any=[];
  dateex: string;
  adresse: string;
  constructor(private storage: Storage, private navCtrl: NavController,private alertCtrl: AlertController,
    public apiService: ApiService,public loadingCtrl: LoadingController,public activateroute: ActivatedRoute,
    public dataService: DataService,public toastController: ToastController) { }

  ngOnInit() {
    this.idUser=this.activateroute.snapshot.paramMap.get('iduser');
    //console.log(this.idUser);
    this.dateex='';
    this.apiService.getListLivraison(this.idUser).subscribe((res: any) => {
      if(res.status === 'succes'){
        console.log(res.status);
        console.log(res.data);
        for(const cmd of res.data){
          this.platTab=[];
          this.livraison.client=cmd.clientId;
          this.livraison.clientaddress=cmd.clientAddress;
          this.livraison.time=cmd.time;
          this.livraison.note=cmd.note;
          for(const val of cmd.listCmd){
            //console.log(val);
            const plat ={
              name:val.split('@')[2],
              nbr:val.split('@')[1],
              rate:val.split('@')[3]
            };
            this.platTab.push(plat);
          }
          this.livraison.plat=this.platTab;
          if(cmd.time.split(' ')[0] ===new Date().toISOString().split('T')[0]){
            this.livraisonsToday.push(this.livraison);
            this.livraison=[];
          }
          else{
            this.livraisonsold.push(this.livraison);
             this.livraison=[];
          }
        }
        console.log(this.livraisons);
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
  showMap(msg){
    this.adresse=msg;
    if(this.adresse.includes('--')){
      this.dataService.setParams({pos:msg});
    this.navCtrl.navigateForward('/showmap');
    }
    else{
      this.presentToast('Nothing to show');
    }

  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
