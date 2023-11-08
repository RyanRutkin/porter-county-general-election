export type ElectionPrecinct = {
    title: string;
    result: ElectionResult;
}
export type ElectionResult = {
    header: string;
    sections: ElectionResultSection[];
}
export type ElectionResultSection = {
    title: string;
    voteForCount: number;
    content: ElectionResultChoice[];
}
export type ElectionResultChoice = {
    choice: string;
    total: number | null;
    percent: number | null;
}
export type RawElectionResults = {
    hash: string;
    content: string;
}