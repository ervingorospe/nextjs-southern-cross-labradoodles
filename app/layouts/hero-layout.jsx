import React from 'react'

export async function HeroLayout({ children, textBottomColor = "text-white" }) {
  return (
    <>
      <div className="pattern-secondary absolute inset-0"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-900"></div>

      <div className="md:h-22 h-20 lg:h-24 xl:h-28"></div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden"></div>
      <div className="relative"></div>

      { children }

      <div className="absolute inset-0">
        <svg className="absolute left-0 bottom-0 w-full fill-current text-secondary-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fillOpacity="0.5" d="M0,288L60,261.3C120,235,240,181,360,144C480,107,600,85,720,101.3C840,117,960,171,1080,176C1200,181,1320,139,1380,117.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
        <svg className="absolute left-0 bottom-0 w-full scale-x-flipped transform fill-current text-secondary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fillOpacity="1" d="M0,0L60,10.7C120,21,240,43,360,96C480,149,600,235,720,261.3C840,288,960,256,1080,250.7C1200,245,1320,267,1380,277.3L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
      </div>

      <div className="relative -bottom-px z-1">
        <svg className="absolute left-0 bottom-0 w-full transform fill-current text-primary-500" viewBox="0 0 1000 80">
          <path d="M 0 80 Q 500 0 1000 80 Z" />
        </svg>
        <svg className={`w-full transform fill-current ${textBottomColor}`} viewBox="0 0 1000 60">
          <path d="M 0 60 Q 500 0 1000 60 Z" />
        </svg>
      </div>
    </>
  )
}
