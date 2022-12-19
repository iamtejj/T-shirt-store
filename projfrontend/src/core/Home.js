import React from 'react'
import { API } from '../backend'
import '../styles.css'
import Base from './Base'

export default function Home() {

  return (
    <Base title="hello"  description="this is description">
      Here is the children comes in Play
    </Base>
  )
}
