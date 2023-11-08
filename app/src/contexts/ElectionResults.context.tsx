import { FC, PropsWithChildren, createContext, useCallback, useEffect, useState } from 'react';
import { useInterval } from '../hooks/useInterval.hook';
import { parseSummaryData } from '../functions/parseSummaryData.function';
import { ElectionPrecinct, RawElectionResults } from '../types/ElectionResults.types';
import ResultsJson from '../data/results.json';
import { parsePrecinctData } from '../functions/parsePrecinctData.function';
import { prunePageDates } from '../functions/prunePageDates.function';
import * as Tone from 'tone';

export const ElectionResultsContext = createContext<{
    selectedResults: string | null;
    setSelectedResults: (selection: string) => void;
    resultOptions: Record<string, ElectionPrecinct>;
    lastUpdateTimestamp: string;
    contentFilter: string;
    setContentFilter: (filter: string) => void;
    sound: boolean;
    toggleSound: (value: boolean) => void;
}>({
    selectedResults: null,
    setSelectedResults: (selection: string) => { throw new Error('ElectionResultsContext is not within scope.') },
    resultOptions: {},
    lastUpdateTimestamp: '',
    contentFilter: '',
    setContentFilter: (filter: string) => { throw new Error('ElectionResultsContext is not within scope.') },
    sound: false,
    toggleSound: (value: boolean) => { throw new Error('ElectionResultsContext is not within scope.') }
});

export const ElectionResultsContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ selectedResults, _setSelectedResults ] = useState<string>('Summary');
    const [ resultOptions, setResultOptions ] = useState<Record<string, ElectionPrecinct>>({});
    const [ lastSummaryHash, setLastSummaryHash ] = useState<string>('nope');
    const [ lastPrecinctHash, setLastPrecinctHash ] = useState<string>('nope');
    const [ lastUpdateTimestamp, setLastUpdateTimestamp ] = useState<string>('');
    const [ flipper, setFlipper ] = useState<number>(0);
    const [ contentFilter, setContentFilter ] = useState<string>('');
    const [ sound, setSound ] = useState<boolean>(false);

    const toggleSound = (value: boolean) => {
        setSound(value);
        if (sound) {
            Tone.start();
        }
    }

    const setSelectedResults = useCallback((selection: string) => {
        if (!resultOptions[selection]) {
            return;
        }
        _setSelectedResults(selection);
    }, [resultOptions]);

    const parseSummary = useCallback(() => {
        if (!ResultsJson.summary || (ResultsJson.summary as RawElectionResults).hash === lastSummaryHash) {
            console.log('Skipping summary');
            return false;
        }
        console.log(`Parsing summary content: ${ flipper }; New hash: ${ (ResultsJson.summary as RawElectionResults).hash }; Last hash: ${ lastSummaryHash }`);
        setLastSummaryHash((ResultsJson.summary as RawElectionResults).hash || '');
        setLastUpdateTimestamp(new Date().toLocaleTimeString("en-US"));
        const summaryContent = prunePageDates((ResultsJson.summary as RawElectionResults).content || '');
        const summaryResults = parseSummaryData({
            hash: (ResultsJson.summary as RawElectionResults).hash || '',
            content: summaryContent
        });
        setResultOptions(options => ({
            ...options,
            Summary: {
                title: 'Summary',
                result: summaryResults
            }
        }));
        return true;
    }, [flipper, lastSummaryHash]);

    const parsePrecincts = useCallback(() => {
        if (!ResultsJson.precinct || (ResultsJson.precinct as RawElectionResults).hash === lastPrecinctHash) {
            console.log('Skipping summary');
            return false;
        }
        console.log(`Parsing precinct content: ${ flipper }; New hash: ${ (ResultsJson.precinct as RawElectionResults).hash }; Last hash: ${ lastPrecinctHash }`);
        setLastPrecinctHash((ResultsJson.precinct as RawElectionResults).hash || '');
        setLastUpdateTimestamp(new Date().toLocaleTimeString("en-US"));
        const precinctsContent = prunePageDates((ResultsJson.precinct as RawElectionResults).content || '');
        const precinctResults = parsePrecinctData({
            hash: (ResultsJson.precinct as RawElectionResults).hash || '',
            content: precinctsContent
        });
        setResultOptions(options => ({
            ...options,
            ...precinctResults,
        }));
        return true;
    }, [flipper, lastPrecinctHash]);

    useEffect(() => {
        let updated = parseSummary();
        updated = parsePrecincts() || updated;
        if (updated && sound) {
            const synth = new Tone.Synth().toDestination();
            const now = Tone.now()
            synth.triggerAttackRelease("C4", "16n", now)
            synth.triggerAttackRelease("E4", "16n", now + 0.25)
            synth.triggerAttackRelease("G4", "16n", now + 0.5)
        }
    }, [flipper, parsePrecincts, parseSummary]);

    useInterval(() => {
        setFlipper(flip => flip ? 0 : 1);
    }, 60000);

    return <ElectionResultsContext.Provider value={{ 
        selectedResults, setSelectedResults,
        resultOptions: resultOptions, 
        lastUpdateTimestamp,
        contentFilter, setContentFilter,
        sound, toggleSound
    }} >
        { children }
    </ElectionResultsContext.Provider>
}
