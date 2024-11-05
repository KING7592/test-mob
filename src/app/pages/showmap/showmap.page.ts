import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DataService } from 'src/app/services/data/data.service';


declare let google: any;

@Component({
  selector: 'app-showmap',
  templateUrl: './showmap.page.html',
  styleUrls: ['./showmap.page.scss'],
})
export class ShowmapPage implements OnInit {
  @ViewChild('map',{static: true}) mapRef: ElementRef;


  latitude: number;
  longitude: number;
  latClient: number;
  longClient: number;
  type: any;
  posClient: string;
  constructor(private geolocation: Geolocation,public dataService: DataService) {
    this.type=google.maps.MapTypeId.HYBRID;
   }

  ngOnInit() {
    this.posClient=this.dataService.getParams().pos;
    this.latClient=Number(this.posClient.split('--')[0]);
    this.longClient=Number(this.posClient.split('--')[1]);
      this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.initMap(this.latClient,this.longClient,this.latitude,this.longitude,this.type);
    }).catch((error) => {
      alert('Error getting location' + JSON.stringify(error));
    });
  }
  initMap(latC,lngC,lat,lng,test){
    console.log(test);
    const latLng=new google.maps.LatLng(lat,lng);
    const latLngC=new google.maps.LatLng(latC,lngC);
    const options={
      center: latLngC,
      zoom: 15,
      mapTypeId: test
    };
    const map=new google.maps.Map(this.mapRef.nativeElement,options);
    this.addMarker(map,latLng,'red');
    this.addMarker(map,latLngC,'blue');
  }
  addMarker(map,position,color){
    let url = 'http://maps.google.com/mapfiles/ms/icons/';
    url += color + '-dot.png';
    const marker=new google.maps.Marker({
      map,position,icon:{url}
    });
  }
  makeRM(){
    this.type=google.maps.MapTypeId.ROADMAP;
    this.ngOnInit();
  }
  makeST(){
    this.type=google.maps.MapTypeId.SATELLITE;
    this.ngOnInit();

  }
  makeHB(){
    this.type=google.maps.MapTypeId.HYBRID;
    this.ngOnInit();

  }
  makeTR(){
    this.type=google.maps.MapTypeId.TERRAIN;
    this.ngOnInit();

  }

}
