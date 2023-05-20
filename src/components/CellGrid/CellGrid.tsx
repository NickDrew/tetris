import React, { ReactElement } from "react";
import { Cell } from "../Cell/Cell";
import styles from "./cellGridstyle.module.css"

export const CellGrid: React.FC = () => {

    const grid: ReactElement[][] = []
    for (let row = 0; row < 18; row++) {
        grid.push([])
        for (let col = 0; col < 10; col++) {
            grid[row].push(<Cell key={`${col}${row}`} color={0} />)
        }
    }

    return <div className={styles.cellgrid}>{grid}</div>
}