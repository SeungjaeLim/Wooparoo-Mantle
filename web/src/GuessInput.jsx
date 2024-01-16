import { createSignal, createEffect, For, onMount } from 'solid-js';

function GuessInput(props) {
  const [guess, setGuess] = createSignal("");
  const [suggestions, setSuggestions] = createSignal([]);
  const [allWooparooNames, setAllWooparooNames] = createSignal([]);

  const loadWooparooNames = async () => {
    try {
      const response = await fetch('/wooparoo.txt');
      const text = await response.text();
      const namesArray = text.split('\n').map(name => name.trim().replace(/\r$/, ''));
      setAllWooparooNames(namesArray);
      console.log("Loaded Wooparoo names:", namesArray);
    } catch (error) {
      console.error("Failed to load Wooparoo names:", error);
    }
  };

  onMount(() => {
    loadWooparooNames();
  });

  const submitGuess = () => {
    props.onGuess(guess());
    setGuess("");
    setSuggestions([]); // Clear suggestions after submitting
  };

  const updateSuggestions = (inputText) => {
    if (inputText.length > 0) {
      const names = allWooparooNames();  // Treat it as a function call
      if (Array.isArray(names)) {
        const filteredSuggestions = names.filter(name =>
          name.toLowerCase().includes(inputText.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      }
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
          style="min-width: 75px;" // Adjust the width as needed
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
                onClick={() => { setGuess(suggestion); submitGuess(); }}
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
