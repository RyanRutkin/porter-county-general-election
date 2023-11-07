import { ElectionPrecinct } from "../types/ElectionResults.types";
import { parseSummaryData } from "./parseSummaryData.function";

const DEFAULT_PRECINCT: ElectionPrecinct = {
    title: '',
    result: {
        header: '',
        sections: []
    }
};

export const parsePrecinctData = (resultData: {
    hash: string;
    content: string;
}) => {
    let content = resultData.content;
    const precincts: Record<string, ElectionPrecinct> = {};
    let currentPrecinct = { ...DEFAULT_PRECINCT };
    let headerSet = false;
    while(content.length) {
        const precinctNameMatch = /,\s\d{4}\n.+(\d{4}.+)\n/.exec(content);
        if (precinctNameMatch?.length && precinctNameMatch.length> 1) {
            if (headerSet) {
                currentPrecinct.result = parseSummaryData({
                    hash: '',
                    content: content.substring(0, precinctNameMatch.index)
                });
                precincts[currentPrecinct.title] = { ...currentPrecinct };
            }
            headerSet = true;
            currentPrecinct = {
                ...DEFAULT_PRECINCT,
                title: precinctNameMatch[1]
            };
            content = content.substring(precinctNameMatch.index + precinctNameMatch[0].length);
        } else {
            console.log('End of data. End precinct parse');
            break;
        }
    }
    return precincts;
}