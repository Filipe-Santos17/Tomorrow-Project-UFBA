import { arenas } from "../../public/assets/arena.json";
import { typeArena } from "../interfaces/types";
import arenaImgComponent from "../components/arenaImg";
import Storage from "./Storage";

export default class PageArena {
  elementBg: HTMLElement;

  constructor() {
    this.elementBg = document.querySelector("#app > section")!;

    if (this.elementBg) {
      this.init();
    }
  }

  private insertArenas = () => {
    const boxImgs = document.querySelector("[box-imgs]");

    if (boxImgs) {
      arenas.forEach((arena: typeArena) =>
        boxImgs.insertAdjacentHTML(
          "beforeend",
          new arenaImgComponent(arena).render()
        )
      );

      this.addEvents();
    }
  };

  private addEvents = () => {
    const arenasOptions = document.querySelectorAll("[box-imgs] [arena]");

    arenasOptions.forEach((arena) =>
      arena.addEventListener("click", (e) =>
        this.handleClickSelectArena(e, arenasOptions)
      )
    );

    document
      .querySelector("[battle]")
      ?.addEventListener("click", this.saveDataPlayers);
  };

  private handleClickSelectArena = (e: Event, arenas: NodeListOf<Element>) => {
    const el = e.currentTarget as HTMLDivElement;
    arenas.forEach((arena) => arena.classList.remove("!border-green-500"));
    el.classList.add("!border-green-500");

    const imagePath = el.querySelector("img")!.src;
    this.changeBackgroundScreen(imagePath);
  };

  private changeBackgroundScreen = (name: string) => {
    this.elementBg.setAttribute(
      "style",
      `background: url('${name}') top center`
    );
  };

  private saveDataPlayers = () => {
    Storage.saveContent("data-arena", this.elementBg.getAttribute("style")!);
    location.href = "/batalha";
  };

  init() {
    this.insertArenas();
  }
}
