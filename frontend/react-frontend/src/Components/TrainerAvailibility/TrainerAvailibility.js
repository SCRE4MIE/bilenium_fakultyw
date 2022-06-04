import { Tooltip } from '@mui/material'
import React from 'react'

const TrainerAvailibility = ({availibility, username, trainer}) => {

  const enabled = {
    color: '#90BE6D',
  }
  const disabled = {
    color: '#EEEEEE'
  }
  const tooltipText = trainer? 'Your availibility' :`${username}'s availibility`

  return (
    <Tooltip title={tooltipText}>
      <div style={{cursor: 'default', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '5px'}}>
        <span style={availibility.monday ? enabled : disabled}>Mon </span><span style={{color: '#577590'}}>/ </span>
        <span style={availibility.tuesday ? enabled : disabled}>Tue </span><span style={{color: '#577590'}}>/ </span>
        <span style={availibility.wednesday ? enabled : disabled}>Wed </span><span style={{color: '#577590'}}>/ </span>
        <span style={availibility.thursday ? enabled : disabled}>Thu </span><span style={{color: '#577590'}}>/ </span>
        <span style={availibility.friday ? enabled : disabled}>Fri </span><span style={{color: '#577590'}}>/ </span>
        <span style={availibility.saturday ? enabled : disabled}>Sat </span><span style={{color: '#577590'}}>/ </span>
        <span style={availibility.sunday ? enabled : disabled}>Sun</span>
      </div>
    </Tooltip>
  )
}

export default TrainerAvailibility