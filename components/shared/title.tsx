import React from 'react'

export interface TitleProps {
  title: string
  subtitle: string
  className?: string
}

export default function Title({ title, subtitle, className = '' }: TitleProps) {
  return (
    <div className={`mb-12 ${className}`}>
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-xl text-gray-600 dark:text-gray-400">{subtitle}</p>
    </div>
  )
}