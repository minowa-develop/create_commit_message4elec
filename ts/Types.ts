
const JSON_FILE: string = "./typelist.json";

/**
 * repositoryとTypes(複数)を管理するクラス
 */
export class Types{
  // field
  private repository: string;
  private types: string[];

  public getRepository(): string{ return this.repository }
  public setRepository(repository: string): void{ this.repository = repository }
  public getTypes(): string[]{ return this.types }
  public setTypes(types: string[]): void{ this.types = types }

  constructor(repository: string){
    this.repository = repository;
    window.myAPI.readFile(JSON_FILE).then((plaintext: string) => {
      let objs: Types[] = JSON.parse(plaintext)
  
      objs.forEach((element: Types) => {
        if(element.repository === repository){
          this.types = element.getTypes();
        }
      });
    });
  }
}
