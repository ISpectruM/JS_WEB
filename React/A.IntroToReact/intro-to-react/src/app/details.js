import React from 'react'

const details = (data) => {
  return (
    <div id='details'>
      <h1>Details</h1>
      <div className='content'>
        <div className='info'>
          <div className='col'>
            <span className='avatar'>&#9787;</span>
          </div>
          <div className='col'>
            <span className='name'>{data.firstName}</span>
            <span className='name'>{data.lastName}</span>
          </div>
        </div>
        <div className='info'>
          <span className='info-line'>&#x260E; {data.phone}</span>
          <span className='info-line'>&#9993; {data.email}</span>
        </div>
      </div>
    </div>
  )
}

export default details
