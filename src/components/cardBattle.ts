import IComponent from "../interfaces/InterfaceComponent";

export default class CardBattleComponent implements IComponent {
  
  constructor() {

  }

  render = () => {
    return /*html*/ `
      <div class="flex items-center justify-center">
        <hgroup id="current-pokemon" class="relative w-[300px] h-max rounded p-4 bg-card-battle">
          <img src="" alt="Pokemon" class="w-40 h-40 mx-auto" img-pokemon>
          <p class="text-center text-white font-bold mb-4" name-pokemon></p>
          <div class="w-[80%] h-2 bg-slate-800 mx-auto mb-4 rounded-lg">
            <div class="h-2 mb-4 rounded-lg bg-greenLife" style="width: 100%" life-pokemon></div>
          </div>
          <div class="flex flex-col items-center gap-4" atks-pokemon></div>
        </hgroup>
      </div>
    `;
  };
}
