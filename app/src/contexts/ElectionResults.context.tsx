import { FC, PropsWithChildren, createContext, useEffect, useState } from 'react';
import { useInterval } from '../hooks/useInterval.hook';
import { parseResults } from '../functions/parseResults.function';
import { ElectionResult } from '../types/ElectionResults.types';
import ResultsJson from '../data/results.json';

export const ElectionResultsContext = createContext<{
    results: ElectionResult | null;
    lastUpdateTimestamp: string;
}>({
    results: null,
    lastUpdateTimestamp: ''
});

export const ElectionResultsContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ results, setResults ] = useState<ElectionResult | null>(null);
    const [ lastHash, setLastHash ] = useState<string>('');
    const [ lastUpdateTimestamp, setLastUpdateTimestamp ] = useState<string>('');
    const [ flipper, setFlipper ] = useState<number>(0);

    useEffect(() => {
        if (ResultsJson.hash === lastHash) {
            console.log('Skipping');
            return;
        }
        console.log(`Parsing content: ${ flipper }; New hash: ${ ResultsJson.hash }; Last hash: ${ lastHash }`);
        setLastHash(ResultsJson.hash);
        setLastUpdateTimestamp(new Date().toLocaleTimeString("en-US"));
        setResults(parseResults(ResultsJson));
    }, [flipper, lastHash]);

    useInterval(() => {
        setFlipper(flip => flip ? 0 : 1);
    }, 300000);

    return <ElectionResultsContext.Provider value={{ results, lastUpdateTimestamp }} >
        { children }
    </ElectionResultsContext.Provider>
}
