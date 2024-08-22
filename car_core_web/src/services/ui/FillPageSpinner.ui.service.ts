import { Subject } from "rxjs";

export class FillPageSpinnerUiService {
    static loading = new Subject<boolean>()

    static setIsLoading(value:boolean){
        this.loading.next(value)
    }

    static get isLoading(){
        return this.loading.asObservable()
    }
}