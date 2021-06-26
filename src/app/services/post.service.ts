import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api, baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public httpCliente:HttpClient) { }

  getPost(){
    return this.httpCliente.get(`${baseUrl}/post`,{ headers:{'app-id':api} });
  }

  getComment(postId:string){
    return this.httpCliente.get(`${baseUrl}/post/${postId}/comment`,{ headers:{'app-id':api} });
  }

  getUser(userId:string){
    return this.httpCliente.get(`${baseUrl}/user/${userId}`,{ headers:{'app-id':api} });
  }
}
