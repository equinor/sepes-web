import { useScrollTrigger } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import { UpdateCache } from '../../../App';
import * as notify from '../../common/notify';

const cache = {};

const useFetch = (fetchFunction, setter, cacheId?, para1?, para2?, para3?) => {
    const { updateCache, setUpdateCache } = useContext(UpdateCache);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [intialValue, setIntialValue] = useState([]);
    const getData = () => {
        if (!fetchFunction) return;

        if (cacheId && cache[cacheId] && !updateCache[cacheId]) {
            const data = cache[cacheId];
            setter(data);
            setIntialValue(data);
            setLoading(false);
        }
        else {
            setLoading(true);
            fetchFunction(para1 || null, para2 || null, para3 || null).then((result: any) => {
                if (isSubscribed && result && !result.Message) {
                    if (cacheId) {
                        cache[cacheId] = result;
                    }
                    if (setUpdateCache) {
                        setUpdateCache({ ...updateCache, [cacheId]: false });
                    }
                    setter(result);
                    setIntialValue(result);
                    console.log("result: ", result);
                    setLoading(false);
                }
                else if (result && result.Message && result.RequestId) {
                    notify.show('danger', '500', result.Message, result.RequestId);
                    console.log("Err");
                }
            });
        }
    }

    useEffect(() => {
        setIsSubscribed(true);
        getData();
        return () => setIsSubscribed(false);
    }, [fetchFunction]);

    return { loading, setLoading, cache, intialValue };
};

export default useFetch;
