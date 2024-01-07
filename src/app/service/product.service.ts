import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {baseUsr, port, uri} from "../../environnement/environnement";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private api: string = `${port.port}/${baseUsr.url}`
  private baseUriProduct = uri.productUri
  constructor(private httpClient: HttpClient) { }


  listProduct():Observable<any>{
    return this.httpClient.get<any>(`${this.api}/${this.baseUriProduct}`);
  }
 Product(id:string):Observable<any>{
    return this.httpClient.get<any>(`${this.api}/${this.baseUriProduct}/${id}`);
  }

  addProduct(product:any):Observable<any>{
    console.log('list product service')
    return this.httpClient.post<any>(`${this.api}/${this.baseUriProduct}`,product);
  }
  editProduct(product:any):Observable<any>{
    return this.httpClient.put<any>(`${this.api}/${this.baseUriProduct}`,product);
  }
  deleteProduct(id:string):Observable<any>{
    return this.httpClient.delete<any>(`${this.api}/${this.baseUriProduct}/${id}`);
  }

  product(id: string) {
    return this.httpClient.get<any>(`${this.api}/${this.baseUriProduct}/${id}`);
  }
}

