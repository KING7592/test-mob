import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoriqueCommandePageRoutingModule } from './historique-commande-routing.module';

import { HistoriqueCommandePage } from './historique-commande.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoriqueCommandePageRoutingModule
  ],
  declarations: [HistoriqueCommandePage]
})
export class HistoriqueCommandePageModule {}
