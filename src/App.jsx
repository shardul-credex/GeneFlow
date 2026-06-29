import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import ContentSection from './sections/ContentSection'
import Footer from './components/Footer'
import RnaBackground from './components/RnaBackground'

export default function App() {
  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#f5f5f3' }}>
      <RnaBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <ContentSection />
      </main>
      <Footer />
    </div>
  )
}
