import { FC, PropsWithChildren, createContext, useEffect, useState } from 'react';
import { useInterval } from '../hooks/useInterval.hook';
import { parseResults } from '../functions/parseResults.function';
import { ElectionResult } from '../types/ElectionResults.types';

export const ElectionResultsContext = createContext<{
    results: ElectionResult | null;
}>({
    results: null
});

export const ElectionResultsContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ results, setResults ] = useState<ElectionResult | null>(parseResults());
    const [ flipper, setFlipper ] = useState<number>(0);

    useEffect(() => {
        console.log(`Parsing content: ${ flipper }`);
        setResults(parseResults());
    }, [flipper]);

    useInterval(() => {
        setFlipper(flip => flip ? 0 : 1);
    }, 300000);

    return <ElectionResultsContext.Provider value={{ results }} >
        { children }
    </ElectionResultsContext.Provider>
}
