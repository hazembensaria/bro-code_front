import { AbstractControl } from "@angular/forms";
import { observable, Observable, Observer, of } from "rxjs";

export const mimetype = (control : AbstractControl): Promise<any> | Observable <any>=>{
  if(typeof(control.value)==='string'){
    return of(null)
  }
  const file = control.value as File
  const filereader = new FileReader()
  const frobs = Observable.create((observer : Observer<any>)=>{
    filereader.addEventListener("loadend", ()=>{
      let arr = new Uint8Array(<ArrayBuffer>filereader.result).subarray(0, 4)
      let header = ""
      let isvalid =false
      for (let i=0 ; i<arr.length; i++){
        header +=arr[i].toString(16)}
      switch(header){
        case "89504e47":
          isvalid =true;
          break;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
          isvalid =true;
          break;
        default:
          isvalid = false;
          break;

      }
      if(isvalid){
        observer.next(null)
      }else{
        observer.next({invalidmimetype : true})
      }
      observer.complete()
    })
    filereader.readAsArrayBuffer(file)
  })
  return frobs
}
