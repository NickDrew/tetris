import React, { ReactElement } from "react";
import { Cell } from "../Cell/Cell";
import styles from "./cellGridstyle.module.css"

export interface CellGridProps {
    rows: number;
    cols: number
    color: number
}

export const CellGrid: React.FC<CellGridProps> = (props) => {
    const { rows, cols, color } = props;

    const grid: ReactElement[][] = []
    for (let row = 0; row < rows; row++) {
        grid.push([])
        for (let col = 0; col < cols; col++) {
            grid[row].push(<Cell key={`${col}${row}`} color={color} />)
        }
    }

    return <div className={styles.cellgrid}>{grid}</div>
}