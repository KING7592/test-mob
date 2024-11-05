import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListfoodPageRoutingModule } from './listfood-routing.module';

import { ListfoodPage } from './listfood.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListfoodPageRoutingModule
  ],
  declarations: [ListfoodPage]
})
export class ListfoodPageModule {}
