import React from 'react';
import Navbar from './components/Navbar';
import FloatingCTA from './components/FloatingCTA';
import Hero from './sections/Hero';
import About from './sections/About';
import ProjectHighlights from './sections/ProjectHighlights';
import Amenities from './sections/Amenities';
import Location from './sections/Location';
import FloorPlans from './sections/FloorPlans';
import Enquiry from './sections/Enquiry';
import Footer from './sections/Footer';

export default function App() {
  return (
    <div className="App relative overflow-x-hidden">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Floating & Sticky CTAs */}
      <FloatingCTA />

      {/* Main Sections */}
      <main>
        <Hero />
        <About />
        <ProjectHighlights />
        <Amenities />
        <Location />
        <FloorPlans />
        <Enquiry />
      </main>

      <Footer />
    </div>
  );
}
