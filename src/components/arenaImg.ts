import IComponent from "../interfaces/InterfaceComponent";
import { typeArena } from "../interfaces/types";

export default class arenaImgComponent implements IComponent {
  private arenaInfo: typeArena;

  constructor(arenaInfo: typeArena) {
    this.arenaInfo = arenaInfo;
  }

  render = () => {
    const { imgUrl, name } = this.arenaInfo;

    return /*html*/ `
      <section class="cursor-pointer border-2 border-transparent hover:border-red-500" arena>
        <img src="/assets/imgs/arenas/${imgUrl}" alt="${name}">
        <h3 class="text-white text-center">${name}</h3>
      </section>
    `;
  };
}
