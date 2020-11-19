import React from 'react';

const Input = props => {
  const { name, value, onClick, children, className, disabled } = props
  
  return (
    <button
      className={className}
      onClick={onClick}
      value={value}
      disabled={disabled}
    >
      {name}
      {children}
    </button>
  )
}

export default Input