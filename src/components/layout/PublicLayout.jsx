import Navbar from './Navbar'
import Footer from './Footer'

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
