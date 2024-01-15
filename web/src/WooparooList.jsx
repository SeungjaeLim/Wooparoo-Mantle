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
    <div>
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Similarity</th>
            <th>Ranking</th>
          </tr>
        </thead>
        <tbody>
          <For each={props.wooparoos}>
            {(wooparoo, index) => (
              <>
                <tr class="cursor-pointer" onClick={() => toggleDetails(wooparoo)}>
                  <td>{index + 1}</td>
                  <td>{wooparoo.name}</td>
                  <td>{wooparoo.similarity}</td>
                  <td>{/* Ranking Logic Here */}</td>
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
