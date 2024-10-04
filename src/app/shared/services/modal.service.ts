import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EmitionModalSettings } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class ModalService {
    private _onEmitClicOptionToEmit: Subject<EmitionModalSettings> = new Subject();
    private _onShowButtonAccessCode: Subject<boolean> = new Subject();
    private _onShowModal: Subject<boolean> = new Subject();


    set onEmitClicOptionToEmit(emitionModalSettings: EmitionModalSettings) {
        this._onEmitClicOptionToEmit.next(emitionModalSettings)
    }

    get onEmitClicOptionToEmit(): Observable<EmitionModalSettings> {
        return this._onEmitClicOptionToEmit.asObservable()
    }


    set onShowButtonAccessCode(value: boolean) {
        this._onShowButtonAccessCode.next(value)
    }

    get onShowButtonAccessCode(): Observable<boolean> {
        return this._onShowButtonAccessCode.asObservable()
    }

    set onShowModal(value: boolean) {
        this._onShowModal.next(value)
    }

    get onShowModal(): Observable<boolean> {
        return this._onShowModal.asObservable()
    }


    constructor() { }


}