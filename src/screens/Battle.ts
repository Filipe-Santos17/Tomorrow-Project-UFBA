import CardBattleComponent from "../components/cardBattle";
import PokemonListComponent from "../components/pokemonsList";

const BattleScreen = () => /*html */ `
  <section class="w-full h-full grid grid-cols-2 gap-4" change-bg>
    ${new PokemonListComponent("left").render()}
    ${new CardBattleComponent().render()}
    ${new CardBattleComponent().render()}
    ${new PokemonListComponent("right").render()}
  </section>
`;

export default BattleScreen;
