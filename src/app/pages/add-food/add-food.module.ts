import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFoodPageRoutingModule } from './add-food-routing.module';

import { AddFoodPage } from './add-food.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFoodPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddFoodPage]
})
export class AddFoodPageModule {}
