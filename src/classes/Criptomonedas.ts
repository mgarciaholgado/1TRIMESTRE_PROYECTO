export class Monedas {
  protected _id: number;
  protected Nombre: string;
  protected Siglas: string;
  protected qty: number;
  protected Token: number;
  protected Capitalizacion: number;

  constructor(_id: number, Nombre: string, Siglas: string, qty: number, Token: number, Capitalizacion: number) {
    this._id = _id;
    this.Nombre = Nombre;
    this.Siglas = Siglas;
    this.qty = qty
    this.Token = Token;
    this.Capitalizacion = Capitalizacion;
  }

  //
  // GETTERS
  //
  get getid() {
    return this._id;
  }

  get getNombre() {
    return this.Nombre;
  }


  get getToken() {
    return this.Token;
  }

  get getCapitalizacion() {
    return this.Capitalizacion;
  }

  get getSiglas() {
    return this.Siglas;
  }

  get getQty(){
    return this.qty
  }

  //
  // SETTERS
  //

  set setNombre(Nombre: string) {
    this.Nombre = Nombre;
  }

  set setToken(Token: number) {
    this.Token = Token;
  }

  set setCapitalizacion(Capitalizacion: number) {
    this.Capitalizacion = Capitalizacion;
  }

  set setSiglas(Siglas: string) {
    this.Siglas = Siglas;
  }

  setQty(Cantidad: number) {
    this.qty = Cantidad;
  }

  set setid(_id: number) {
    this._id = _id;
  }
  

  calculoValor(dinero: number) {
    let myValue = this.Token
    let resultado = dinero/myValue
    return resultado
  }

  sayCompra() {
    console.log("Nombre: "+this.Nombre+" | Siglas: "+this.Siglas+" | Cantidad de Tokens que tenemos: "+this.qty + this.Siglas+" | Precio Token: "+this.Token+"$"+" | Capitalizacion: "+this.Capitalizacion)
  }

  sayMercado() {
    console.log("Nombre: "+this.Nombre+" | Siglas: "+this.Siglas + " | Precio Token: "+this.Token+"$"+" | Capitalizacion: "+this.Capitalizacion)
  }
}
