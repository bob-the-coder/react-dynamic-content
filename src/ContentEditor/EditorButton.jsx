import React from 'react'

export default function EditorButton({ variant, value, onClick }) {
  return (
    <button className={`element-editor-btn element-editor-btn--${variant}`} onClick={onClick}>
        {value}
    </button>
  )
}
