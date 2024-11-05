import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowmapPage } from './showmap.page';

const routes: Routes = [
  {
    path: '',
    component: ShowmapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowmapPageRoutingModule {}
