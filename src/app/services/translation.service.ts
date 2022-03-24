import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) { }

  getLangues(): Observable<Object>{
    return this.http.get(`http://localhost:8080/langues`);
 }
 addLangue(value):Observable<Object>{
  return this.http.post(`http://localhost:8080/langues`,value);

 }
 deleteLangue(id:number):Observable<Object>{
   return this.http.delete(`http://localhost:8080/langues/${id}`)
 }
 editLangue(id:number,value):Observable<Object>{
  return this.http.put(`http://localhost:8080/langues/${id}`,value)
}
getTableList():Observable<Object>{
  return this.http.get(`http://localhost:8080/list/tables`);

}
getListTables():Observable<Object>{
  return this.http.get(`http://localhost:8080/list/tabless`);

}
addTableList(value):Observable<Object>{
  return this.http.post(`http://localhost:8080/list/tables`,value);

}
editListTables(id:number,value):Observable<Object>{
  return this.http.put(`http://localhost:8080/list/tables/${id}`,value)
}

 getListColumnsType(value):Observable<Object>{
  return this.http.get(`http://localhost:8080/column/type/table/${value}`);

 }
 getListColumns(value):Observable<Object>{
  return this.http.get(`http://localhost:8080/column/table/${value}`);

 }
 addEntity(name,value):Observable<Object>{
   return this.http.post(`http://localhost:8080/api/${name}`,value);
 }

}
