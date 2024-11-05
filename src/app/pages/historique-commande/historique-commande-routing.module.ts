import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoriqueCommandePage } from './historique-commande.page';

const routes: Routes = [
  {
    path: '',
    component: HistoriqueCommandePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoriqueCommandePageRoutingModule {}
