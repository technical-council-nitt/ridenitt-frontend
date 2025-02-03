import {AvailableRidesComponent} from './Pages/Availablerides'
import {ProfileComponent} from './Pages/profile'
import {BrowserRouter, Routes,Route } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AvailableRidesComponent />} />
        <Route path="/profile" element={<ProfileComponent />} />
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
