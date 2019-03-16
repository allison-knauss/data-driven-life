import { Component, OnInit } from '@angular/core';
import { UniverseService } from './universe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mol-web';
  private universe;

  constructor(private universeService: UniverseService) {}

  ngOnInit() {
    this.getUniverse(1);
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
