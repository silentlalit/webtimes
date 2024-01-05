import Image from 'next/image';
import React from 'react';

const error = () => {
  return (
    <div style={{ backgroundColor: "#000000", position: 'relative', width: "100%", height: "100vh" }}>
      <Image src="/videos/not_found.gif" alt="not-found" fill priority />
    </div>
  )
}

export default error;