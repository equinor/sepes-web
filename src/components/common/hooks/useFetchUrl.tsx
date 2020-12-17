import React, { useState, useEffect, useContext } from 'react';
import { UpdateCache } from '../../../App';
import { apiRequestWithToken } from '../../../auth/AuthFunctions';
import * as notify from '../../common/notify';

const cache = {};

const useFetchUrl = (url: string, setter, condition?) => {
    const { updateCache, setUpdateCache } = useContext(UpdateCache);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [intialValue, setIntialValue] = useState();

    const getData = () => {
        if (condition !== undefined && condition === false) return;
        if (!url) return;

        if (cache[url] && !updateCache[url]) {
            const dataCached = cache[url];
            setter(dataCached);
            setIntialValue(dataCached);
            setLoading(false);
        } else {
            setLoading(true);
            apiRequestWithToken('api/' + url, 'GET').then((result: any) => {
                if (isSubscribed && result && !result.Message && !result.errors) {
                    if (url) {
                        cache[url] = result;
                    }
                    if (setUpdateCache) {
                        setUpdateCache({ ...updateCache, [url]: false });
                    }
                    setIntialValue(result);
                    setter(result);
                } else if (result && result.Message && result.RequestId) {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log('Err');
                }
                setLoading(false);
            });
        }
    };

    useEffect(() => {
        setIsSubscribed(true);
        getData();
        return () => setIsSubscribed(false);
    }, [url]);

    return { loading, setLoading, cache, intialValue };
};

export default useFetchUrl;
