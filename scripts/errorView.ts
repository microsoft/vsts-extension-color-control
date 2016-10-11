/***************************************************************************
Purpose: This class is being used to get errors from an input parser and 
            a model. It takes all the errors and put them in an array in
            order to be sent to a view to display them.       
***************************************************************************/

// shows the errors in the control container rather than the control.
export class ErrorView {

    constructor(error: string) {
        // container div
        var errorContainer = $("<div />");
        errorContainer.addClass("errorContainer");

        var table = $("<table></table>");
        var tr = $("<tr></tr>");
        var icon = $("<td><span class='bowtie-icon bowtie-status-error'></span></td>");
        var warning = $("<td></td>").text(error).attr("title", error);

        table.append(tr);
        tr.append(icon);
        tr.append(warning);

        var tr2 = $("<tr></tr>");
        tr2.append("<td></td>");
        
        var help = $("<td></td>");
        help.text("For more information click ");

        var a = $("<a> </a>");
        a.attr("href", "https://www.visualstudio.com/en-us/docs/work/customize/customize-work");
        a.attr("target", "_blank");
        a.text("here.");
        help.append(a);

        tr2.append(help);
        table.append(tr2);

        errorContainer.append(table);

        $('body').empty().append(errorContainer);
    }
}