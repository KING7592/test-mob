import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivraisonsPageRoutingModule } from './livraisons-routing.module';

import { LivraisonsPage } from './livraisons.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivraisonsPageRoutingModule
  ],
  declarations: [LivraisonsPage]
})
export class LivraisonsPageModule {}
