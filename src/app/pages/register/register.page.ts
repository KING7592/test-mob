import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
import { Storage } from '@ionic/storage-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registerForm: FormGroup;
  public secondDate: string;
  //verification du validité des champs du formulaire
  public isValid: boolean;
  //verication 2 champs password identique
  public verif: boolean;

  constructor(public router: Router,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,public alertCtrl: AlertController,
    public apiService: ApiService,public navCtrl: NavController,public storage: Storage,
    public formBuilder: FormBuilder
    ) {
      /*this.storage.create();
    this.storage.get('storage_xxx').then((res)=>{
      if(res!=null){
        this.navCtrl.navigateRoot('/home');
      }
      else{
        this.navCtrl.navigateRoot('/intro');
      }
    });*/
    this.isValid=true;
    this.verif=true;
    this.registerForm = this.formBuilder.group({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      your_name: ['', Validators.required],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      email_address: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
      gender: ['', Validators.required],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      date_birth: ['', Validators.required],
      password: ['', Validators.required],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      conf_pass: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  async register(){
    if(this.registerForm.get('password').value !== this.registerForm.get('conf_pass').value){
      this.verif=false;
    }
    else{
      this.verif=true;
    }
    if(! this.registerForm.valid){
      this.isValid=false;
    }
    else{
      if(this.verif){
      this.isValid=true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait...',
      });
      await loader.present();
      const data = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        your_name:this.registerForm.value.your_name,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        email_address:this.registerForm.value.email_address,
        gender:this.registerForm.value.gender,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        date_birth:this.registerForm.value.date_birth.substring(0,10),
        password:this.registerForm.value.password,
        address:this.registerForm.value.address,
        country:this.registerForm.value.country
      };
      this.apiService.add(data).subscribe((res: any) => {
        if(res.status === 'Success'){
          loader.dismiss();
          this.presentToast(res.status);
          this.navCtrl.pop();
        }
        else if (res.status==='utilisateur existe'){
          this.presentToast(res.status);
          loader.dismiss();
        }
        else {
        loader.dismiss();
        this.presentToast(res.status);
        }
      },(error: any) => {
        console.log('error',error);
        loader.dismiss();
        this.presentAlert('Time Out');
      });
    }
  }}
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
            this.register();
          }
        }
      ]
    });

    await alert.present();
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
  get errorCtr() {
    return this.registerForm.controls;
  }

}
