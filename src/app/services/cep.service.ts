import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IStreet } from "../interfaces";

@Injectable({
    providedIn: 'root'
})

export class CEPService {
    url = environment.cep.baseUrl;

    constructor(private http: HttpClient) { }

    getCEP(cep: string) {
        return this.http.get<IStreet>(this.url + cep + '/json');
    }
}