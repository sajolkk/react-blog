import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const authStatus = useSelector(state => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate('/login');
    } else if (!authentication && authStatus !== authentication) {
      navigate('/');
    }
    setIsLoading(false);
  }, [authStatus, navigate, authentication])


  if (isLoading) {
    return <h1>Loading...</h1>
  } else {
    return (
      <>
        {children}
      </>
    )
  }
}

export default Protected