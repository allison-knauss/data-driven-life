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
            cy.request('universe/1/step');
        });
    });

});
