import type { LocalStorageKeyEnum } from "@/models/local-storage/localStorage.enum";

export class LocalStorageService {
    static set(key:LocalStorageKeyEnum , payload:any){
        payload = JSON.stringify(payload)
        localStorage.setItem(key, payload);
    }

    static get(key:LocalStorageKeyEnum){
        return JSON.parse(localStorage.getItem(key)as any);
    }

    static delete(key:LocalStorageKeyEnum){
        localStorage.removeItem(key);
    }

    static clear(){
        localStorage.clear()
    }
}