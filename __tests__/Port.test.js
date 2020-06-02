/* globals descripe it expect*/
const Port = require('../src/Port.js');

describe("with ships and an itinerary", () => {
    let port;
    let titanic;
    let queenMary;

    beforeEach(() => {
        port = new Port("Dover");
        titanic = jest.fn;
        queenMary = jest.fn;
    });

    it("can be instantiated", () => {
        expect(new Port()).toBeInstanceOf(Object);
    });

    it("has a name", () => {
        expect(port.name).toBe("Dover");
    });

    it ("can add a ship", () => {
        port.addShip(titanic);

        expect(port.ships).toContain(titanic);
    });

    it("can remove a ship", () => {
        port.addShip(titanic);
        port.addShip(queenMary);
        port.removeShip(queenMary);

        expect(port.ships).toEqual([titanic]);
    });

});