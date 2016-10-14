import { expect } from 'chai';
import { Colors } from './colors';

describe("Colors", () => {
    const defaultColors = [
        ["red"],
        ["red", "blue"],
        ["red", "yellow", "blue"],
        ["red", "orange", "yellow", "blue"],
        ["red", "orange", "yellow", "blue", "darkblue"],
        ["darkred", "red", "orange", "yellow", "blue", "darkblue"],
        ["darkred", "red", "orange", "yellow", "blue", "darkblue", "purple"]
    ];

    // Tests for one value, minimum
    it("outputs color array for 1 value", () => {
        expect(Colors.getColors(1)).to.be.deep.equal((defaultColors[0]));
    });

    // Tests for three values, happy path
    it("outputs color array for 3 values", () => {
        expect(Colors.getColors(3)).to.be.deep.equal((defaultColors[2]));
    });

    // Tests for seven values, maximum
    it("outputs color array for 7 values", () => {
        expect(Colors.getColors(7)).to.be.deep.equal((defaultColors[6]));
    });

    // Tests for eight values, exceeds maximum and should repeat last one
    it("outputs color array for 8 values", () => {
        expect(Colors.getColors(8)).to.be.deep.equal((["darkred", "red", "orange", "yellow", "blue", "darkblue", "purple", "purple"]));
    });

    // Tests for twenty values, extreme case, exceeds maximum as well
    it("outputs color array for 15 values", () => {
        expect(Colors.getColors(15)).to.be.deep.equal((["darkred", "red", "orange", "yellow", "blue", "darkblue", "purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple"]));
    });

    // Tests for invalid input of negative
    it("throws exception for invalid input of negative", () => {
        expect(() => Colors.getColors(-1)).throws(("Incorrect input and no default colors can be provided"));
    });

    // Tests for invalid input of 0 (no input values)
    it("throws exception for invalid input of 0", () => {
        expect(() => Colors.getColors(0)).throws(("Incorrect input and no default colors can be provided"));
    });

    // Tests for invalid input of null 
    it("throws exception for invalid input of null/undefined", () => {
        expect(() => Colors.getColors(null)).throws(("Incorrect input and no default colors can be provided"));
    });
});
