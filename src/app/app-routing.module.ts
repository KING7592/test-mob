import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profil/:id',
    loadChildren: () => import('./pages/profil/profil.module').then( m => m.ProfilPageModule)
  },
  {
    path: 'listfood/:id',
    loadChildren: () => import('./pages/listfood/listfood.module').then( m => m.ListfoodPageModule)
  },
  {
    path: 'add-food/:id',
    loadChildren: () => import('./pages/add-food/add-food.module').then( m => m.AddFoodPageModule)
  },
  {
    path: 'passer-commande/:idcuistot/:idclient',
    loadChildren: () => import('./pages/passer-commande/passer-commande.module').then( m => m.PasserCommandePageModule)
  },
  {
    path: 'historique-commande/:iduser',
    loadChildren: () => import('./pages/historique-commande/historique-commande.module').then( m => m.HistoriqueCommandePageModule)
  },
  {
    path: 'livraisons/:iduser',
    loadChildren: () => import('./pages/livraisons/livraisons.module').then( m => m.LivraisonsPageModule)
  },
  {
    path: 'commentaire/:idFood',
    loadChildren: () => import('./pages/commentaire/commentaire.module').then( m => m.CommentairePageModule)
  },
  {
    path: 'showmap',
    loadChildren: () => import('./pages/showmap/showmap.module').then( m => m.ShowmapPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
