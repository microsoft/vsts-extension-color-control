/// <reference path="../typings/index.d.ts" />

import { IOption } from "./IOption";
import { Model } from "./model";

/**
 * Class colorRow returns the view of a single value, given the parameters allowedValue, color,
 * label, and whether or not it's selected.
 */
export class colorRow {

    private _row: JQuery;

    constructor(public allowedValue: string, public color: string, public label: string) {

    }

    // creates the row
    public create(): JQuery {

        // row div
        this._row = $("<div> </div>").attr("role", "radio");
        this._row.data("value", this.allowedValue);
        this._row.addClass("row");

        // color div
        var valueColor = $("<div> </div>");
        valueColor.addClass("valueColor");
        var color = this.color;
        valueColor.css("background-color", this.color)
        this._row.append(valueColor);

        // label div
        var valueLabel = $("<div> </div>");
        valueLabel.addClass("valueLabel");
        valueLabel.attr("title", this.label);
        if (!this.label) {
            valueLabel.text(this.allowedValue);
        }
        else {
            valueLabel.text(this.allowedValue + " - " + this.label);
        };
        this._row.append(valueLabel);

        // return the entire row to the control
        return this._row;
    }

    public select(focus: boolean): void {
        this._row.addClass("selected");
        this._row.attr("aria-checked", "true");
        this._row.attr("tabindex", 0);
        if (focus) {
            this._row.focus();
        }
    }

    public unselect(): void {
        this._row.removeClass("selected");
        this._row.attr("aria-checked", "false");
        this._row.attr("tabindex", -1);
    }
}

/**
 * Class colorControl returns a container that renders each row, the selected value,
 * and a function that allows the user to change the selected value.
 */
export class colorControl {

    public rows: colorRow[] = [];

    constructor(private model: Model, private onItemClicked: Function, private onNextItem: Function, private onPreviousItem: Function) {
        this.init();
    }

    // creates the container
    public init(): void {

        var container = $("<div role='radiogroup'> </div>");
        container.addClass("container");
        container.attr('tabindex', '0');

        var options = this.model.getOptions();

        for (let option of options) {
            var row = new colorRow(option.value, option.color, option.label);
            this.rows.push(row);
            container.append(row.create());
            // checks if the row is selected and displays accordingly
            if (String(option.value) === this.model.getSelectedValue()) {
                row.select(true);
            }
            else {
                row.unselect();
            }
        }

        // allows user to click, keyup, or keydown to change the selected value.
        $(document).click((evt: JQueryMouseEventObject) => {
            this._click(evt);
        }).bind('keydown', (evt: JQueryKeyEventObject) => {
            if (evt.keyCode == 40 || evt.keyCode == 39) {
                // According to ARIA accessibility guide, both down and right arrows should be used.
                if (this.onNextItem) {
                    this.onNextItem();
                    evt.preventDefault();
                }
            }
            else if (evt.keyCode == 38 || evt.keyCode == 37) {
                // According to ARIA accessibility guide, both up and left arrows should be used.
                if (this.onPreviousItem) {
                    this.onPreviousItem();
                    evt.preventDefault();
                }
            }
        });

        $('body').empty().append(container);

        $(document).ready(() => {
            this._scroll();
        });
    }

    public update(value: string, focus: boolean): void {
        for (let row of this.rows) {
            if (row.allowedValue == value) {
                row.select(focus);
            }
            else {
                row.unselect();
            }
        }
        this._scroll();
    }

    private _scroll(): void {
        let scrollTo = $("div.row.selected");

        if (scrollTo.length) {
            if (scrollTo.offset().top > $(".container").height()) {
                $(".container").scrollTop(
                    scrollTo.offset().top - $(".container").offset().top + $(".container").scrollTop()
                );
            }
        }
    }

    private _click(evt: JQueryMouseEventObject): void {
        let itemClicked = $(evt.target).closest(".row").data("value");
        if (itemClicked != null && $.isFunction(this.onItemClicked)) {
            this.onItemClicked(itemClicked);
        }
    }
}