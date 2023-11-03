import ResultsJson from '../data/results.json';
import { ElectionResult, ElectionResultChoice, ElectionResultSection } from '../types/ElectionResults.types';

export const parseResults = () => {
    let content = ResultsJson.content;
    const parsed: ElectionResult = {
        header: '',
        sections: []
    };
    let headerSet: boolean = false;
    const currentSection: ElectionResultSection = {
        title: '',
        content: [],
        voteForCount: 0
    }
    while(content.length) {
        const voteForMatch = /(\d+)/.exec(content);
        if (headerSet && voteForMatch?.length) {
            currentSection.voteForCount = parseInt(voteForMatch[0]);
            content = content.substring(voteForMatch.index + voteForMatch[0].length);
        }
        const voteForIdx = content.indexOf('(VOTE FOR');
        if (voteForIdx === -1) {
            console.log('End of input');
            break;
        }
        const nextTitleContent = content.substring(0, voteForIdx);
        const lines = nextTitleContent.split('\n');
        const sectionEndIdx = lines.slice(lines.length - 2).join(' ').length;
        const titleEndIndex = nextTitleContent.length - sectionEndIdx;

        const sectionContent = nextTitleContent.slice(0, titleEndIndex);

        if (!headerSet) {
            parsed.header = parseHeader(sectionContent);
            headerSet = true;
        } else {
            currentSection.content = parseSectionContent(sectionContent);
            parsed.sections.push({
                ...currentSection
            });
        }
        currentSection.title = nextTitleContent.slice(titleEndIndex).replace('\n', ' ').trim();
        currentSection.content = [];
        content = content.slice(voteForIdx+10);
    }
    return parsed;
};

function parseHeader(content: string) {
    return content;
}

function parseSectionContent(content: string) {
    let lines = content.split('\n');
    while(lines.length && !/\w/.exec(lines[0])) {
        lines = lines.slice(1);
    }
    while(lines.length && !/\w/.exec(lines[lines.length - 1])) {
        lines = lines.slice(0, lines.length - 1);
    }
    const trimmedContent = lines.join('');
    const matches = trimmedContent.match(/[\s]{2}([a-zA-Z\.\-\,]+(\s{0,1}[a-zA-Z\.\-\,]+)+(\s{0,1}\({0,1}[a-zA-Z]+\){0,1}){0,1})/gm);
    if (!matches?.length) {
        return [];
    }
    const entries: any[] = [];
    for (let i = 0; i < matches.length; i++) {
        const matchIdx = trimmedContent.indexOf(matches[i]);
        if (matchIdx === -1) {
            continue;
        }
        const nextMatchIdx = i < matches.length - 1 ? trimmedContent.indexOf(matches[i+1]) : null;
        if (nextMatchIdx !== null && nextMatchIdx > -1) {
            entries.push(trimmedContent.substring(matchIdx, nextMatchIdx));
        } else {
            entries.push(trimmedContent.substring(matchIdx));
        }
    }
    const options: ElectionResultChoice[] = [];
    entries.forEach(entry => {
        const choiceEndMatch = /[a-zA-Z\-\(\)]/.exec(entry.split('').reverse().join(''));
        if (!choiceEndMatch) {
            return;
        }
        const choiceRemoved = entry.substring(entry.length - choiceEndMatch.index);
        const digitStartMatch = /\d/.exec(choiceRemoved);
        if (!digitStartMatch) {
            return;
        }
        const centerGapRemoved = choiceRemoved.substring(digitStartMatch.index).trim();
        const specs = centerGapRemoved.split(' ').filter((r: string) => !!r);
        options.push({
            choice: entry.substring(0, entry.length - choiceEndMatch.index).trim(),
            total: specs.length ? parseInt(specs[0].replace(',', '')) : null,
            percent: specs.length > 1 ? parseFloat(specs[1]) : null
        });
    });
    return options;
}