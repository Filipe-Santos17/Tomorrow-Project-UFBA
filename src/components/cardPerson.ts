import IComponent from "../interfaces/InterfaceComponent";
import InputComponent from "./input";

export default class CardPersonComponent implements IComponent {
  constructor() {}

  render = () => {
    const inputName = {
      textLabel: "Nome:",
      idInput: "nome",
      nameInput: "nome",
      typeInput: "text",
      placeholder: "Informe seu nome...",
    };

    return /*html*/ `
      <div class="card-person">
        <div class="h-52 grid gap-2 items-center" style="grid-template-columns: 3fr 1fr;">
          <img src="assets/imgs/personagens/person-boy-blue.png" alt="Personagem Masculino" class="w-full h-[220px]">
          <div>
            <div>
              <input type="radio" name="sexo" id="sex-masc" value="masculino">
              <label for="sex-masc" class="text-white">Masculino</label>
            </div>
            <div>
              <input type="radio" name="sexo" id="sex-femi" value="feminino">
              <label for="sex-femi" class="text-white">Feminino</label>
            </div>
          </div>
        </div>
        ${new InputComponent(inputName).render()}
        <div class="flex flex-col itens-start gap-2 mt-2 w-full">
          <h4 class="text-white">Pokemons:</h4>
          <hgroup buttons-box class="grid grid-cols-3 grid-rows-2 gap-4">
          </hgroup>
        </div>
      </div>
    `;
  };
}
