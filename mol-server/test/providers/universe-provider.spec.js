let expect = require('chai').expect;
let should = require('chai').should();
let sinon = require('sinon');
let once = require('../once');


let universeProvider = require('../../providers/universe-provider');
let universeTypes = require('../../lib/universe-types');

describe('Universe Provider', function() {

    beforeEach('Don\'t leak changes', function() {
       universeProvider._universes = [];
       universeProvider._dimensions = [100, 100];
    });

    it('should create a new universe', function() {
        universeProvider.newUniverse.should.exist;
    });

    describe('newUniverse function', function() {

        it('should return a universe', function() {
            universeProvider.newUniverse().should.exist;
        });

        describe('A new universe', function() {

            beforeEach('Clearing universe list', function() {
                universeProvider._universes = [];
            });

            it('should have an ID', function() {
                let universe = universeProvider.newUniverse();
                universe.should.have.property('id');
            });

            it('should get a unique ID', function() {
                let universe1 = universeProvider.newUniverse();
                let universe2 = universeProvider.newUniverse();
                universe1.id.should.not.equal(universe2.id);
                universeProvider._universes.length.should.equal(2);
            });

            it('should be a classic universe', function() {
                let universe = universeProvider.newUniverse();
                universe.type.should.equal(universeTypes.CLASSIC);
            });

            it('should have a grid', function() {
                let universe = universeProvider.newUniverse();
                universe.grid.should.exist;
            });

            it('should have valid dimensions', function() {
                let dimensions = universeProvider.dimensions;
                dimensions[0].should.be.greaterThan(-1);
            });

            describe('A universe\'s grid', function() {

                it('should have a number of columns equal to its dimension[1] value', function() {
                    let dimension1 = universeProvider.dimensions[1];
                    let universe = universeProvider.newUniverse();
                    universe.grid.length.should.equal(dimension1);
                });

                it('should have a number of rows equal to its dimension[0] value', function() {
                    let dimension0 = universeProvider.dimensions[0];
                    let grid = universeProvider.newUniverse().grid;

                    // Verify that all rows have the correct length
                    for (let i = 0; i < grid.length; i++) {
                        grid[i].length.should.equal(dimension0);
                    }
                });

            });
        });

    });

    it('should retrieve an existing universe', function() {
        universeProvider.getUniverse.should.exist;
    });

    describe('A universe retrieval', function() {
        beforeEach('pre-populate some universes', function() {
            universeProvider._universes = [];
            for(let i = 0; i < 3; i++){
                universeProvider.newUniverse();
            }
        });

        it('should return a universe', function() {
            let universe = universeProvider.getUniverse(0);
            expect(universe).to.exist;
        });

        it('should return a previously-existing universe', function() {
            let targetId = 1;
            let universe = universeProvider.getUniverse(targetId);
            universe.id.should.be.greaterThan(-1);
            universe.id.should.be.lessThan(universeProvider.dimensions.length);
            universe.id.should.equal(universeProvider._universes[targetId].id);
        });

        it('should throw an error when id does not exist', function() {
            let targetId = 42;
            expect(universeProvider.getUniverse.bind(targetId)).to.throw(Error);
        });

    });

    it('should advance an existing universe', function() {
       universeProvider.stepUniverse.should.exist;
    });

    describe('Advancing a universe', function() {

        beforeEach('pre-populate some universes', function() {
            universeProvider._universes = [];
            for(let i = 0; i < 3; i++){
                universeProvider.newUniverse();
            }
        });

        it('should throw an error if universe does not exist', function() {
            let targetId = 42;
            expect(universeProvider.stepUniverse.bind(targetId)).to.throw(Error);
        });

        it('should set the universe\'s age to 1 if absent', function() {
           let universe = universeProvider.stepUniverse(1);
           expect(universe.age).to.equal(1);
        });

        it('should run updateGrid on the universe\'s grid', function() {
            var callback = sinon.fake();
            var proxy = once(callback);
            universeProvider._stepFunction = proxy;

            universeProvider.stepUniverse(1);

            expect(callback.calledOnce).to.be.true;
        });

    });

    it('should have a default step function', function() {
        expect(universeProvider.defaultStepFunction).to.exist;
    });

    describe('The default step function', function() {

        beforeEach('Use a 3x3 universe with a center living', function() {
           universeProvider._dimensions = [3, 3];
           let universe = universeProvider.newUniverse();
           universe.grid[1][1] = true;
        });

        it('should return a universe', function() {
            let initialUniverse = universeProvider.newUniverse();
            let universe = universeProvider.defaultStepFunction(initialUniverse);

            expect(universe.id).to.equal(initialUniverse.id);
        });

        it('should kill any cells with <2 neighbors', function() {
            let universe = universeProvider.getUniverse(0);
            universe.grid[1][1].should.be.true;

            let updated = universeProvider.defaultStepFunction(universe);

            // All cells should be dead
            for (let y = 0; y < universe.grid.length; y++) {
                for(let x = 0; x < universe.grid.length; x++) {
                    universe.grid[y][x].should.be.false;
                }
            }
        });
    });

    describe('When counting living neighbors', function() {

        beforeEach('Use a 3x3 universe', function() {
            universeProvider._dimensions = [3, 3];
        });

        it('should skip out-of-bounds neighbors', function() {
            universeProvider._dimensions = [1, 1];
            let universe = universeProvider.newUniverse();
            let updated = universeProvider.countLivingNeighbors(0, 0, universe.grid);
        });

        it('should not count itself', function() {
            let universe = universeProvider.newUniverse();
            universe.grid[1][1] = true;
            universeProvider.countLivingNeighbors(1, 1, universe.grid).should.equal(0);
        });

        it ('should find northwest neighbor', function() {
            let universe = universeProvider.newUniverse();
            universe.grid[0][0] = true;

            universeProvider.countLivingNeighbors(1, 1, universe.grid).should.equal(1);
        });

        it ('should find north neighbors', function() {
            let universe = universeProvider.newUniverse();
            universe.grid[0][1] = true;

            universeProvider.countLivingNeighbors(1, 1, universe.grid).should.equal(1);
        });

        it ('should find northeast neighbors', function() {
            let universe = universeProvider.newUniverse();
            universe.grid[0][2] = true;

            universeProvider.countLivingNeighbors(1, 1, universe.grid).should.equal(1);
        });
        it ('should find west neighbors', function() {
            let universe = universeProvider.newUniverse();
            universe.grid[1][0] = true;

            universeProvider.countLivingNeighbors(1, 1, universe.grid).should.equal(1);
        });

        it ('should find east neighbors', function() {
            let universe = universeProvider.newUniverse();
            universe.grid[1][2] = true;

            universeProvider.countLivingNeighbors(1, 1, universe.grid).should.equal(1);
        });

        it ('should find southwest neighbors', function() {
            let universe = universeProvider.newUniverse();
            universe.grid[2][0] = true;

            universeProvider.countLivingNeighbors(1, 1, universe.grid).should.equal(1);
        });

        it ('should find south neighbors', function() {
            let universe = universeProvider.newUniverse();
            universe.grid[2][1] = true;

            universeProvider.countLivingNeighbors(1, 1, universe.grid).should.equal(1);
        });

        it ('should find southeast neighbors', function() {
            let universe = universeProvider.newUniverse();
            universe.grid[2][2] = true;

            universeProvider.countLivingNeighbors(1, 1, universe.grid).should.equal(1);
        });

    });

});

