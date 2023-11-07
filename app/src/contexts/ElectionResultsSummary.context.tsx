import { FC, PropsWithChildren, createContext, useEffect, useState } from 'react';
import { useInterval } from '../hooks/useInterval.hook';
import { parseResults } from '../functions/parseResults.function';
import { ElectionResult } from '../types/ElectionResults.types';
import ResultsJson from '../data/results.json';

export const ElectionResultsSummaryContext = createContext<{
    results: ElectionResult | null;
    lastUpdateTimestamp: string;
}>({
    results: null,
    lastUpdateTimestamp: ''
});

export const ElectionResultsSummaryContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ results, setResults ] = useState<ElectionResult | null>(null);
    const [ lastHash, setLastHash ] = useState<string>('');
    const [ lastUpdateTimestamp, setLastUpdateTimestamp ] = useState<string>('');
    const [ flipper, setFlipper ] = useState<number>(0);

    useEffect(() => {
        if (ResultsJson.summary?.hash === lastHash) {
            console.log('Skipping');
            return;
        }
        console.log(`Parsing content: ${ flipper }; New hash: ${ ResultsJson.summary?.hash }; Last hash: ${ lastHash }`);
        setLastHash(ResultsJson.summary?.hash || '');
        setLastUpdateTimestamp(new Date().toLocaleTimeString("en-US"));
        setResults(parseResults(ResultsJson.summary || {}));
    }, [flipper, lastHash]);

    useInterval(() => {
        setFlipper(flip => flip ? 0 : 1);
    }, 300000);

    return <ElectionResultsSummaryContext.Provider value={{ results, lastUpdateTimestamp }} >
        { children }
    </ElectionResultsSummaryContext.Provider>
}
