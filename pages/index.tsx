import type { NextPage } from 'next'
import { useEffect } from 'react'
import { Layout } from '../components/Layout/Layout'
import { Auth } from '../components/pages/Auth'
import { DashBoard } from '../components/pages/DashBoard'
import useStore from '../store'
import { supabase } from '../utils/supabase'

const Home: NextPage = () => {
  const session = useStore((state) => state.session)
  const setSession = useStore((state) => state.setSession)

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {      
      setSession(session)
    })
  }, [setSession])

  return (
    <Layout title="Dashboard">
      {session ? <DashBoard /> : <Auth />}
    </Layout>
  )
}

export default Home
