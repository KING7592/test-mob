import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers: HttpHeaders;
  adress: string;


  constructor(public http: HttpClient) {
    this.adress='http://192.168.1.103/tutoriel/api';
    this.headers=new HttpHeaders();
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin' ,'*');
    this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  }
  add(data){
    return this.http.post(this.adress+'/create.php',data);
  }
  login(data){
    return this.http.post(this.adress+'/login.php',data);
  }
  getData(data){
    return this.http.post(this.adress+'/getData.php',data);
  }
  getListFood(data){
    return this.http.post(this.adress+'/getfood.php',data);
  }
  addPlat(data){
    return this.http.post(this.adress+'/addPlat.php',data);
  }
  deletePlat(id){
    return this.http.delete(this.adress+'/deletefood.php?foodId='+id);
  }
  getFoodById(id){
    return this.http.get(this.adress+'/getFoodById.php?foodId='+id);
  }
  getUserById(id){
    return this.http.get(this.adress+'/getUserById.php?userId='+id);
  }
  updatePlat(data,id){
    return this.http.post(this.adress+'/updatePlat.php?foodId='+id,data);
  }
  verifFood(foodId){
    return this.http.get(this.adress+'/verifFood.php?foodId='+foodId);
  }
  passerCmd(data){
    return this.http.post(this.adress+'/passerCmd.php',data);
  }
  updatePlatNumber(data){
    return this.http.post(this.adress+'/updatePlatNumber.php',data);
  }
  getHistoCmd(data){
    return this.http.post(this.adress+'/histoCmd.php',data);
  }
  rating(data){
    return this.http.post(this.adress+'/rate.php',data);
  }
  getListLivraison(id){
    return this.http.get(this.adress+'/getListLivraison.php?userId='+id);
  }
  getListComment(data){
    return this.http.post(this.adress+'/getListComment.php',data);
  }
  addComment(data){
    return this.http.post(this.adress+'/addComment.php',data);
  }
  save(data){
    return this.http.post(this.adress+'/testimage.php',data);
  }
}
