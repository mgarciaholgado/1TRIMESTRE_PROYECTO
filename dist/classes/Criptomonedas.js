"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monedas = void 0;
class Monedas {
    constructor(_id, Nombre, Siglas, qty, Token, Capitalizacion) {
        this._id = _id;
        this.Nombre = Nombre;
        this.Siglas = Siglas;
        this.qty = qty;
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
    get getQty() {
        return this.qty;
    }
    //
    // SETTERS
    //
    set setNombre(Nombre) {
        this.Nombre = Nombre;
    }
    set setToken(Token) {
        this.Token = Token;
    }
    set setCapitalizacion(Capitalizacion) {
        this.Capitalizacion = Capitalizacion;
    }
    set setSiglas(Siglas) {
        this.Siglas = Siglas;
    }
    setQty(Cantidad) {
        this.qty = Cantidad;
    }
    set setid(_id) {
        this._id = _id;
    }
    calculoValor(dinero) {
        let myValue = this.Token;
        let resultado = dinero / myValue;
        return resultado;
    }
    sayCompra() {
        console.log("Nombre: " + this.Nombre + " | Siglas: " + this.Siglas + " | Cantidad de Tokens que tenemos: " + this.qty + this.Siglas + " | Precio Token: " + this.Token + "$" + " | Capitalizacion: " + this.Capitalizacion);
    }
    sayMercado() {
        console.log("Nombre: " + this.Nombre + " | Siglas: " + this.Siglas + " | Precio Token: " + this.Token + "$" + " | Capitalizacion: " + this.Capitalizacion);
    }
}
exports.Monedas = Monedas;
