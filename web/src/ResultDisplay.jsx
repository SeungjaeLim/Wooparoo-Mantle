// ResultDisplay.jsx
function ResultDisplay({ correctWooparoo, topWooparoos }) {
    return (
      <div class="bg-blue-100 border border-blue-300 rounded p-4 mt-4 shadow">
        <h3 class="text-lg font-bold text-blue-800">Correct Guess: {correctWooparoo.name}</h3>
        <h4 class="text-md font-semibold mt-2">Top 5 Wooparoos</h4>
        <ul class="list-disc list-inside mt-2">
          {topWooparoos.map(wooparoo => (
            <li key={wooparoo.name} class="text-gray-700 py-1">{wooparoo.name} - Similarity: {wooparoo.similarity}</li>
          ))}
        </ul>
      </div>
    );
  }
  
export default ResultDisplay;
  