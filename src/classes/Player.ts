import Pokemon from "./Pokemon";

export default class Player {
  private name: string;
  pokedex: Pokemon[];
  pokemonSelected: Pokemon;

  constructor({ name, pokemons }: { name: string; pokemons: Pokemon[] }) {
    this.name = name;
    this.pokedex = pokemons;
    this.pokemonSelected = pokemons[0];
  }

  getName() {
    return this.name;
  }

  setName(newName: string) {
    this.name = `${newName}`;
  }

  talkAboutYourself() {
    return `Meu nome é ${this.getName()}!`;
  }

  getPokemonSelected() {
    return this.pokemonSelected;
  }

  changePokemonSelected(i: number) {
    if (typeof i === "number" && i >= 0 && i <= 5) {
      this.pokemonSelected = this.pokedex[i];
    }
  }

  getPokemons() {
    return this.pokedex;
  }
}
