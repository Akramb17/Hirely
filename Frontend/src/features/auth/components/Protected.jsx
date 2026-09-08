// import {useAuth} from '../hooks/useAuth.js'
// import {Navigate} from 'react-router'
// import React from 'react'

// const Protected = ({children}) => {
//   const {loading,user} = useAuth()

//   if(loading){
//     return <main><h1>Loading......</h1></main>
//   } 

//   if(!user){
//     return <Navigate to={"/login"} />
//   }

//   return children
// }

// export default Protected


import { useAuth } from '../hooks/useAuth.js'
import { Navigate } from 'react-router'
import React from 'react'
import Loading from './Loading.jsx'

const Protected = ({ children }) => {

  const { loading, user } = useAuth()

  if (loading) {
    return <Loading message="Loading your dashboard..." />
  }

  if (!user) {
    return <Navigate to={"/login"} />
  }

  return children
}

export default Protected
