import IComponent from "../interfaces/InterfaceComponent";

export default class btnPokemonComponent implements IComponent {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  render = () => {
    return /*html*/ `
      <div class="flex items-center bg-white border-2 border-black h-14 w-full rounded cursor-pointer   hover:bg-slate-300 hover:border-white" data-btn-pokemon id="${this.id}">
        <div class="h-full bg-black w-8 h-full">
          <img src="assets/imgs/icone-question.png" alt="pokemon" class="w-full h-full">
        </div>
        <p class="ml-6">?????</p>
      </div>
    `;
  };
}
