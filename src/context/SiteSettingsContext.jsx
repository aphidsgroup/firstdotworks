import { createContext, useContext, useState, useEffect } from 'react'

const SiteSettingsContext = createContext()

export function useSiteSettings() {
  return useContext(SiteSettingsContext)
}

const defaultSettings = {
  // Platform Branding
  siteName: 'Firstdot Works',
  contactEmail: 'contact@firstdotworks.com',
  
  // Chat Configuration
  chatEnabled: true,
  whatsappEnabled: true,
  agentName: 'Deepa',
  agentTitle: 'Firstdotworks Support',
  agentStatus: 'online', // online, away, offline
  widgetColor: '#00D1FF', // brand-cyan
  whatsappNumber: '919941875131',
  welcomeMessage: 'Hello, I am Deepa from Firstdotworks. How can I help you today?',
}

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('site_settings')
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) }
      } catch (e) {
        return defaultSettings
      }
    }
    return defaultSettings
  })

  useEffect(() => {
    localStorage.setItem('site_settings', JSON.stringify(settings))
  }, [settings])

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  return (
    <SiteSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  )
}
