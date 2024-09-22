import { typePokemon } from "../interfaces/types";
import Ataque from "./Ataque";

export default class Pokemon {
  private namePokemon: typePokemon["name"];
  private typePokemon: typePokemon["type"];
  private lifePokemon: typePokemon["life"];
  private defensePokemon: typePokemon["dfns"];
  private speedPokemon: typePokemon["speed"];
  private attacks: Ataque[]; //typePokemon["attacks"]
  private maxNumAttacks: number;

  constructor(dataObj: typePokemon) {
    this.namePokemon = dataObj.name;
    this.typePokemon = dataObj.type;
    this.lifePokemon = 100;
    this.defensePokemon = dataObj.dfns;
    this.speedPokemon = dataObj.speed;

    const listOfAttacks = dataObj.attacks.map((attack) => new Ataque(attack));

    this.attacks = listOfAttacks;
    this.maxNumAttacks = 4;
  }

  getNamePokemon() {
    return this.namePokemon;
  }

  getTypePokemon() {
    return this.typePokemon;
  }

  /*Life*/
  getLifePokemon() {
    return this.lifePokemon;
  }

  setLifePokemon(newLife: number) {
    this.lifePokemon = newLife;
  }

  getDefensePokemon() {
    return this.defensePokemon;
  }

  getSpeedPokemon() {
    return this.speedPokemon;
  }

  private isValidIndexAttack(idAttack: number | undefined) {
    if (typeof idAttack === "number") {
      if (idAttack <= this.maxNumAttacks - 1 && idAttack >= 0) {
        return idAttack;
      }

      return false;
    }

    return false;
  }

  getAttacks = (numAttack?: number) => {
    if (this.isValidIndexAttack(numAttack)) {
      return this.attacks[numAttack!].getValueAttack();
    }

    return this.attacks;
  };
}
