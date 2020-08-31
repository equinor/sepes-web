import React from 'react';
import { getAzureRegions } from '../../services/Api';
import * as notify from '../common/notify';

export const getRegions = (setRegions: any) => {
    getAzureRegions().then((result: any) => {
        if (result && !result.Message) {
            setRegions(result);
        }
        else {
            console.log("Err");
            notify.show('danger', '500', result.Message, result.RequestId);
        }
    });
}