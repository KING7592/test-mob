import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Storage } from '@ionic/storage-angular';
import { ActionSheetController, AlertController, LoadingController, NavController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-listfood',
  templateUrl: './listfood.page.html',
  styleUrls: ['./listfood.page.scss'],
})
export class ListfoodPage implements OnInit {
  data: any;
  foods: any =[];
  upFood: any =[];
  panier: any[];
  dataStorage: any;
  useridverif: string;
  idStored: string;
  verif =false;
  verifPlatNumber: any;
  start: number;
  limit: number;
  findIndexFood: number;
  constructor(public activateroute: ActivatedRoute,public apiService: ApiService,public storage: Storage,
    public actionSheetController: ActionSheetController,public navctrl: NavController,public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,public toastController: ToastController) { }


    async ionViewWillEnter(){
      this.start =0;
      this.limit=10;
      this.panier=[];
      const loader = await this.loadingCtrl.create({
        message: 'Please wait...',
      });
      await loader.present();
      setTimeout(() => {
        //console.log('Async operation has ended');
      }, 2000);
      loader.dismiss();
      this.data=this.activateroute.snapshot.paramMap.get('id');
      await this.storage.create();
      this.storage.get('storage_xxx').then((res)=>{
        if(res==null){
        }
        else{
          this.dataStorage=res;
          this.idStored=this.dataStorage.id;
          if(this.dataStorage.id===this.data){
            this.verif=true;
            //console.log(this.verif);
          }
        }
      });
      this.storage.get(this.data).then((resx)=>{
        if(resx==null){
        }
        else{
           // this.storage.set(this.data,this.panier);
           //this.panier.push(res);
            //console.log(this.panier);
            //console.log(resx);
            for(const datas of resx){
              this.panier.push(datas);
            }
          }
      });
      this.loadFood();
    }
      async ngOnInit() {
  }
  loadFood(){
    //console.log('here again');
    const datasend ={
      userId:this.data,
      start: this.start,
      limit: this.limit
    };
    this.apiService.getListFood(datasend).subscribe((res: any) => {
      if(res.status === 'succes'){
        //console.log(res.status);
        this.foods=[];
        for(const datas of res.data){
          this.foods.push(datas);
        }
       // console.log(this.foods.length);
       // console.log(res.data);
      }
      else {
        //console.log(res.status);
      }
    },(error: any) => {
      this.presentAlert('Time Out');
      console.log('erroe');});
  }
  async options(msg) {
    if(this.verif){
      const actionSheet = await this.actionSheetController.create({
        cssClass: 'my-custom-class',
        buttons: [{
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.deleteFood(msg);
          }
        }, {
          text: 'Modify',
          icon: 'pencil',
          handler: () => {
            this.updateFood(msg);
          }
        },
          {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();

      const { role } = await actionSheet.onDidDismiss();
      //console.log('onDidDismiss resolved with role', role);
    }
    else{
      const actionSheet = await this.actionSheetController.create({
        cssClass: 'my-custom-class',
        buttons: [{
          text: 'ajouter au panier',
          icon: 'add',
          handler: () => {
            //console.log('Delete clicked');
            this.addPanier(msg);
          }
        },{
          text: 'Ecrire un commentaire',
          icon: 'pencil',
          handler: () => {
            this.navctrl.navigateForward('/commentaire/'+msg);
            //console.log('Delete clicked');
          }
        },
          {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();

      const { role } = await actionSheet.onDidDismiss();
      //console.log('onDidDismiss resolved with role', role);
    }
  }
  addPanier(msg) {
    //this.presentAlertNbrPlat(20);
    //console.log(this.panier);
     this.verifPlatNumber = this.foods.find( food => food.idFood === msg);
    //console.log(verifPlatNumber.platNumber);
    if(this.verifPlatNumber.platNumber !== '0'){
      const verifExistanceInPanier = this.panier.find( verif => verif.idFood === msg);
     //console.log(verifExistanceInPanier);
     if(verifExistanceInPanier == null){
          this.presentAlertNbrPlat(this.verifPlatNumber.platNumber,msg);
     }
     else{
       this.presentToast('food existed');
     }
    }
    else{
      this.presentToast('désole plat indisponible');
    }
  }
  addPlat(){
  this.navctrl.navigateForward('/add-food/'+this.idStored);
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
  deleteFood(msg){
    this.apiService.deletePlat(msg).subscribe((res: any) =>{
      if(res.status === 'Success'){
        console.log(res.status);
       //this.loadFood();
       //console.log(this.foods);
       this.findIndexFood = this.foods.findIndex( food => food.idFood === msg);
       this.foods.splice(this.findIndexFood,1);
      }
      else {
        console.log(res.status);
      }
    },(error: any) => {
      this.presentAlert('Time Out');
      console.log('erroe');
     });
     //this.foods.splice(0,this.foods.length);
     //this.loadFood();
  }
  updateFood(msg){
    this.apiService.getFoodById(msg).subscribe((res: any) => {
      if(res.status === 'succes'){
        console.log(res.status);
        console.log(res.data);
        this.storage.create();
        this.storage.set('update_data',res.data);
        this.navctrl.navigateForward('/add-food/'+this.idStored);
      }
      else {
        console.log(res.status);
      }
    },(error: any) => {
      this.presentAlert('Time Out');
      console.log('erroe');});
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
  passerCommande(){
    this.navctrl.navigateForward('/passer-commande/'+this.data+'/'+this.idStored);
  }
  async presentAlertNbrPlat(nbrmax,msg){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'enter plat number (max '+nbrmax+')',
      inputs: [
        {
          name: 'name6',
          type: 'number',
          value:1,
          max:Number(nbrmax),
          min:-1
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
              //console.log(dataaa.name6);
              //console.log(nbrmax);

              if(Number(dataaa.name6)>Number(nbrmax)){
                //console.log('why are you here');
                this.presentToast('nbr max disponible est '+nbrmax);
                this.presentAlertNbrPlat(nbrmax,msg);
              }
              else{
                this.panier.push({
                  idFood:msg,
                  name:this.verifPlatNumber.name,
                  platNumber:dataaa.name6,
                  //price:this.verifPlatNumber.price,
                  pricetot:this.verifPlatNumber.price*dataaa.name6,
                  priceUnt:this.verifPlatNumber.price,
                  idCuistot:this.data,
                  iduser:this.idStored,
                  platNbrMax:nbrmax
                });
                this.storage.create();
                this.storage.set(this.data,this.panier);
                //console.log(this.panier);
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
      this.loadFood();
     // this.start=this.start+this.limit;
      //this.addMoreItems();
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
    }, 2000);
  }
}
