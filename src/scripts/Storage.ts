export default class Storage {
  public static saveContent(name: string, data: string): void;
  public static saveContent(name: string, data: object): void;
  public static saveContent(name: string, data: any): void {
    if (typeof data === "string") {
      localStorage.setItem(name, data);
    }
    localStorage.setItem(name, JSON.stringify(data));
  }

  public static getContent(name: string) {
    return localStorage.getItem(name);
  }

  public static getContentObj(name: string) {
    return JSON.parse(localStorage.getItem(name)!);
  }

  public static deleteContent(name: string) {
    localStorage.removeItem(name);
  }
}