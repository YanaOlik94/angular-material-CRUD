import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ProductInterface} from "../types/product.interface";
import {map, Observable, tap} from "rxjs";
import {ResponseProductInterface} from '../types/response-product.interface';

const url: string = 'https://material-crud-17a16-default-rtdb.europe-west1.firebasedatabase.app/';
const httpOptions: any = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  products: ProductInterface[] = [];

  constructor(private httpClient: HttpClient) {
  }

  createData(data: ProductInterface): Observable<ProductInterface> {
    const header: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')

    return this.httpClient.post<ProductInterface>(`${url}.json`, data, {headers: header})
      .pipe(tap(res => {
        this.products.push(data);
      }));
  }

  readData(): Observable<ResponseProductInterface[]> {
    return this.httpClient.get<ProductInterface>(`${url}.json`, httpOptions)
      .pipe(
        map((res: any) => res))
  }

  updateData(data: ProductInterface, id: string): Observable<ProductInterface> {
    return this.httpClient.put<ProductInterface>(`${url}/${id}.json`, data, httpOptions)
      .pipe(map((res: any) =>
        res))
  }

  deleteData(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${url}/${id}.json`, httpOptions)
  }

}
