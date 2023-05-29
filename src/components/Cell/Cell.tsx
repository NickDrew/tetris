import React from 'react'
import styles from './cellstyle.module.css'

export interface ICellProps {
  color: number
}

export const Cell: React.FC<ICellProps> = (props) => {
  const colorClass = `color${props.color}`
  const classes = `${styles.cell} ${styles[colorClass]}`
  return <div className={classes} />
}
