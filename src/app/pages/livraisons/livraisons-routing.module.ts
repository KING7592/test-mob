import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivraisonsPage } from './livraisons.page';

const routes: Routes = [
  {
    path: '',
    component: LivraisonsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivraisonsPageRoutingModule {}
