import { Injectable } from '@angular/core';
import {Headers,RequestOptions, Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs/Subject';


import { Makalatitles } from './../makalatitles';
import { Makalacategory } from './../makalacategory';

@Injectable()
export class MakalatitlesService {
  makala: Makalatitles[];
  article: Makalatitles[];
  category: Makalacategory[];
  makalatitle: string 

  private headers = new Headers({'Content-Type': 'application/json'});
  
  private makalatitlesUrl = 'http://api.jualishebora.ga/api/v1/topics'
  private makalacategoriesUrl = 'http://api.jualishebora.ga/api/v1/topicsByCategory'  //http://api.tuseme.co.tz/api/v1/streets
  private makalaCategoryNameUrl = 'http://api.jualishebora.ga/api/v1/topicCategories'

  constructor(private http: Http) { }
  
  
  
  nameChange: Subject<string> = new Subject<string>();
  fetchedArticles: Subject<Makalatitles[]> = new Subject<Makalatitles[]>(); //observable ya makala inarudishwa hapa,?
  fetchedArticle: Subject<Makalatitles[]> = new Subject<Makalatitles[]>();
  fetchedCategories: Subject<Makalacategory[]> = new Subject<Makalacategory[]>(); //observable ya topic catgories

  getMakalatitles(): void {             //anarudisha array ya categories za makala life cycle ya 
                                                           // makala contents ikianza
      //return this.http.get(this.makalaCategoryNameUrl)
      //           .toPromise()
      //           .then(this.extractData)
      //           .catch(this.handleError);

      this.http.get(this.makalaCategoryNameUrl).subscribe((res: Response) => {
        this.category = res.json().data; 
        this. fetchedCategories.next(this.category)       
    });
  }

  getMakala(id: number): void {                               //huyu anaitwa uki click kundi la umri wa mtoto
   const url = `${this.makalacategoriesUrl}/${id}`;
    
    this.http.get(url).subscribe((res: Response) => {
        this.makala = res.json().data; 
        this.fetchedArticles.next(this.makala)       
        console.log(this.makala);
        
    });
  }

  getArticle(id: number): void {
   const url = `${this.makalatitlesUrl}/${id}`;
    
    this.http.get(url).subscribe((res: Response) => {
        this.article = res.json().data; 
        this.fetchedArticle.next(this.article)  
        console.log(id)     
        console.log(this.article);
    });
  }

  private extractData(res: Response) {
	let body = res.json();
        return body.data || {};
    }
  
  private handleError (error: any): Promise<any> {
     console.error('An error occurred', error);
     return Promise.reject(error.message || error);
  }

 create(makala:Makalatitles): Promise<Makalatitles> {
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  
  return this.http
    .post(this.makalatitlesUrl, makala, options)
    .toPromise()
    .then(res => res.json().data as Makalatitles)
    .catch(this.handleError);
    //JSON.stringify({makala})
  }

  performSearch(searchTerm: string): void {
    var apiLink = 'http://api.tuseme.co.tz/api/v1/search/' 
    + searchTerm + '?api_key=bc' ;
    
    this.http.request(apiLink).subscribe((res: Response) => {
        this.makala = res.json().data; 
        this.fetchedArticles.next(this.makala)       
        console.log(this.makala);
        this.makalatitle = searchTerm;
        this.nameChange.next(this.makalatitle);
        console.log(this.makalatitle);
    });
  }

  getMakalatitle(id: number): void {
   const url = `${this.makalaCategoryNameUrl}/${id}`;
    
    this.http.get(url).subscribe((res: Response) => {
        this.category = res.json().data; 
        this.fetchedCategories.next(this.category)       
        console.log(this.category);
    });
  }

  //gectMakala(id: number): Promise<Makalatitles[]> {
  //const url = `${this.makalacategoriesUrl}/${id}`;
 // return this.http.get(url)
//.toPromise()
   // .then(response => response.json().data as Makalatitles[]).catch(this.handleError);
   // this.fetchedArticles.next(this.makala)
    
//}

}
