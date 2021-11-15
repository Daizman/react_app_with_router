import React, { useEffect, useRef } from "react";

export default function useObserver<T extends Element> (ref: React.MutableRefObject<T>,
    canLoad: boolean,
    isLoading: boolean,
    callback: (entries?: IntersectionObserverEntry[]) => void) {
        const observer = useRef<IntersectionObserver>();

        useEffect(() => {
            if(isLoading) return;

            if(observer && observer.current) {
                observer.current.disconnect();
            }

            let cb = (entries: IntersectionObserverEntry[]) => {
                if(entries.length > 0 && entries[0].isIntersecting && canLoad) {
                    callback();
                }
            };
            observer.current = new IntersectionObserver(cb);
            if(ref.current) {
                observer.current.observe(ref.current);
            }
        }, [isLoading]);
}