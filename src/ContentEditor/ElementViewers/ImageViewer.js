import React from 'react';

export default function ImageViewer({ element }) {
  return (
    <img alt={element.alt} src={element.url} />
  )
}
