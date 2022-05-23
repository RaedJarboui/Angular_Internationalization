import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  value;

  constructor(private http: HttpClient) {
    

  }
//   getEvents(): Observable<Object>{
//     return this.http.get(`http://localhost:8080/i18n`);
//  }
 addEvent(value):Observable<Object>{
  return this.http.post(`http://localhost:8080/add`,value);

 }

//  getAllEvents():Observable<Event[]>{
//    return this.http.get<Event[]>('http://localhost:8080/events')
//  }
//  getAllProducts():Observable<Product[]>{
//   return this.http.get<Product[]>('http://localhost:8080/products')

//  }
 addTranslation(value):Observable<Object>{
  return this.http.post('http://localhost:8080/translate/add',value)

 }
 getTranslation():Observable<Object>{
  return this.http.get('http://localhost:8080/translate/get')

 }
 updateTranslation(id,value):Observable<Object>{
  return this.http.put(`http://localhost:8080/translate/edit/${id}`,value);

 }
 editTranslation(field_value,column,tableName,tblabacusName,tblabacusNameColumn,value):Observable<Object>{
  return this.http.put(`http://localhost:8080/translate/edit/${field_value}/${column}/${tableName}/${tblabacusName}/${tblabacusNameColumn}`,value);

 }
 deleteTranslation(id,value):Observable<Object>{
  return this.http.post(`http://localhost:8080/translation/delete/${id}`,value);

 }

 getTranslationById(id):Observable<Object>{
  return this.http.get(`http://localhost:8080/translate/get/${id}`);

 }
 getListTables():Observable<Object>{
  return this.http.get(`http://localhost:8080/list/table`);

 }
 getListColumnsType(value):Observable<Object>{
  return this.http.get(`http://localhost:8080/column/type/table/${value}`);

 }
 getListColumns(value):Observable<Object>{
  return this.http.get(`http://localhost:8080/column/table/${value}`);

 }
 getTableData(value):Observable<Object>{
  return this.http.get(`http://localhost:8080/table/data/${value}`);

 }
 delete_of_list_translation(value,id,langue):Observable<Object>{
  return this.http.post(`http://localhost:8080//translate/delete/${id}/${langue}`,value);

 }
 
}
function body(arg0: string, body: any, arg2: { value: any; }): Observable<Object> {
  throw new Error('Function not implemented.');
}

