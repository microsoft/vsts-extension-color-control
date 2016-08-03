/// <reference path="../typings/index.d.ts" />
import { Controller } from "./control";
import * as ExtensionContracts from "TFS/WorkItemTracking/ExtensionContracts";

var control: Controller;

var provider = () => {
    return {
        onLoaded: (workItemLoadedArgs: ExtensionContracts.IWorkItemLoadedArgs) => {
            control = new Controller();
        },
        onFieldChanged: (fieldChangedArgs: ExtensionContracts.IWorkItemFieldChangedArgs) => {
            var changedValue = fieldChangedArgs.changedFields[control.getFieldName()];
            if (changedValue !== undefined) {
                control.updateExternal(changedValue);
            }
        }
    }
};

VSS.register("<your-publisher>.color-control-dev.color-control-contribution", provider);