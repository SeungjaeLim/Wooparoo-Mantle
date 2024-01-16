import { createSignal, For } from 'solid-js';
import GuessInput from './GuessInput';
import WooparooList from './WooparooList';
import WooparooDetails from './WooparooDetails';
import ResultDisplay from './ResultDisplay'; 
import './style.css';

function App() {
  const [wooparoos, setWooparoos] = createSignal([]);
  const [selectedWooparoo, setSelectedWooparoo] = createSignal(null);
  const [isCorrectGuess, setIsCorrectGuess] = createSignal(false);
  const [topWooparoos, setTopWooparoos] = createSignal([]);

  const handleGuess = (guess) => {
    // Generate random data for the new Wooparoo
    const randomData = {
      category: Math.floor(Math.random() * 100),
      type1: Math.floor(Math.random() * 100),
      type2: Math.floor(Math.random() * 100),
      type3: Math.floor(Math.random() * 100),
      level1Attack: Math.floor(Math.random() * 100),
      level1Health: Math.floor(Math.random() * 100),
      level1ManaBallYield: Math.floor(Math.random() * 100),
      skill1Damage: Math.floor(Math.random() * 100),
      skill2Damage: Math.floor(Math.random() * 100),
      skill3Damage: Math.floor(Math.random() * 100),
      skill4Damage: Math.floor(Math.random() * 100),
      // ... add more fields as needed
      
    };

    // Calculate similarity (for now, just summing up the random values)
    const similarity = Object.values(randomData).reduce((acc, value) => acc + value, 0);

    const newWooparoo = { name: guess, data: randomData, similarity: similarity };
    setWooparoos((prevWooparoos) => {
      const updatedWooparoos = [...prevWooparoos, newWooparoo];
      return updatedWooparoos.sort((a, b) => b.similarity - a.similarity);
    });

    if (guess === "a") {
      setIsCorrectGuess(true);
      // Fetch top 5 Wooparoos from the backend and set them
      // For now, let's just use dummy data
      setTopWooparoos([
        // ... top 5 Wooparoos
        { name: 'Wooparoo1', similarity: 98, category: 'Fire', type1: 'Flame', type2: 'Spark' },
        { name: 'Wooparoo2', similarity: 96, category: 'Water', type1: 'Wave', type2: 'Bubble' },
        { name: 'Wooparoo3', similarity: 93, category: 'Earth', type1: 'Rock', type2: 'Dust' },
        { name: 'Wooparoo4', similarity: 92, category: 'Air', type1: 'Wind', type2: 'Storm' },
        { name: 'Wooparoo5', similarity: 90, category: 'Magic', type1: 'Mystic', type2: 'Spell' }
      ]);
    } else {
      setIsCorrectGuess(false);
    }
  };

  const handleWooparooSelect = (wooparoo) => {
    setSelectedWooparoo(wooparoo);
  };

  return (
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold text-center">WooparooMantle</h1>
      <p class="text-center"># of Quizzes: {/* Display random number here */}</p>
      <GuessInput onGuess={handleGuess} />
      {isCorrectGuess() && (
        <ResultDisplay 
          correctWooparoo={wooparoos()[0]}
          topWooparoos={topWooparoos()} 
        />
      )}
      <WooparooList wooparoos={wooparoos()} onSelect={handleWooparooSelect} />
      {selectedWooparoo() && <WooparooDetails wooparoo={selectedWooparoo()} />}
    </div>
  );
}

export default App;
