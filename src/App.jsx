import { Routes, Route } from 'react-router-dom';
import './App.css'

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dish from './pages/Dish';
import ErrorPage from './pages/Error';
import Contact from './pages/Contact';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dish/:slug" element={<Dish />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App;
