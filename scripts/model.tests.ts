import { expect } from 'chai';
import { Model } from './model';
import {IOption} from './IOption';

describe("Model", () => {
    let model: Model;
    const options: IOption[] = [
        {
            value: "1",
            color: "Red",
            label: "High"
        },
        {
            value: "2",
            color: "Blue",
            label: "Medium"
        },
        {
            value: "3",
            color: "Green",
            label: "Low"
        }
    ];

    const testOption: IOption = {
        value: "4",
        color: "Purple",
        label: "Very Low"
    };

    beforeEach(() => {
        model = new Model(options, options[0].value);
    });

    // Tests for if initial value matches selected value and if it is stored
    it("outputs selected value for 1st option", () => {
        expect(model.getSelectedValue()).to.be.deep.equal(options[0].value);
    });

    // Tests for a selected value that is set and one of the values 
    it("outputs selected value for 2nd option", () => {
        model.setSelectedValue(options[1].value);
        expect(model.getSelectedValue()).to.be.deep.equal(options[1].value);
    });

    // Tests for a selected option that is set and one of the options 
    it("outputs selected option for 2nd option", () => {
        model.setSelectedValue(options[1].value);
        expect(model.getSelectedOption()).to.be.deep.equal(options[1]);
    });

    // Tests for a selected value that is null
    it("Sets selectedValue to null when no value is selected", () => {
        model.setSelectedValue("99");
        expect(model.getSelectedValue()).to.be.deep.equal(null);
    });

    // Tests for a selected value that is null
    it("Sets selectedValue to null when no value is selected", () => {
        model.setSelectedValue("");
        expect(model.getSelectedValue()).to.be.deep.equal(null);
    });

    // Tests for a selected value that is undefined
    it("throws exception for selected value that is undefined", () => {
        expect(() => model.setSelectedValue(undefined)).throws("Undefined value");
    });

    // Tests for the previous option of the first selected option, edge case
    it("outputs previous option for 1st selected option: gives first option", () => {
        model.setSelectedValue(options[0].value);
        model.selectPreviousOption();
        expect(model.getSelectedOption()).to.be.deep.equal(options[2]);
    });

    // Tests for the next option of the last selected option, edge case
    it("outputs previous option for last selected option: gives last option", () => {
        model.setSelectedValue(options[2].value);
        model.selectNextOption();
        expect(model.getSelectedOption()).to.be.deep.equal(options[0]);
    });

    // Tests for the previous option of a selected option
    it("outputs previous option for 2nd selected option", () => {
        model.setSelectedValue(options[1].value);
        model.selectPreviousOption();
        expect(model.getSelectedOption()).to.be.deep.equal(options[0]);
    });

    // Tests for the next option of a selected option
    it("outputs next option for 2nd selected option", () => {
        model.setSelectedValue(options[1].value);
        model.selectNextOption();
        expect(model.getSelectedOption()).to.be.deep.equal(options[2]);
    });
});