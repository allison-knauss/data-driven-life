import { Component } from '@angular/core';


import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { UniverseService } from './universe.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  private universe;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private universeService: UniverseService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getUniverse(1);
    });
  }

  public getNewUniverse() {
    this.universeService.getNewUniverse().subscribe((data) => {
      this.universe = data;
      console.log(data);
    });
  }

  public getUniverse(id: number) {
    this.universeService.getUniverse(id).subscribe((data) => {
      this.universe = data;
      console.log(data);
    });
  }
}
