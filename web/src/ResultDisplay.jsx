// ResultDisplay.jsx
function ResultDisplay({ correctWooparoo, topWooparoos }) {
    return (
      <div class="my-4 p-4 border border-gray-200 rounded">
        <h3 class="text-lg font-bold">Correct Guess: {correctWooparoo.name}</h3>
        <h4 class="text-md font-bold mt-2">Top 5 Wooparoos</h4>
        <ul>
          {topWooparoos.map(wooparoo => (
            <li key={wooparoo.name}>{wooparoo.name} - Similarity: {wooparoo.similarity}</li>
          ))}
        </ul>
      </div>
    );
  }
  
export default ResultDisplay;
  