import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {baseUsr, port, uri} from "../../environnement/environnement";

@Injectable({
  providedIn: 'root'
})
export class CategoriService {

  private api: string = `${port.port}/${baseUsr.url}`
  private baseUriProductType = uri.productTypeUri

  constructor(private httpClient:HttpClient) { }


  listTypeProduct():Observable<any>{
    return this.httpClient.get<any>(`${this.api}/${this.baseUriProductType}`);
  }

  TypeProduct(id:string){
    return this.httpClient.get<any>(`${this.api}/${this.baseUriProductType}/${id}`);
  }

  addProductProduct(product:any):Observable<any>{
    console.log('list product service')
    return this.httpClient.post<any>(`${this.api}/${this.baseUriProductType}`,product);
  }
  editProduct(product:any):Observable<any>{
    console.log('list product service')
    return this.httpClient.put<any>(`${this.api}/${this.baseUriProductType}`,product);
  }
  deleteProduct(id:string):Observable<any>{
    console.log('list product service')
    return this.httpClient.delete<any>(`${this.api}/${this.baseUriProductType}/${id}`);
  }
}


