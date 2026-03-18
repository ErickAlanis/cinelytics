import { AppLayout } from './layouts/AppLayout'
import { DashboardPage } from './pages/DashboardPage'

function App() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Saltar al contenido principal
      </a>

      <AppLayout>
        <DashboardPage />
      </AppLayout>
    </>
  )
}

export default App
