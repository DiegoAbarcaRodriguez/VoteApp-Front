import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EmitionModalSettings } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class ModalService {
    private _onEmitClicOptionToEmit: Subject<EmitionModalSettings> = new Subject();

    set onEmitClicOptionToEmit(emitionModalSettings: EmitionModalSettings) {
        this._onEmitClicOptionToEmit.next(emitionModalSettings)
    }

    get onEmitClicOptionToEmit(): Observable<EmitionModalSettings> {
        return this._onEmitClicOptionToEmit.asObservable()
    }


    constructor() { }

    
}