/** The class control.ts will orchestrate the classes of InputParser, Model and View
 *  in order to perform the required actions of the extensions. 
 */
import * as VSSService from "VSS/Service";
import * as WitService from "TFS/WorkItemTracking/Services";
import * as ExtensionContracts from "TFS/WorkItemTracking/ExtensionContracts";
import { InputParser } from "./InputParser";
import { Model } from "./model";
import { colorControl } from "./view";
import { ErrorView } from "./errorView";
import * as VSSUtilsCore from "VSS/Utils/Core";
import * as Q from "q";

export class Controller {

    private _fieldName: string = "";
    private _inputs: IDictionaryStringTo<string>;
    private _model: Model;
    private _view: colorControl;

    /**
     * Store the last recorded window width to know
     * when we have been shrunk and should resize
     */
    private _windowWidth: number;
    private _minWindowWidthDelta: number = 10; // Minum change in window width to react to
    private _windowResizeThrottleDelegate: Function;
    private _bodyElement: HTMLBodyElement;

    constructor() {        
        this._bodyElement = <HTMLBodyElement>document.getElementsByTagName("body").item(0);

        this._windowResizeThrottleDelegate = VSSUtilsCore.throttledDelegate(this, 50, () => {
            this._windowWidth = window.innerWidth;
            this.resize();
        });

        this._windowWidth = window.innerWidth;
        $(window).resize(() => {
            if(Math.abs(this._windowWidth - window.innerWidth) > this._minWindowWidthDelta) {
               this._windowResizeThrottleDelegate.call(this);
            }
        });

        this._initialize();
    }

    private _initialize(): void {


        this._inputs = VSS.getConfiguration().witInputs;
        this._fieldName = InputParser.getFieldName(this._inputs);

        WitService.WorkItemFormService.getService().then(
            (service) => {
                Q.spread<any, any>(
                    [service.getAllowedFieldValues(this._fieldName), service.getFieldValue(this._fieldName)],
                    (allowedValues: string[], currentValue: (string | number)) => {
                        if (typeof (currentValue) === 'number') {
                            allowedValues = allowedValues.sort((a, b) => Number(a) - Number(b));
                        }
                        let options = InputParser.getOptions(this._inputs, allowedValues);
                        this._model = new Model(options, String(currentValue));
                        this._view = new colorControl(this._model, (val) => {
                            //when value changes by clicking rows
                            this._updateInternal(val);
                        }, () => {//when down or right arrow is used
                            this._model.selectNextOption();
                            this._updateInternal(this._model.getSelectedValue());
                        }, () => {//when up or left arror is used
                            this._model.selectPreviousOption();
                            this._updateInternal(this._model.getSelectedValue());
                        });

                        this.resize();
                    }, this._handleError
                ).then(null, this._handleError);
            },
            this._handleError);
    }

    private _handleError(error: string): void {
        let errorView = new ErrorView(error);
    }

    private _updateInternal(value: string): void {
        WitService.WorkItemFormService.getService().then(
            (service) => {
                service.setFieldValue(this._fieldName, value).then(
                    () => {
                        this._update(value, true);
                    }, this._handleError)
            },
            this._handleError
        );
    }

    private _update(value: string, focus: boolean): void {
        this._model.setSelectedValue(value);
        this._view.update(value, focus);
    }

    public updateExternal(value: string): void {
        this._update(String(value), false);
    }

    public getFieldName(): string {
        return this._fieldName;
    }

    protected resize() {
        // Cast as any until declarations are updated
        VSS.resize(null, this._bodyElement.offsetHeight);  
    }
}
