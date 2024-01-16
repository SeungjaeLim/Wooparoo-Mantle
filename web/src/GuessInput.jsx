import { createSignal, createEffect, For } from 'solid-js';
import wooparooNames from './wooparooNames';

function GuessInput(props) {
  const [guess, setGuess] = createSignal("");
  const [suggestions, setSuggestions] = createSignal([]);
  const [guessedWooparoos, setGuessedWooparoos] = createSignal([]);

  const submitGuess = () => {
    const currentGuess = guess().trim();

    // Check if the guess is in the list of Wooparoo names
    if (!wooparooNames.includes(currentGuess)) {
      alert("Invalid guess. Please guess a valid Wooparoo name.");
      return;
    }

    // Check if the guess has already been made
    if (guessedWooparoos().includes(currentGuess)) {
      alert("You have already guessed this Wooparoo. Try a different one.");
      setGuess("");  // Clear the guess input
      return;
    }

    // Add the guess to the list of guessed Wooparoos
    setGuessedWooparoos(prev => [...prev, currentGuess]);

    // Rest of the submit logic
    props.onGuess(currentGuess);
    setGuess("");  // Clear the guess input
    setSuggestions([]);  // Clear suggestions
  };

  const updateSuggestions = (inputText) => {
    if (inputText.length > 0) {
      const filteredSuggestions = wooparooNames.filter(name =>
        name.toLowerCase().includes(inputText.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  createEffect(() => {
    updateSuggestions(guess());
  });

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      submitGuess();
    }
  };

  return (
    <div class="flex flex-col items-start justify-center mt-4 w-full">
      <div class="flex w-full">
        <input 
          type="text" 
          class="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-300 transition duration-300 flex-grow"
          placeholder="Enter Wooparoo name"
          value={guess()} 
          onInput={(e) => setGuess(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button 
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md focus:outline-none focus:shadow-outline"
          onClick={submitGuess}>
          Guess
        </button>
      </div>
      {suggestions().length > 0 && (
        <ul class="list-none bg-white border border-gray-300 rounded-md mt-1 w-full max-h-60 overflow-auto">
          <For each={suggestions()}>
            {(suggestion) => (
              <li 
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
                onClick={() => setGuess(suggestion)}
              >
                {suggestion}
              </li>
            )}
          </For>
        </ul>
      )}
    </div>
  );
}

export default GuessInput;
