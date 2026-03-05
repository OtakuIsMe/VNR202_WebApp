import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Context from './components/Context';
import Preparation from './components/Preparation';
import Revolution from './components/Revolution';
import Characteristics from './components/Characteristics';
import Significance from './components/Significance';
import Lessons from './components/Lessons';

function App() {
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
    </div>
  );
}

export default App;
