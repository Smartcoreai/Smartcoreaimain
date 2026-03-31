'use client'
import { useState } from 'react'
import Spline from '@splinetool/react-spline'

export default function SplineHero() {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <Spline
      scene="https://prod.spline.design/MVqmFoIKpeiIAlhZ/scene.splinecode"
      style={{ width: '100%', height: '100%' }}
      onError={() => setFailed(true)}
    />
  )
}
