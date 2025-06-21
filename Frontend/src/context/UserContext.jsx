import React from 'react'
import { createContext } from 'react'

export const UserContextData = createContext();

const UserContext = ({children}) => {

    const [user, setUser] = React.useState({
        fullname: {
            firstName: '',
            lastName: ''
        },
        email: ''
    });

  return (
    <div>
        <UserContextData.Provider value={{user}}>
            {children}
        </UserContextData.Provider>
    </div>
  )
}

export default UserContext