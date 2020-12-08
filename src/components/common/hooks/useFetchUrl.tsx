import React, { useState, useEffect, useContext } from 'react';
import { UpdateCache } from '../../../App';
import { apiRequestWithToken } from '../../../auth/AuthFunctions';
import * as notify from '../../common/notify';

const cache = {};

const useFetchUrl = (url: string, setter, condition?) => {
    const { updateCache, setUpdateCache } = useContext(UpdateCache);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    // const [intialValue, setIntialValue] = useState([]);
    // const [data, setData] = useState<T>();

    const getData = () => {
        if (condition !== undefined && condition === false) return;
        if (!url) return;

        if (cache[url] && !updateCache[url]) {
            const dataCached = cache[url];
            //setter(data);
            setter(dataCached);
            setLoading(false);
        } else {
            setLoading(true);
            apiRequestWithToken('api/' + url, 'GET').then((result: any) => {
                if (isSubscribed && result && !result.Message) {
                    if (url) {
                        cache[url] = result;
                    }
                    if (setUpdateCache) {
                        setUpdateCache({ ...updateCache, [url]: false });
                    }
                    // setter(result);
                    setter(result);
                    setLoading(false);
                } else if (result && result.Message && result.RequestId) {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log('Err');
                }
            });
        }
    };

    useEffect(() => {
        setIsSubscribed(true);
        getData();
        return () => setIsSubscribed(false);
    }, [url]);

    return { loading, setLoading, cache };
};

export default useFetchUrl;
