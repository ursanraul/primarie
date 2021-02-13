import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Audience } from '@/_models/audience';

@Injectable({ providedIn: 'root' })
export class AudienceService {
    constructor(private http: HttpClient){}

    getAll() {
        return this.http.get<Audience[]>(`${config.apiUrl}/audiences`);
    }

    post(audience: Audience) {
        return this.http.post(`${config.apiUrl}/audiences`, audience);
    }
}