import Navbar from './components/Navbar.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Hero from './components/Hero.jsx'
import StatsSection from './components/StatsSection.jsx'
import AdmissionSection from './components/AdmissionSection.jsx'
import StudentLifeSection from './components/StudentLifeSection.jsx'
import CurriculumSection from './components/CurriculumSection.jsx'
import PathwaysSection from './components/PathwaysSection.jsx'
import DoubleDegreesSection from './components/DoubleDegreesSection.jsx'
import Footer from './components/Footer.jsx'
import { OverlayProvider } from './context/OverlayContext.jsx'

function App() {
  return (
    <OverlayProvider>
      <Navbar />
      <ScrollProgress />
      <main className="pt-[72px]">
        <Hero />
        <StatsSection />
        <AdmissionSection />
        <DoubleDegreesSection />
        <StudentLifeSection />
        <CurriculumSection />
        <PathwaysSection />
        <Footer />
      </main>
    </OverlayProvider>
  )
}

export default App
