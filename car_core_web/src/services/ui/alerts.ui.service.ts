import type { ToastMessageOptions } from "primevue/toast";
import { Subject } from "rxjs";

export class AlertsUiService{
    static toastOptions:ToastMessageOptions = { severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 }
    static _showToast = new Subject<ToastMessageOptions>()

    static get toast(){
        return this._showToast.asObservable()
    }

    static addToast(options?:ToastMessageOptions){
        this.toastOptions = {...options} || this.toastOptions
        return this
    }

    static showToast(){
        this._showToast.next(this.toastOptions)
    }
}