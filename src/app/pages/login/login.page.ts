import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
import { Storage } from '@ionic/storage-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  email_address: string;
  password: string;
  public loginForm: FormGroup;
  //verification des champs du formulaire(2 champs obligatoire)
  public isValid: boolean;
  //public verif: boolean;

  constructor(public router: Router,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,public alertCtrl: AlertController,
    public apiService: ApiService,public navCtrl: NavController,public storage: Storage,
    public formBuilder: FormBuilder) {
      this.storage.create();
    this.storage.get('storage_xxx').then((res)=>{
      if(res!=null){
        this.navCtrl.navigateRoot('/home');
      }
    });
    this.isValid=true;
    //this.verif=true;
    this.loginForm=formBuilder.group({
       // eslint-disable-next-line @typescript-eslint/naming-convention
       email_address: ['', Validators.required],
       password: ['', Validators.required],
    });
    }

  ngOnInit(
  ) {
  }
  tryRegister(){
    this.router.navigate(['/register']);
  }
  async tryLogin(){
    if(this.loginForm.valid){
      this.isValid=true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait...',
      });
      await loader.present();
      const data = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        email_address:this.loginForm.value.email_address,
        password:this.loginForm.value.password
      };
      this.apiService.login(data).subscribe((res: any) => {
        if(res.status === 'succes'){
          this.email_address = '';
          this.password = '';
          loader.dismiss();
          this.presentToast(res.status);
          this.storage.create();
          this.storage.set('storage_xxx',res.data);
          this.navCtrl.navigateRoot(['/home']);
        }
        else {
        loader.dismiss();
        this.presentToast('Email or password incorrect');
        }
      },(error: any) => {
        console.log('error',error);
        loader.dismiss();
        this.presentAlert('Time Out');
      });
    }
    else{
      this.isValid=false;
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
            this.tryLogin();
          }
        }
      ]
    });

    await alert.present();
  }
  get errorCtr() {
    return this.loginForm.controls;
  }

}
