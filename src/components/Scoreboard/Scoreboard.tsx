import React from "react";
import styles from "./scoreboardStyle.module.css"

export interface IScoreboardProps {
    score: number;
}

export const Scoreboard: React.FC<IScoreboardProps> = (props) => {
    const { score } = props;
    return <div className={styles.scoreboardOuter}>
        <div className={styles.scoreboardInner}>
            <div>
                <div>Score:{score}</div>
            </div>
        </div>
    </div>
}