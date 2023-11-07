import { FC, PropsWithChildren, createContext, useCallback, useEffect, useState } from 'react';
import { useInterval } from '../hooks/useInterval.hook';
import { parseSummaryData } from '../functions/parseSummaryData.function';
import { ElectionPrecinct } from '../types/ElectionResults.types';
import ResultsJson from '../data/results.json';
import { parsePrecinctData } from '../functions/parsePrecinctData.function';
import { prunePageDates } from '../functions/prunePageDates.function';

export const ElectionResultsContext = createContext<{
    selectedResults: string | null;
    setSelectedResults: (selection: string) => void;
    resultOptions: Record<string, ElectionPrecinct>;
    lastUpdateTimestamp: string;
}>({
    selectedResults: null,
    setSelectedResults: (selection: string) => { throw new Error('ElectionResultsContext is not within scope.') },
    resultOptions: {},
    lastUpdateTimestamp: ''
});

export const ElectionResultsContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ selectedResults, _setSelectedResults ] = useState<string>('Summary');
    const [ resultOptions, setResultOptions ] = useState<Record<string, ElectionPrecinct>>({});
    const [ lastSummaryHash, setLastSummaryHash ] = useState<string>('');
    const [ lastPrecinctHash, setLastPrecinctHash ] = useState<string>('');
    const [ lastUpdateTimestamp, setLastUpdateTimestamp ] = useState<string>('');
    const [ flipper, setFlipper ] = useState<number>(0);

    const setSelectedResults = useCallback((selection: string) => {
        if (!resultOptions[selection]) {
            return;
        }
        _setSelectedResults(selection);
    }, [resultOptions]);

    const parseSummary = useCallback(() => {
        if (ResultsJson.summary?.hash === lastSummaryHash) {
            console.log('Skipping summary');
            return;
        }
        console.log(`Parsing summary content: ${ flipper }; New hash: ${ ResultsJson.summary?.hash }; Last hash: ${ lastSummaryHash }`);
        setLastSummaryHash(ResultsJson.summary?.hash || '');
        setLastUpdateTimestamp(new Date().toLocaleTimeString("en-US"));
        const summaryContent = prunePageDates(ResultsJson.summary?.content || '');
        const summaryResults = parseSummaryData({
            hash: ResultsJson.summary?.hash || '',
            content: summaryContent
        });
        setResultOptions(options => ({
            ...options,
            Summary: {
                title: 'Summary',
                result: summaryResults
            }
        }));
    }, [flipper, ResultsJson, lastSummaryHash]);

    const parsePrecincts = useCallback(() => {
        if (ResultsJson.precinct?.hash === lastPrecinctHash) {
            console.log('Skipping precincts');
            return;
        }
        console.log(`Parsing precinct content: ${ flipper }; New hash: ${ ResultsJson.precinct?.hash }; Last hash: ${ lastPrecinctHash }`);
        setLastPrecinctHash(ResultsJson.precinct?.hash || '');
        setLastUpdateTimestamp(new Date().toLocaleTimeString("en-US"));
        const precinctsContent = prunePageDates(ResultsJson.precinct?.content || '');
        const precinctResults = parsePrecinctData({
            hash: ResultsJson.precinct?.hash || '',
            content: precinctsContent
        });
        setResultOptions(options => ({
            ...options,
            ...precinctResults,
        }));
    }, [flipper, ResultsJson, lastPrecinctHash]);

    useEffect(() => {
        parseSummary();
        parsePrecincts();
    }, [flipper]);

    useInterval(() => {
        setFlipper(flip => flip ? 0 : 1);
    }, 300000);

    return <ElectionResultsContext.Provider value={{ 
        selectedResults, setSelectedResults,
        resultOptions: resultOptions, 
        lastUpdateTimestamp
    }} >
        { children }
    </ElectionResultsContext.Provider>
}
