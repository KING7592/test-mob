import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListfoodPage } from './listfood.page';

const routes: Routes = [
  {
    path: '',
    component: ListfoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListfoodPageRoutingModule {}
