
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 h-screen flex justify-center items-center">
      <motion.h1 className="text-5xl font-bold text-gold">Élégance Drive</motion.h1>
    </div>
  );
}

function AdminPanel() {
  const [headline, setHeadline] = useState("Lyxig transportupplevelse i världsklass");

  return (
    <div className="bg-black text-white p-6">
      <h2 className="text-3xl font-bold">Admin Panel</h2>
      <input 
        className="p-2 mt-4 bg-gray-800 text-white" 
        type="text" 
        value={headline} 
        onChange={(e) => setHeadline(e.target.value)} 
      />
    </div>
  );
}

function Booking() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('https://formspree.io/f/mblgznnz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setSubmitted(true);
  };

  return (
    <div className="bg-black text-white p-6">
      <h2 className="text-3xl font-bold">Boka din resa</h2>
      {submitted ? (
        <p className="text-green-400">Tack för din bokning!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
            placeholder="Namn"
            required
            className="p-2 mt-4 bg-gray-800 text-white"
          />
          <input
            name="email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            value={formData.email}
            type="email"
            placeholder="E-post"
            required
            className="p-2 mt-4 bg-gray-800 text-white"
          />
          <textarea
            name="message"
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            value={formData.message}
            placeholder="Meddelande"
            required
            className="p-2 mt-4 bg-gray-800 text-white"
          ></textarea>
          <button type="submit" className="bg-gold text-black px-6 py-2 mt-4">Skicka</button>
        </form>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </Router>
  );
}
