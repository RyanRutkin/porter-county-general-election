export const prunePageDates = (content: string) => {
    const pageDateRegex = /EL\d{2}\.HTM\[\d{1,2}\/\d{1,2}\/\d{4}\s{1}\d{1,2}:\d{1,2}:\d{1,2}\s{1}\w{2}\]/gm;
    let n_content = String(content);
    let nextMatch = pageDateRegex.exec(n_content);
    while(nextMatch) {
        n_content = `${ n_content.substring(0, nextMatch.index) }${ n_content.substring(nextMatch.index + nextMatch[0].length) }`;
        nextMatch = pageDateRegex.exec(n_content);
    }
    return n_content;
}