import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import SessionGate from "../src/scenes/session-gate/session-gate-controller";
import {AuthContext} from "../src/contexts/auth-provider";
import { User } from "../src/models/user"
import Storage from "../utils/storage"

const Home: NextPage = () => {
  const [user, setUser] = useState<User>()
  const [hasStarted, setStarted] = useState(false)

  useEffect(() => {
    const storageUser = new Storage().getItem<User>()

    setUser(storageUser)

    setStarted(true)
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <SessionGate user={user} hasStarted={hasStarted} />
    </AuthContext.Provider>
  )
}

export default Home
