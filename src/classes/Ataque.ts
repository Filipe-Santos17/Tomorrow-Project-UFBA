import { typeAttackPk } from "../interfaces/types";

export default class Ataque {
  private name: typeAttackPk["name"];
  private damage: typeAttackPk["damage"];

  constructor({ name, damage }: typeAttackPk) {
    this.name = name;
    this.damage = damage;
  }

  getNameAttack() {
    return this.name;
  }

  getValueAttack() {
    return this.damage;
  }

  setValueAttack(newDamageValue: number) {
    if (typeof newDamageValue !== "number") {
      throw new Error("Damage Value need to be a Number!");
    }

    this.damage = newDamageValue;
  }
}
