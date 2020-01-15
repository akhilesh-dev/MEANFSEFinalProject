import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  @Injectable()
  export class UserService {
  
    constructor(private http: HttpClient) { }  
    
    private userUrl = "http://localhost:3000/api/";
  
    public getUsers() {
      return this.http.get<User[]>(this.userUrl+ 'users');
    }
  
    public addUser(user) {
      return this.http.post<User>(this.userUrl + 'users/create', user, httpOptions);
    }
  
    public updateUser(user) {
      return this.http.put<User>(this.userUrl +`users/update/${user.userId}`, user);
    }
  
    public removeUser(userId) {
      return this.http.delete(this.userUrl +`users/remove/${userId}`);
    }
  }
  