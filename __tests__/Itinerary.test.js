/* globals descripe it expect*/
const Itinerary = require('../src/Itinerary.js');

describe("Itinerary", () => {
    let dover;
    let calais;
    let itinerary;

    beforeEach(() => {
        dover = jest.fn;
        calais = jest.fn;
        itinerary = new Itinerary([dover, calais]);
    });

    it("can be instantiated", () => {
        expect(new Itinerary()).toBeInstanceOf(Object);
    });

    it("can have ports", () => {
        expect(itinerary.ports).toEqual([dover, calais]);
    });
});