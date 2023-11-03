import { FC } from "react";
import { ElectionResultChoice } from "../../types/ElectionResults.types";
import './ResultChoice.component.css';

export const AppResultContent: FC<{ choice: ElectionResultChoice }> = ({ choice }) => (
    <div className="app-result-choice" >
        <div className="app-result-choice-title" >{ choice.choice }</div>
        <div className="app-result-choice-content" >
            <div className="app-result-choice-total app-result-choice-value" >{ choice.total }</div>
            <div className="app-result-choice-percent app-result-choice-value" >{ choice.percent }</div>
        </div>
    </div>
)