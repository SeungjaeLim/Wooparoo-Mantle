function WooparooDetails({ wooparoo }) {
  return (
    <div class="mt-4 p-4 border border-gray-200 rounded shadow-lg bg-white">
      <h3 class="text-lg font-bold text-blue-700 mb-3">{wooparoo.name}</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <p><span class="font-semibold">Category:</span> {wooparoo.data.category}</p>
        <p><span class="font-semibold">Type 1:</span> {wooparoo.data.type1}</p>
        <p><span class="font-semibold">Type 2:</span> {wooparoo.data.type2}</p>
        <p><span class="font-semibold">Type 3:</span> {wooparoo.data.type3}</p>
        <p><span class="font-semibold">Level 1 Attack:</span> {wooparoo.data.level1Attack}</p>
        <p><span class="font-semibold">Level 1 Health:</span> {wooparoo.data.level1Health}</p>
        <p><span class="font-semibold">Level 1 Mana Ball Yield:</span> {wooparoo.data.level1ManaBallYield}</p>
        <p><span class="font-semibold">Skill 1 Damage:</span> {wooparoo.data.skill1Damage}</p>
        <p><span class="font-semibold">Skill 2 Damage:</span> {wooparoo.data.skill2Damage}</p>
        <p><span class="font-semibold">Skill 3 Damage:</span> {wooparoo.data.skill3Damage}</p>
        <p><span class="font-semibold">Skill 4 Damage:</span> {wooparoo.data.skill4Damage}</p>
        {/* ... More fields as needed */}
      </div>
    </div>
  );
}

export default WooparooDetails;
