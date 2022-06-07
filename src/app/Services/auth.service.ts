import { Injectable } from '@angular/core';
import {authModel} from "../Models/auth-Model";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {FormGroup, NgForm} from "@angular/forms";
import * as dayjs from "dayjs";


@Injectable({
  providedIn: 'root'
})
export class AuthServic {
  private authListner=new Subject<boolean>();//bch na3rfou bih est ce que fama user mconecti bch ndesplayi 7ajet fel header w fazet
private token!:string;
private islogednow =false ;
private user : any
  private userId ! : string

  constructor(private http:HttpClient ,  private router :Router ) {

  }

getUserId(){
  return this.userId ;
}

  //------------------------login---------------------------------
  loginUser(email:string,password:string){
const auth:authModel={email:email,password:password}

    this.http.post<{token:string, id:string , name:string,isNew:boolean}>('https://oksecondetime.herokuapp.com/user/login',auth).subscribe(result=>{
      if(result.token){
      this.user = result ;
        this.saveAuthData(result.token )
        this.islogednow =true ;
        this.userId= result.id
        this.token=result.token;
        this.authListner.next(true);
        if(result.isNew){

          this.router.navigate(["/profil"])
        }
        else
        this.router.navigate(['home'])
      }

    })
  }
  //----------------------------register---------------------------------

  createUser(email:string,password:string,name:string){
    const d = new Date()
    let day = d.getDate()
    let month = d.getMonth()+1
    let year = d.getFullYear()
    const fulldate=day+'-'+month+'-'+year
  const user={email:email,password:password,name:name , formatDate :fulldate}
    console.log(user)
    this.http.post('https://oksecondetime.herokuapp.com/user/signUp',user).subscribe(result=>{
      console.log(result);


    })
  }

  saveLangage(langages:[]){
    console.log(langages)
    this.http.put('https://oksecondetime.herokuapp.com/user/savelangage',{langage : langages}).subscribe(result=>{
      console.log(result);


    })

  }
  upgradeProfile(myForm:NgForm){

    const user ={
      bio : myForm.form.value.bio ,
      firstName : myForm.form.value.firstName ,
      lastName : myForm.form.value.lastName ,
      email : myForm.form.value.email,
      name : myForm.form.value.userName ,
      birth : myForm.form.value.birth ,
      phone : myForm.form.value.phone,
      proPhone : myForm.form.value.proPhone ,
      location : myForm.form.value.location ,
      facebook : myForm.form.value.facebook ,
      twitter : myForm.form.value.twitter ,
      linkedin:  myForm.form.value.linkedin ,
      github : myForm.form.value.github,
    }
    console.log(user)
    this.http.put<{msg :string}>('https://oksecondetime.herokuapp.com/user/upgradeprofile',user).subscribe(result=>{
      console.log(result);


    })

  }
  getUser(){

    return this.http.get<{_id :string , firstname : string , lastName : string , email : string , phone : string , proPhone : string , location : string , linkedin : string , facebook : string , twitter : string , bio : string, github :string , birth : string , isNew: boolean , imagepath : string , role :string } >('https://oksecondetime.herokuapp.com/user')

  }
  getcurrentUser(){
  return this.user  ;
  }
  getIsLogedNow(){
  return this.islogednow ;
  }
  // --------------------------------saving data in local storage ----------------------------
  private saveAuthData(token :string  ){
    localStorage.setItem("token" ,token)
  }
// ------------------------------------removing data from local storage---------------------------------
  private clearAuthData(){
    localStorage.removeItem("token")
    localStorage.removeItem("isnew")
  }
  logout(){

    this.token = ''
    this.clearAuthData()
    this.islogednow=false
    this.authListner.next(false);
  }

  autoAuthUser(){
    const authInformation = this.getAuthToken()

    if(authInformation){
      const now  = new Date()
      this.token= authInformation
      this.islogednow =true
      this.authListner.next(true);
    }
  }

  private getAuthToken(){
    const token = localStorage.getItem("token")
    return token
  }

  public  getToken(){
    return this.token;
  }
  public getAuthListner(){
    return this.authListner;
  }

  changeimage(form :FormGroup ){
    const userdata = new FormData()
    userdata.append('image' ,form.value.imagepath , "hazem")
    console.log(form.value.imagepath)
    const obj={
      id :"hazem"
    }
    this.http.post('https://oksecondetime.herokuapp.com/user/changephoto',userdata).subscribe(reslt=>{
      console.log(reslt)
    })
}
getVisitor(id :string){
  return this.http.get<{_id :string , firstname : string , lastname : string , email : string , phone : string , proPhone : string , location : string , linkedin : string , facebook : string , twitter : string , bio : string, github :string , birth : string , isNew: boolean , imagepath : string  } >('https://oksecondetime.herokuapp.com/user/visitor/'+id)

}

folowVisitor(idVisitor :string){

const obj={
  id :idVisitor
  }
  this.http.post('https://oksecondetime.herokuapp.com/user/followVisitor', obj).subscribe(reslt=>{
    console.log(reslt)
  })
}
getFollowing(following: any){
  const obj = {
    following :following
  }
 return  this.http.post('https://oksecondetime.herokuapp.com/user/getfollowing', obj)

}

getUsersStatistic(){
  return this.http.get<{ states: any , fb :any ,twitter :any , linkedin :any ,github :any }>('https://oksecondetime.herokuapp.com/user/statistic')

}

  test(){
    return this.http.get('https://oksecondetime.herokuapp.com/user/get')
  }
}
