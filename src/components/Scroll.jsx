import React from 'react';

const Scroll = (props) => {
  return (
    <div 
      style={{ 
        overflow: 'scroll', 
        borderTop: '3px solid black', 
        height: '800px',
        marginTop: '1em'
      }}
    >
      {props.children}
    </div>
  )
}

export default Scroll;