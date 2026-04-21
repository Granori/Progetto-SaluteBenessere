import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import Navbar from './pages/navbar';
import Home from './pages/home';
import PagBMI from './pages/bmi';
import PagCalorie from './pages/conta_calorie';

function App() {
  const [isOpenSettings, setIsOpenSettings] = useState(false);
  const [isDark, setIsDark] = useState(false);

  return (
    <Router>
      <div className={`${isDark && "dark"} min-h-screen bg-sfondo text-testo font-sans`}>
        <Navbar openSettings={() => setIsOpenSettings(true)} />
        
        { isOpenSettings && 
          <div onClick={() => setIsOpenSettings(false)} className="z-10 fixed inset-0 bg-black/25">
            <div onClick={(e) => e.stopPropagation()} className="bg-card border-bordo shadow-ombra w-full flex flex-col gap-8 justify-between p-4 md:w-150 h-100 z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 shadow-lg rounded-md">
              
              <div onClick={() => setIsOpenSettings(false)} className='text-icona absolute top-3 right-3 cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>

              </div>

              <h2 className='text-3xl font-semibold'>Impostazioni</h2>

              <div className="flex items-center gap-10">
                <label className="">
                  Modalità Scura
                </label>
                
                {/* Switch */}
                <label className="relative w-20 h-9 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 has-[:checked]:bg-gray-500 bg-gray-100">
                  
                  {/* Input invisibile (Peer) */}
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={isDark}
                    onChange={() => setIsDark(!isDark)} 
                  />

                  {/* Pallino (Reagisce allo stato del peer) */}
                  <div
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-yellow-400 shadow-sm transition-all duration-500 
                    peer-checked:translate-x-10 peer-checked:bg-gray-700 peer-checked:text-white peer-checked:rotate-360"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      { !isDark ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                      )}
                    </svg>

                  </div>

                </label>

              </div>

              <div className='mt-auto'>Accedi</div>

            </div>

          </div>
        }

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/calcolatorebmi" element={<PagBMI />} />
          <Route path="/contacalorie" element={<PagCalorie />} />

          <Route path="*" element={<h1>Error 404</h1>} />
        </Routes>

      </div>

    </Router>
  )
}

export default App
