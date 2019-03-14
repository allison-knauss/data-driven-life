const universeTypes = require('../lib/universe-types');

let universeProvider = {
    newUniverse: function() {
        return {
            type: universeTypes.CLASSIC,
            id: 1,
            grid: [
                [ true, true, false ],
                [ false, true, true ],
                [ true, false, false ]
            ]
        };
    },
    getUniverse: function(id) {
        // TODO: Implement this.
    },
    stepUniverse: function(id) {
        // TODO Implemebt this.
    }
};

module.exports = universeProvider;
