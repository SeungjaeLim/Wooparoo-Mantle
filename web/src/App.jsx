import { createSignal, For } from 'solid-js';
import GuessInput from './GuessInput';
import WooparooList from './WooparooList';
import WooparooDetails from './WooparooDetails';
import './style.css';

function App() {
  const [wooparoos, setWooparoos] = createSignal([]);
  const [selectedWooparoo, setSelectedWooparoo] = createSignal(null);

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
  };

  const handleWooparooSelect = (wooparoo) => {
    setSelectedWooparoo(wooparoo);
  };

  return (
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold text-center">WooparooMantle</h1>
      <p class="text-center"># of Quizzes: {/* Display random number here */}</p>
      <GuessInput onGuess={handleGuess} />
      <WooparooList wooparoos={wooparoos()} onSelect={handleWooparooSelect} />
      {selectedWooparoo() && <WooparooDetails wooparoo={selectedWooparoo()} />}
    </div>
  );
}

export default App;
