"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BilleteraLogica = void 0;
const Billetera_1 = require("./Billetera");
class BilleteraLogica extends Billetera_1.Billetera {
    constructor(idWallet, NombreWallet, TipoWallet, Password, InversionInic, Monedas) {
        super(idWallet, NombreWallet, TipoWallet, Password, InversionInic, Monedas);
    }
    generatePassword(contraseña) {
        this.Password = Math.trunc(Math.random() * (9999 - 1111) + 1111) + "";
        console.log("Su contraseña generada es: " + this.Password);
        return this.Password;
    }
    mostrarCripto() {
        for (let a of this.Monedas) {
            a.say();
        }
    }
    enterPassword(contraseña) {
        if (contraseña != this.Password) {
            console.log("Contraseña incorrecta");
            return false;
        }
        else {
            return true;
        }
    }
}
exports.BilleteraLogica = BilleteraLogica;
function ParseString(arg0) {
    throw new Error("Function not implemented.");
}
