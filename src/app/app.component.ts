import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from './../pages/tabs/tabs';
import { RegistroPage } from "../pages/registro/registro";
import { SigninPage } from "../pages/signin/signin";

import { AutenticacaoService } from "../services/autenticacao.service";

import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage: any = TabsPage;
  isAuthenticated: boolean;
  tabsPage = TabsPage;
  signinPage = SigninPage;
  registroPage = RegistroPage;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, private menuCtrl: MenuController, statusBar: StatusBar, splashScreen: SplashScreen,
      private autenticacaoService: AutenticacaoService) {
    
    firebase.initializeApp({
      apiKey: "AIzaSyBNDiaC51RWKLoKZUccjrTiXnYLLAFIJp4",
      authDomain: "receitas-53e2f.firebaseapp.com"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated=true;
        this.rootPage = TabsPage;
      } else {
        this.isAuthenticated=false;
        this.rootPage = SigninPage;
      }
    });
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.isAuthenticated = false;

  }

  carrega(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  logout() {
    this.autenticacaoService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SigninPage);
  }
}

