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
  private cells = [];
  private drawingWidth = 10;
  private drawingHeight = 10;
  private cellWidth = 10;
  private cellHeight = 10;
  private deadColor = 'gray';
  private aliveColor = 'yellow';

  constructor(private universeService: UniverseService) {}

  ngOnInit() {
    this.getUniverse(1);
  }

  public getNewUniverse() {
    this.universeService.getNewUniverse().subscribe((data) => {
      this.universe = data;
      this.initGrid();
      this.gridCells();
      console.log(data);
    });
  }

  public getUniverse(id: number) {
    this.universeService.getUniverse(id).subscribe((data) => {
      this.universe = data;
      this.initGrid();
      this.gridCells();
      console.log(data);
    });
  }


  public stepUniverse() {
    this.universeService.stepUniverse(this.universe.id).subscribe((data) => {
      this.universe = data;
      this.gridCells();
      console.log(data);
    });
  }

  public runUniverse() {
    setTimeout(() => {
      this.stepUniverse();
      this.runUniverse();
    }, 1000);
  }

  public getNewRandomSoup() {
    this.universeService.getNewRandomSoup().subscribe((data) => {
      this.universe = data;
      this.initGrid();
      this.gridCells();
      console.log(data);
    });
  }

  public calcLiveCells() {
    if (!this.cells) {
      return 0;
    }
    const cells = this.cells;
    let result = 0;
    for (const cell of cells) {
      if (cell.alive === true) {
        result++;
      }
    }

    return result;
  }

  initGrid() {
    const grid = this.universe.grid;
    this.drawingWidth = grid[0].length * this.cellWidth;
    this.drawingHeight = grid.length * this.cellHeight;
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        this.cells.push({
          x, y, alive: false, color: this.deadColor
        });
      }
    }
  }

  /* Generate a list of cells for our grid */
  public gridCells() {
    if (!this.universe) {
      return this.cells;
    }
    const grid = this.universe.grid;
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === true) {
          this.cells[y * grid.length + x].alive = true;
          this.cells[y * grid.length + x].color = this.aliveColor;
        } else {
          this.cells[y * grid.length + x].alive = false;
          this.cells[y * grid.length + x].color = this.deadColor;
        }
      }
    }
  }

  cellGenesis(cell) {
    console.log('Clicked cell', cell);
    cell.alive = true; // TODO: This won't save
    cell.color = this.aliveColor;
  }

  public detectEntities() {
    // TODO: Implement this
    return 'No entities detected';
  }
}
