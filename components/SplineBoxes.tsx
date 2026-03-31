'use client'
import { useState } from 'react'
import Spline from '@splinetool/react-spline'

export default function SplineBoxes() {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <Spline
      scene="https://prod.spline.design/1mEJOcZYd7hc2g5e/scene.splinecode"
      style={{ width: '100%', height: '100%' }}
      onError={() => setFailed(true)}
    />
  )
}
