import { Toaster } from 'sonner'
import { LyricsContent } from './components/LyricsContent'
import Footer from './components/ui/Footer'
import { GlobalProvider } from './context/GlobalProvider'

function App() {
  return (
    <GlobalProvider>
      <Toaster position="top-center" richColors />
      <div style={{flex: 1}}>
        <LyricsContent />
      </div>
      <Footer />
    </GlobalProvider>
  )
}

export default App
