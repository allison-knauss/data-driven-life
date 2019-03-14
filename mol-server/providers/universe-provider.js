const universeTypes = require('../lib/universe-types');

class UniverseProvider {

    get dimensions() {
        return this._dimensions;
    }

    get stepFunction() {
        return this._stepFunction;
    }

    constructor() {
        this._universes = [];
        this._dimensions = [100, 100];
        this._stepFunction = this.defaultStepFunction;
    }

    newUniverse() {
        let dimensions = this._dimensions;
        let grid = [];
        for (let y = 0; y < dimensions[1]; y++) {
            let row = [];
            for (let x = 0; x < dimensions[0]; x++) {
                row.push(false);
            }
            grid.push(row);
        }
        let idx = this._universes.push({
            type: universeTypes.CLASSIC,
            grid: grid
        }) - 1; // array.push() returns the new length, not index.
        this._universes[idx].id = idx;
        return this._universes[idx];
    }

    getUniverse(id) {
        if (id < 0 || id >= this._universes.length) {
            throw Error("Invalid ID");
        }
        return this._universes[id];
    }

    stepUniverse(id) {
        let universe = this.getUniverse(id);

        if (universe.age === undefined) {
            universe.age = 0;
        }
        universe.age += 1;

        return this.stepFunction(universe);
    }

    defaultStepFunction(universe) {
        let grid = universe.grid;

        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid.length; x++) {
                let n_neighbors = this.countLivingNeighbors(x, y, grid);

                if (n_neighbors < 2 || n_neighbors > 3) {
                    grid[y][x] = false;
                }

                if (n_neighbors === 3) {
                    grid[y][x] = true;
                }

                // Default case is to retain previous state

            }
        }

        return universe;
    }

    /* Determine number of living neighbors */
    countLivingNeighbors(x, y, grid) {

        // Compass directions
        let nw = [x-1, y-1];
        let n = [x, y-1];
        let ne = [x+1, y-1];
        let w = [x-1, y];
        let e = [x+1, y];
        let sw = [x-1, y+1];
        let s = [x, y+1];
        let se = [x+1, y+1];
        let dirs = [
          nw, n, ne,
          w, e,
          sw, s, se
        ];

        let n_neighbors = 0;

        for (let i = 0; i < dirs.length; i++) {
            let direction = dirs[i];
            if (direction[0] < 0 ||
                direction[0] >= grid[0].length ||
                direction[1] < 0 ||
                direction[1] >= grid.length) {

                // Out of bounds, skip it.
                continue;
            }
            if (grid[direction[1]][direction[0]]) {
                n_neighbors += 1;
            }
        }

        return n_neighbors;
    }
}


module.exports = new UniverseProvider(); // Singleton
