'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(true) // start hidden during SSR

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (isMobile || !cursorRef.current) return

    const cursor = cursorRef.current
    let mouseX = -100
    let mouseY = -100
    let cursorX = -100
    let cursorY = -100
    let rafId: number

    const lerp = (a: number, b: number, f: number) => a + (b - a) * f

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button')) {
        cursor.style.width = '60px'
        cursor.style.height = '60px'
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null
      if (
        (e.target as HTMLElement).closest('a, button') &&
        !related?.closest('a, button')
      ) {
        cursor.style.width = '18px'
        cursor.style.height = '18px'
      }
    }

    const tick = () => {
      cursorX = lerp(cursorX, mouseX, 0.12)
      cursorY = lerp(cursorY, mouseY, 0.12)
      cursor.style.left = `${cursorX}px`
      cursor.style.top = `${cursorY}px`
      rafId = requestAnimationFrame(tick)
    }

    document.body.style.cursor = 'none'
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] rounded-full bg-white"
      style={{
        width: 18,
        height: 18,
        mixBlendMode: 'difference',
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.25s ease, height 0.25s ease',
        willChange: 'left, top',
      }}
    />
  )
}
