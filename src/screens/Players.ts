import modalPokemonComponent from "../components/modalPokemon";
import TitleStroke from "../components/titleStroke";
import LinkBtnComponent from "../components/linkBtn";
import CardPersonComponent from "../components/cardPerson";

const PlayersScreen = () => /*html*/ `
  <section class="bg-space flex flex-col items-center justify-center gap-8">
    ${new TitleStroke("Chosse Player").render()}
    <hgroup class="flex gap-8">
      ${new CardPersonComponent().render()}
      ${new CardPersonComponent().render()}
    </hgroup>
    <div class="flex gap-4">
      ${new LinkBtnComponent({ link: "/", text: "Voltar" }).render()}
      <button class="inline-flex align-center justify-center p-3 bg-[#07e079] rounded h-12 font-bold text-sm cursor-pointer" btn-next>Seguir</button>
    </div>
  </section>
  ${new modalPokemonComponent().render()}
`;

export default PlayersScreen;
