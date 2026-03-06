import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Context from './components/Context';
import Preparation from './components/Preparation';
import Revolution from './components/Revolution';
import Characteristics from './components/Characteristics';
import Significance from './components/Significance';
import Lessons from './components/Lessons';
import Debate from './components/Debate';
import MinigamePage from './pages/MinigamePage';

function getPage() {
  return window.location.hash === '#minigame' ? 'minigame' : 'home';
}

function App() {
  const [page, setPage] = useState(getPage);

  useEffect(() => {
    const onHash = () => setPage(getPage());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  if (page === 'minigame') {
    return <MinigamePage />;
  }

  return (
    <div className="w-full">
      <Navbar />
      <Hero />
      <Context />
      <Preparation />
      <Revolution />
      <Characteristics />
      <Significance />
      <Lessons />
      <Debate />
    </div>
  );
}

export default App;
