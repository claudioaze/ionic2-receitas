import { MensagemService } from './../services/mensagem.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { TabsPage } from './../pages/tabs/tabs';
import { ReceitasPage } from './../pages/receitas/receitas';
import { ReceitaPage } from './../pages/receita/receita';
import { ListaComprasPage } from './../pages/lista-compras/lista-compras';
import { EditaReceitaPage } from './../pages/edita-receita/edita-receita';
import { RegistroPage } from "../pages/registro/registro";
import { SigninPage } from "../pages/signin/signin";

import { ListaComprasService } from './../services/lista-compras.service';
import { ReceitaService } from './../services/receita.service';
import { AutenticacaoService } from "../services/autenticacao.service";

@NgModule({
  declarations: [
    MyApp,
    ListaComprasPage,
    ReceitaPage,
    ReceitasPage,
    TabsPage,
    EditaReceitaPage,
    SigninPage,
    RegistroPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListaComprasPage,
    ReceitaPage,
    ReceitasPage,
    TabsPage,
    EditaReceitaPage,
    SigninPage,
    RegistroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ListaComprasService,
    ReceitaService,
    MensagemService,
    AutenticacaoService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
