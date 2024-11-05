import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  navParams: any={};

  constructor() { }

  setParams(body){
    this.navParams=body;
  }

  getParams(){
    return this.navParams;
  }
}

