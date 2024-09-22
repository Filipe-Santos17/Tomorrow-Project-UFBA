import LinkBtnComponent from "../components/linkBtn";
import TitleStroke from "../components/titleStroke";

const ArenaScreen = () => /*html*/ `
  <section class="flex flex-col items-center justify-center" style="background: url('public/assets/imgs/arenas/bg-space.webp') top center">
    ${new TitleStroke("Chosse Arena").render()}
    <hgroup box-imgs class="grid grid-cols-4 grid-rows-3 w-[60%] gap-1"></hgroup>
    <div class="flex gap-4 mt-4">
      ${new LinkBtnComponent({ link: "/player", text: "Voltar" }).render()}
      <button class="inline-flex align-center justify-center p-3 rounded h-12 font-bold text-sm cursor-pointer" style="background-color: #D3373B" battle>
        Batalha
      </button>
    </div>
  </section>
`;

export default ArenaScreen;
