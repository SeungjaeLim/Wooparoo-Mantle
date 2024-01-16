import { createSignal } from 'solid-js';
import WooparooDetails from './WooparooDetails'; // Import WooparooDetails

function WooparooList(props) {
  const [expandedWooparoos, setExpandedWooparoos] = createSignal([]);

  const toggleDetails = (wooparoo) => {
    setExpandedWooparoos((prevExpandedWooparoos) => {
      if (prevExpandedWooparoos.includes(wooparoo)) {
        return prevExpandedWooparoos.filter((item) => item !== wooparoo); // Collapse if already expanded
      } else {
        return [...prevExpandedWooparoos, wooparoo]; // Expand if not expanded
      }
    });
  };

  return (
    <div class="overflow-x-auto mt-6">
      <table class="min-w-full leading-normal">
        <thead>
          <tr class="bg-green-500 text-white">
            <th class="px-5 py-3 border-b-2 border-gray-200">#</th>
            <th class="px-5 py-3 border-b-2 border-gray-200">Name</th>
            <th class="px-5 py-3 border-b-2 border-gray-200">Similarity</th>
            <th class="px-5 py-3 border-b-2 border-gray-200">Ranking</th>
          </tr>
        </thead>
        <tbody>
          <For each={props.wooparoos}>
            {(wooparoo, index) => (
              <>
                <tr class="hover:bg-gray-100" onClick={() => toggleDetails(wooparoo)}>
                  <td class="px-5 py-5 border-b border-gray-200">{index() + 1}</td>
                  <td class="px-5 py-5 border-b border-gray-200">{wooparoo.name}</td>
                  <td class="px-5 py-5 border-b border-gray-200">{wooparoo.similarity}</td>
                  <td class="px-5 py-5 border-b border-gray-200">
                    {/* Ranking Logic Here */}
                  </td>
                </tr>
                {expandedWooparoos().includes(wooparoo) && (
                  <tr>
                    <td colspan="4">
                      <WooparooDetails wooparoo={wooparoo} />
                    </td>
                  </tr>
                )}
              </>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
}

export default WooparooList;
