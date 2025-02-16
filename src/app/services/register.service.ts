import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IUserRequest } from "../interfaces/user/user";

@Injectable({
    providedIn: 'root'
})

export class RegisterService {
    url = environment.register.baseUrl

    constructor(private http: HttpClient) {}

    register(user: IUserRequest) {
        return this.http.post(`${this.url}/users`, user)
    }

    getUser() {
        return this.http.get(`${this.url}/users`)
    }

}