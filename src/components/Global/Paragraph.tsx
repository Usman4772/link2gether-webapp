import React from 'react'

function Paragraph({ text ,size="14px" ,className}: { text: string ,size?: string ,className?: string }) {
  return (
    <p className={`${className}  text-[#4F7A96] `} style={{ fontSize: size }}>
      {text}
    </p>
  );
}

export default Paragraph