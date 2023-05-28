import React from "react";
import styles from "./scoreboardStyle.module.css"

export interface IScoreboardProps {
    score: number;
    level: number;
}

export const Scoreboard: React.FC<IScoreboardProps> = (props) => {
    const { score, level } = props;
    return <div className={styles.scoreboardOuter}>
        <div className={styles.scoreboardInner}>
            <div>
                <div>Score:{score}</div>
                <div>Level:{level}</div>
            </div>
        </div>
    </div>
}