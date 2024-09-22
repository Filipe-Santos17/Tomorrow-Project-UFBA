import IComponent from "../interfaces/InterfaceComponent";

export default class cardPokemonComponent implements IComponent {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  render = () => {
    const { name } = this;

    return /*html*/ `
      <div class="card-pokemon">
        <div class="card-img">
          <img src="/assets/imgs/pokemons/${name}.png" alt="pokemon ${name} image">
        </div>
        <div class="card-info">
          <p class="text-title">${name}</p>
          <button class="inline-flex align-center justify-center p-3 bg-[#07e079] rounded h-12 font-bold text-sm cursor-pointer" name-pokemon="${name}">Escolher</button>
        </div>
      </div>
    `;
  };
}
