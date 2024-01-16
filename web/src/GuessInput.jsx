import { createSignal } from 'solid-js';

function GuessInput(props) {
  const [guess, setGuess] = createSignal("");

  const submitGuess = () => {
    props.onGuess(guess());
    setGuess("");
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      submitGuess();
    }
  };

  return (
    <div class="flex items-center justify-center mt-4">
      <input 
        type="text" 
        class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
        placeholder="Enter Wooparoo name"
        value={guess()} 
        onInput={(e) => setGuess(e.target.value)}
        onKeyDown={handleKeyPress} 
      />
      <button 
        class="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={submitGuess}>
        Guess
      </button>
    </div>
  );
}

export default GuessInput; // Make sure to export the component as the default export
