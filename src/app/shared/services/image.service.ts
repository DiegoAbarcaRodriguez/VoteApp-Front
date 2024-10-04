import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { environments } from 'src/environments/environment';
import { RespondImageServer } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class ImageService {
    constructor(private http: HttpClient) { }

    createImage(formData: FormData): Observable<RespondImageServer> {
        return this.http.post<RespondImageServer>(`${environments.imagesServerUrl}/upload`, formData)
            .pipe(
                filter((resp: any) => resp.ok)
            )
    }

    updateImage(vote_id: string, formData: FormData): Observable<RespondImageServer> {
        return this.http.put<RespondImageServer>(`${environments.imagesServerUrl}/update/${vote_id}`, formData)
            .pipe(
                filter((resp: any) => resp.ok)
            );
    }

    deleteImage(_id: string): Observable<RespondImageServer> {
        return this.http.delete<RespondImageServer>(`${environments.imagesServerUrl}/delete/${_id}`)
            .pipe(
                filter(({ ok }: RespondImageServer) => ok)
            );
    }

}