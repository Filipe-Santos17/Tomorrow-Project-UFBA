import IComponent from "../interfaces/InterfaceComponent";

type InputComponentTypes = {
  textLabel: string;
  idInput: string;
  nameInput: string;
  typeInput: string;
  placeholder: string;
};

export default class InputComponent implements IComponent {
  textLabel: InputComponentTypes["textLabel"];
  idInput: InputComponentTypes["idInput"];
  nameInput: InputComponentTypes["nameInput"];
  typeInput: InputComponentTypes["typeInput"];
  placeholder: InputComponentTypes["placeholder"];

  constructor({ textLabel, idInput, nameInput, typeInput, placeholder}: InputComponentTypes) {
    this.textLabel = textLabel;
    this.idInput = idInput;
    this.nameInput = nameInput;
    this.typeInput = typeInput;
    this.placeholder = placeholder;
  }

  render = () => {
    const { textLabel, idInput, nameInput, typeInput, placeholder } = this;

    return /*html*/ `
      <div class="input-box">
        <label for="${idInput}">${textLabel}</label>
        <input placeholder="${placeholder}" class="input" id="${idInput}" name="${nameInput}" type="${typeInput}">
      </div>
    `;
  };
}
