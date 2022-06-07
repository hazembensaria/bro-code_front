import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthServic} from "../../../Services/auth.service";
import {Observable} from "rxjs";

@Injectable()
export class authInteractor implements  HttpInterceptor{
  constructor(private authService:AuthServic) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token =this.authService.getToken();
    const authRequest=req.clone({
      headers:req.headers.set("authorization","bearer " + token)
    });
    return next.handle(authRequest);
  }
}
