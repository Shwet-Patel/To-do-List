import React from 'react'

function Spinner() {
  return (
    <div className='min-h-[50vh] flex items-center justify-center'>
        <div className=' animate-ping w-16 h-16 rounded-full bg-black'></div>
    </div>
  )
}

export default Spinner;