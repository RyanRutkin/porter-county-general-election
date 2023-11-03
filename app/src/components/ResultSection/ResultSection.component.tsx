import { FC } from "react";
import { ElectionResultSection } from "../../types/ElectionResults.types";
import { AppResultContent } from "../ResultContent/ResultChoice.component";
import './ResultSection.component.css';

export const AppResultSection: FC<{ section: ElectionResultSection }> = ({ section }) => (
    <div className="app-result-section" >
        <div className="app-result-section-title app-result-section-row" >{ section.title }</div>
        <div className="app-result-section-vote app-result-section-row" >(VOTE FOR) { section.voteForCount }</div>
        <div className="app-result-section-content app-result-section-row" >
            {
                section.content.map((choice, idx) => (
                    <AppResultContent
                        key={`app-result-section_${idx}`}
                        choice={ choice } 
                    />
                ))
            }
        </div>
    </div>
)