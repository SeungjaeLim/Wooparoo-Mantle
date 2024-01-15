function WooparooDetails({ wooparoo }) {
    return (
      <div class="mt-4 p-4 border border-gray-200 rounded">
        <h3 class="text-lg font-bold">{wooparoo.name}</h3>
<div class="grid grid-cols-2 gap-4">
<p>Category: {wooparoo.data.category}</p>
<p>Type 1: {wooparoo.data.type1}</p>
<p>Type 2: {wooparoo.data.type2}</p>
<p>Type 3: {wooparoo.data.type3}</p>
<p>Level 1 Attack: {wooparoo.data.level1Attack}</p>
<p>Level 1 Health: {wooparoo.data.level1Health}</p>
<p>Level 1 Mana Ball Yield: {wooparoo.data.level1ManaBallYield}</p>
<p>Skill 1 Damage: {wooparoo.data.skill1Damage}</p>
<p>Skill 2 Damage: {wooparoo.data.skill2Damage}</p>
<p>Skill 3 Damage: {wooparoo.data.skill3Damage}</p>
<p>Skill 4 Damage: {wooparoo.data.skill4Damage}</p>
{/* ... More fields as needed */}
</div>
</div>
);
}

export default WooparooDetails;
