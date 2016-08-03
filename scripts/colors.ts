export class Colors {

    /** Colors holds a static method called getColors. This method allows InputParser to 
     * retrieve default colors when the user inputs no colors, but has at least 1 value. 
     */

    public static getColors(numberOfValues: number): string[] {
        /** Takes in the number of values available in the control and returns an array of 
        * default colors equal to the number of values.
        */

        // newColors stores array of default colors for method to return
        var newColors: string[] = [];

        // defaultColors is an array of default color arrays, allows retrieval of array by index
        // Note: Colors need to be changed to official colors, these are just test colors. 
        const defaultColors = [
            ["red"],
            ["red", "blue"],
            ["red", "yellow", "blue"],
            ["red", "orange", "yellow", "blue"],
            ["red", "orange", "yellow", "blue", "darkblue"],
            ["darkred", "red", "orange", "yellow", "blue", "darkblue"],
            ["darkred", "red", "orange", "yellow", "blue", "darkblue", "purple"]
        ];

        // Check number of values from input 
        if (numberOfValues > 0 && numberOfValues <= defaultColors.length) {
            // Supports between 1 to 7 values for default colors
            newColors = defaultColors[numberOfValues - 1];
            return newColors;
        }
        else if (numberOfValues > defaultColors.length) {
            // Does not support beyond the number of default colors, so last color is repeated until all values have an assigned color
            newColors = defaultColors[defaultColors.length-1];
            for (var i = defaultColors.length; i < numberOfValues; i++) {
                newColors.push(defaultColors[defaultColors.length-1][defaultColors.length-1]);
            }
            return newColors;
        }
        else {
            // Covers null, negative and undefined numberOfValues 
            throw "Incorrect input and no default colors can be provided";
        }
    }
}