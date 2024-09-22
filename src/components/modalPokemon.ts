import IComponent from "../interfaces/InterfaceComponent";

export default class modalPokemonComponent implements IComponent {
  constructor() {}

  render = () => {
    return /*html*/ `
      <div class="modal-container hidden">
        <div class="modal">
          <header class="flex items-center justify-between w-full pb-4">
            <h4 class="font-bold text-xl">Pokemon Lists</h4>
            <button class="text-white bg-black w-8 h-8 rounded-full cursor-pointer text-center border p-1 border-transparent" x-close>
              X
            </button>
          </header>
          <section id="content-modal" class="grid overflow-auto h-full w-full grid-cols-4 gap-4 gap-col-4 pb-8">
          </section>
        </div>
      </div>
    `;
  };
}
