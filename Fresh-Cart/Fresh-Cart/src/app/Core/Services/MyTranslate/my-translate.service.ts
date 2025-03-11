import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {


  private readonly renderer2 = inject(RendererFactory2).createRenderer(null , null)
 
  constructor(private readonly translateService:TranslateService , @Inject(PLATFORM_ID) private platFormId:object) { 

if(isPlatformBrowser(platFormId)){
  this.translateService.setDefaultLang("en");

  const SavedLang = localStorage.getItem('lang');

  if(SavedLang){
    this.translateService.use(SavedLang)
  }

  this.changeDir()
}
}


changeDir():void
{

  if(localStorage.getItem("lang") === "en"){
    this.renderer2.setAttribute(document.documentElement , "dir" , "ltr")
    this.renderer2.setAttribute(document.documentElement , "lang" , "en")
  }
  else if(localStorage.getItem("lang") === "ar"){
    this.renderer2.setAttribute(document.documentElement , "dir" , "rtl")
    this.renderer2.setAttribute(document.documentElement , "lang" , "ar")
  }


}
changeLang(lang : string):void {
  if(isPlatformBrowser(this.platFormId)){
    localStorage.setItem('lang'  , lang);
  }

  this.translateService.use(lang);
  this.changeDir();
}






}
