import React, { useReducer, useState } from 'react'
import { CellGrid } from '../CellGrid/CellGrid'
import { useGameLoop } from '../../gamelogic/gameLoop/gameLoop'
import styles from './gameStyle.module.css'
import { Scoreboard } from '../Scoreboard/Scoreboard'
import { scoreReducer } from '../../gamelogic/reducerHooks/score'
import { buildBaseGrid } from '../../gamelogic/cellGrid'

export const Game: React.FC = () => {
  const initalColourGrid = buildBaseGrid()
  const [colourGrid, setColourGrid] = useState(initalColourGrid)
  const [score, scoreDispatch] = useReducer(scoreReducer, 0)

  const [onKeyDown] = useGameLoop({ gridSetter: setColourGrid, scoreDispatch, tickRate: 1000 })
  return (
        <div className={styles.game} onKeyDown={onKeyDown} tabIndex={0}>
            <CellGrid rows={18} cols={10} defaultColor={0} colorGrid={colourGrid} />
            <Scoreboard score={score} />
        </div>
  )
}
