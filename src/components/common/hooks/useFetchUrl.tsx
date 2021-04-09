import React, { useState, useEffect, useContext } from 'react';
import { UpdateCache } from '../../../App';
import { apiRequestWithToken } from '../../../auth/AuthFunctions';
import * as notify from '../notify';

const cache = {};

const useFetchUrl = (url: string, setter, condition?, controller?, shouldCache = true) => {
    const { updateCache, setUpdateCache } = useContext(UpdateCache);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [intialValue, setIntialValue] = useState();
    const [notFound, setNotFound] = useState(false);

    const getData = () => {
        if (condition !== undefined && condition === false) return;
        if (!url) return;

        if (shouldCache && cache[url] && !updateCache[url]) {
            const dataCached = cache[url];
            setter(dataCached);
            setIntialValue(dataCached);
            setLoading(false);
        } else {
            setLoading(true);
            apiRequestWithToken('api/' + url, 'GET', undefined, (controller && controller.signal) || undefined).then(
                (result: any) => {
                    setLoading(false);
                    if (isSubscribed && result && !result.Message && !result.errors) {
                        if (url) {
                            cache[url] = result;
                        }
                        if (setUpdateCache) {
                            setUpdateCache({ ...updateCache, [url]: false });
                        }
                        setIntialValue(result);
                        setter(result);
                    } else if (result && ((result.Message && result.RequestId) || result.errors)) {
                        setNotFound(true);
                        ////notify.show('danger', '500', result);
                        console.log('Err');
                    }
                }
            );
        }
    };

    useEffect(() => {
        setIsSubscribed(true);
        getData();
        return () => setIsSubscribed(false);
    }, [url]);

    return { loading, setLoading, cache, intialValue, notFound };
};

export default useFetchUrl;
