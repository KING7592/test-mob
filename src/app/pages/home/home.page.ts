import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController,MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  filterTerm: string;
  dataStorage: any;
  name: string;
  email: string;
  gendre: string;
  dateBirth: string;
  password: string;
  id: string;
  country: string;
  address: string;
  rating: number;
  users: any =[];
  limit = 13;
  start =0;
  newCountry='';

  constructor(private storage: Storage, private navCtrl: NavController,private alertCtrl: AlertController,
    public apiService: ApiService,public loadingCtrl: LoadingController, public menu: MenuController ) { }

  async ngOnInit() {
    await this.storage.create();
    this.storage.get('storage_xxx').then((res)=>{
      if(res==null){
        this.navCtrl.navigateRoot('/intro');
      }
      else{
        this.dataStorage=res;
        //console.log(this.dataStorage);
        this.name=this.dataStorage.your_name;
        this.email=this.dataStorage.email_address;
        this.gendre=this.dataStorage.gender;
        this.dateBirth=this.dataStorage.date_birth;
        this.password=this.dataStorage.password;
        this.id=this.dataStorage.id;
        this.country=this.dataStorage.country;
        this.address=this.dataStorage.address;
        this.rating=this.dataStorage.rate;
        this.start=0;
        this.users=[];
        if(this.getNewCountry() !== ''){
          this.country=this.newCountry;
        }
        this.loadUsers();
      }
    });
  }
  getNewCountry(){
    return this.newCountry;
  }
  change(){
    this.ngOnInit();
  }
  async doRefresh(event){
    this.ngOnInit();
    const loader = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loader.present();
    setTimeout(() => {
      //console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
    loader.dismiss();
  }
  loadData(event) {
    setTimeout(() => {
      //console.log('Done');
      event.target.complete();

      this.start+=this.limit;
    this.loadUsers();
    }, 500);
  }
  async loadUsers(){
      const data = {
        start: this.start,
        limit: this.limit,
        country: this.country
      };
      this.apiService.getData(data).subscribe((res: any) => {
        if(res.status === 'succes'){
         // console.log(res.status);
          for(const datas of res.data){
            this.users.push(datas);
          }
         // console.log(res.data);
        }
        else {
          console.log(res.status);
        }
      },(error: any) => {
        this.presentAlertPlus('TimeOut');
        console.log('erroe');});
  }
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Are you sure?',
      buttons: [
        {
          text: 'close',
          role: 'cancel',
          handler: (blah) => {
            this.menu.close();
          }
        }, {
          text: 'Logout',
          handler: () => {
            this.storage.clear();
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();
  }
 /* profil(){
    this.navCtrl.navigateForward('/profil');
  }*/
  detailsuser(msg){
    this.navCtrl.navigateForward('/listfood/'+msg);
    this.menu.close();

    //console.log(msg);
  }
  historique(msg){
    this.navCtrl.navigateForward('/historique-commande/'+msg);
    this.menu.close();
  }
  livraison(msg){
    this.navCtrl.navigateForward('/livraisons/'+msg);
    this.menu.close();
  }
  personalData(msg){
    this.navCtrl.navigateForward('/profil/'+msg);
    this.menu.close();
  }
  async presentAlertPlus(msg) {
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

