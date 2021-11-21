"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Billetera = void 0;
class Billetera {
    constructor(idWallet, NombreWallet, TipoWallet, Password, InversionInic, Monedas) {
        this.idWallet = idWallet;
        this.NombreWallet = NombreWallet;
        this.TipoWallet = TipoWallet;
        this.Monedas = Monedas;
        this.InversionInic = InversionInic;
        this.Password = Password;
    }
    //
    // GETTERS
    //
    get getidWallet() {
        return this.idWallet;
    }
    get getNombreWallet() {
        return this.NombreWallet;
    }
    get getTipoWallet() {
        return this.TipoWallet;
    }
    get getMonedas() {
        if (this.Monedas.length == 0) {
            return "No tenemos monedas";
        }
        else {
            return this.Monedas;
        }
    }
    get getPassword() {
        return this.Password;
    }
    enterPassword(contraseña) {
        return true;
    }
    agregarCriptomoneda(Moneda) {
        this.Monedas.push(Moneda);
    }
    quitarCriptomoneda(Moneda) {
        this.Monedas.splice(this.Monedas.indexOf(Moneda), 1);
    }
    buscarCriptomoneda(Siglas) {
        for (let a of this.Monedas) {
            if (a.getSiglas == Siglas) {
                return a;
            }
        }
    }
    existCriptomoneda(Siglas) {
        let value = false;
        for (let a of this.Monedas) {
            if (a.getSiglas == Siglas) {
                value = true;
            }
        }
        return value;
    }
    generatePassword(contraseña) {
        this.Password = "";
        return this.Password;
    }
    get getInversionInic() {
        return this.InversionInic;
    }
    //
    // SETTERS
    //
    set setidWallet(idWallet) {
        this.idWallet = idWallet;
    }
    set setNombreWallet(NombreWallet) {
        this.NombreWallet = NombreWallet;
    }
    set setTipoWallet(TipoWallet) {
        this.TipoWallet = TipoWallet;
    }
    set setMonedas(Monedas) {
        this.Monedas = Monedas;
    }
    set setInversionInic(InversionInic) {
        this.InversionInic = InversionInic;
    }
    general() {
        console.log("Id de Billetera: " + this.idWallet + ", Nombre Billetera: " + this.getNombreWallet);
    }
    mostrarCripto() {
        for (let a of this.Monedas) {
            a.sayMercado();
        }
    }
}
exports.Billetera = Billetera;
