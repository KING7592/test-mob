import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import {HttpClientModule} from '@angular/common/http';
import { SearchFilterPipe } from './search-filter.pipe';

import { Camera } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DataService } from './services/data/data.service';

@NgModule({
  declarations: [AppComponent, SearchFilterPipe],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,IonicStorageModule.forRoot(),HttpClientModule],
  providers: [
    Camera,Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
