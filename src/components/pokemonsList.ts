import IComponent from "../interfaces/InterfaceComponent";

export default class PokemonListComponent implements IComponent {
  position: "left" | "right";
  
  constructor(pos: "left" | "right") {
    this.position = pos
  }

  render = () => {
    return /*html*/ `
      <div list-pk class="absolute bg-yellow-500 h-[60%] w-16 top-[20%] rounded flex flex-col items-center justify-between py-8" style="${this.position}: 0">
      </div>
    `;
  };
}
