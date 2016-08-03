/***************************************************************************
Purpose: This class is being used to get errors from an input parser and 
            a model. It takes all the errors and put them in an array in
            order to be sent to a view to display them.       
***************************************************************************/


// shows the errors in the control container rather than the control.
export class ErrorView {

    constructor(error: string) {
        // container div
        var container = $("<div />");
        container.addClass("container");

        // create an icon and text for the error
        var warning = $("<p />");
        warning.text(error);
        warning.attr("title", error);
        container.append(warning);


        // include documentation link for help.
        var help = $("<p />");
        help.text("See ");

        var a = $("<a> </a>");
        a.attr("href", "https://www.visualstudio.com/en-us/products/visual-studio-team-services-vs.aspx");
        a.attr("target", "_blank");
        a.text("Documentation.");

        help.append(a);
        container.append(help);

        $('body').empty().append(container);
    }
}