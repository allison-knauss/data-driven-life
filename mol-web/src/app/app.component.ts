import { Component, OnInit } from '@angular/core';
import { UniverseService } from './universe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Meaning of Life - Game of Life Universe';
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

  public stepUniverse() {
    this.universeService.stepUniverse(this.universe.id).subscribe((data) => {
      this.universe = data;
      console.log(data);
    });
  }

  public calcLiveCells() {
    if (!this.universe) {
      return 0;
    }
    const grid = this.universe.grid;
    let result = 0;
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x]) {
          result++;
        }
      }
    }
    return result;
  }

  public detectEntities() {
    // TODO: Implement this
    return 'No entities detected';
  }
}
