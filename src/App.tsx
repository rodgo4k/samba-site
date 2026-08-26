import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, type ReactNode } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Motion } from './components/Motion'
import { Home } from './pages/Home'
import { About } from './pages/About'

function Scroll({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Scroll>
        <Motion />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Scroll>
    </BrowserRouter>
  )
}
