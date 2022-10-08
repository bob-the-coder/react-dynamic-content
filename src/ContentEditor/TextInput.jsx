import React from 'react'

export default function TextInput({ value, onChange, large }) {
    if (large) {
        return (
            <textarea onChange={e => onChange(e.target.value)}>{value}</textarea>
        )
    }

    return <input type='text' value={value} onChange={e => onChange(e.target.value)} />
}
