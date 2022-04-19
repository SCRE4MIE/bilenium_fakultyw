import React from 'react'
import './ClientFlow.css'

const ClientProfile = ({ signOut }) => {

  const details = JSON.parse(sessionStorage.getItem('userDetails'));

  return (
    <div>
      <h1>{details.avatar_url}</h1>
      <h1>{details.email}</h1>
      <h1>{details.is_trainer}</h1>
      <h1>{details.phone_number}</h1>
      <h1>{details.pk}</h1>
      <h1>{details.username}</h1>
    </div>
  )
}

export default ClientProfile