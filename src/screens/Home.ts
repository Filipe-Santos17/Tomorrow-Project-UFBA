import LinkBtnComponent from "../components/linkBtn";
import TitleStroke from "../components/titleStroke";

const HomeScreen = () => /*html*/ `
  <section class="bg-space">
    <main class="flex flex-col items-center justify-center h-full gap-6">
      <img src="/assets/imgs/name-pokemon.png" alt="Name Pokemon">
      ${new TitleStroke("Game Battle").render()}
      <section class="flex flex-col gap-4">
        ${new LinkBtnComponent({ text: "1 Player", link: "/player" }).render()}
        ${new LinkBtnComponent({ text: "2 Players", link: "/players" }).render()}
      </section>
    </main>
  </section>
`;

export default HomeScreen;