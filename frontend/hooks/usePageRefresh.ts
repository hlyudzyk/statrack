import {useEffect} from 'react';

const DEFAULT_PAGE_REFRESH_INTERVAL = 5 * 10 * 1000; // 5 minutes

export const usePageRefresh = (
    isActivated: boolean,
    interval: number = DEFAULT_PAGE_REFRESH_INTERVAL
) => {
    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isActivated) {
            intervalId = setInterval(() => {
                window.location.reload();
            }, interval);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isActivated, interval]);
};
