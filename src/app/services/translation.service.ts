import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) { }

  getLangues(): Observable<Object>{
    return this.http.get(`http://localhost:8080/langues`);
 }
 getPageableLangues(params): Observable<Object>{
  return this.http.get(`http://localhost:8080/paginated/langues`,{params});
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
findLangueById(id:number):Observable<Object>{
return this.http.get(`http://localhost:8080/langues/${id}`);
}
getTableList():Observable<Object>{
  return this.http.get(`http://localhost:8080/list/tables`);

}
getListTables():Observable<Object>{
  return this.http.get(`http://localhost:8080/list/tablesfromdb`);

}
getPageableListTab(params): Observable<Object>{
  return this.http.get(`http://localhost:8080/list/tables/paginate`,{params});
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
 name_type_column(name):Observable<Object>{
  return this.http.get(`http://localhost:8080/translate/get/table/${name}`);
}

nameTypeColumnData(nameTable,selectedColumn,json,params):Observable<any>{
  
  return this.http.get<any>(`http://localhost:8080/translate/get/table/data/${nameTable}/${selectedColumn}/${json}`,{ params } );
 }

 nameTypeColumnDatajson(nameTable,selectedColumn,json):Observable<Object>{
  return this.http.get(`http://localhost:8080/translate/get/table/data/json/${nameTable}/${selectedColumn}/${json}`);
 }
 select1(nameTable,selectedColumn,json,column):Observable<Object>{
  return this.http.post(`http://localhost:8080/translate/get/table/data/json/${nameTable}/${selectedColumn}/${json}/select1`,column);
 }
 select2(nameTable,selectedColumn,json,Columns,params):Observable<any>{
  
  return this.http.post(`http://localhost:8080/translate/get/table/data/json/${nameTable}/${selectedColumn}/${json}/select2`,Columns,{params});
 }
 findAllByText(text):Observable<any>{
  
  return this.http.get(`http://localhost:8080/find/suggestion/${text}`);
 }
 AutocompleteTranslation(langue,value):Observable<any>{
  
  return this.http.get(`http://localhost:8080/translate/autocomplete/${langue}/${value}`);
 }
 get_Values_FromSelectedLang(nameTable,selectedColumn,langue):Observable<any>{
  
  return this.http.get(`http://localhost:8080/translate/i18n/values/${nameTable}/${selectedColumn}/${langue}`);
 }
 readDocxFiles(path):Observable<Object>{
  return this.http.post(`http://localhost:8080/translate/word`,path,{responseType: 'text'});
}
TranslateText(langFrom,langTo,text):Observable<any>{
return this.http.post(`http://localhost:8080/translate/text/${langFrom}/${langTo}`,text,{responseType: 'text'})
}

}
