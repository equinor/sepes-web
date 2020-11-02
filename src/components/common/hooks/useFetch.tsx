import React, { useState, useEffect, useContext } from 'react';
import { UpdateCache } from '../../../App';
import * as notify from '../../common/notify';

const cache = {};

const useFetch = (fetchFunction, setter, cacheId?, para1?, para2?, para3?) => {
    const { updateCache, setUpdateCache } = useContext(UpdateCache);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const getData = () => {
        if (!fetchFunction) return;

        if (cacheId && cache[cacheId] && !updateCache[cacheId]) {
            const data = cache[cacheId];
            setter(data);
            setLoading(false);
        }
        else {
            setLoading(true);
            fetchFunction(para1 || null, para2 || null, para3 || null).then((result: any) => {
                if (isSubscribed && !result.Message) {
                    if (cacheId) {
                        cache[cacheId] = result;
                    }
                    if (setUpdateCache) {
                        setUpdateCache({ ...updateCache, [cacheId]: false });
                    }
                    setter(result);
                    console.log("result: ", result);
                    setLoading(false);
                }
                else {
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

    return { loading, setLoading, cache };
};

export default useFetch;
