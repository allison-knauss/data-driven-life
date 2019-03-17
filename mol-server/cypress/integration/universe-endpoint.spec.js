describe("The universe endpoint", function() {

    describe('GET /universe', function() {
        it('Generates and returns a universe', function() {
            cy
                .request('/universe')
                .then((response) => {
                    expect(response.body).to.have.property('id');
                    expect(response.body).to.have.property('type', 'classic');
                    expect(response.body).to.have.property('grid');
                    expect(response.body.grid).to.have.property('length', 100);
                });

        });
    });

    describe('GET /universe/{id}', function() {
        it('Retrieves an existing universe', function() {
            cy
                .request('/universe')
                .then((firstResponse) => {
                    let id = firstResponse.body.id;
                    cy
                        .request('/universe/' + id.toString())
                        .then((response) => {
                            expect(response.body).to.have.property('id', id);
                            expect(response.body).to.have.property('type', 'classic');
                            expect(response.body).to.have.property('grid');
                            expect(response.body.grid).to.have.property('length', 100);
                        });
                });
        });
    });

    describe('GET/universe/{id}/step', function() {
        it('Advances the specified universe', function() {
            cy
                .request('universe/1/step')
                .then((firstResponse) => {
                    let id = firstResponse.body.id;
                    cy
                        .request('/universe/' + id.toString() + '/step')
                        .then((response) => {
                            expect(response.body).to.have.property('id', id);
                            expect(response.body).to.have.property('type', 'classic');
                            expect(response.body).to.have.property('grid');
                            expect(response.body.grid).to.have.property('length', 100);
                            expect(response.body).to.have.property('age');
                        });
                });
        });
    });

    describe('GET /universe/soup', function() {
        it('Generates and returns a random soup universe', function() {
            cy
                .request('/universe')
                .then((response) => {
                    let universe = response.body;
                    let grid = universe.grid;
                    let livingCellCount = 0;

                    expect(universe).to.have.property('id');
                    expect(universe).to.have.property('type', 'classic');
                    expect(universe).to.have.property('grid');
                    expect(grid).to.have.property('length', 100);

                    for (const y = 0; y < grid.length; y++) {
                        for (const x = 0; x < grid[0].length; x++) {
                            if (grid[y][x] === true) {
                                livingCellCount++;
                            }
                        }
                    }
                    expect(livingCellCount).to.be.greaterThan(0);

                });

        });
    });

});
