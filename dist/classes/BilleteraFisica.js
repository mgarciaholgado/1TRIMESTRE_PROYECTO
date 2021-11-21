"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BilleteraFisica = void 0;
const Billetera_1 = require("./Billetera");
class BilleteraFisica extends Billetera_1.Billetera {
    constructor(idWallet, NombreWallet, TipoWallet, Password, InversionInic, Monedas, Intentos) {
        super(idWallet, NombreWallet, TipoWallet, Password, InversionInic, Monedas);
        this.Intentos = Intentos;
    }
    generatePassword(contraseña) {
        this.Password = contraseña;
        return this.Password;
    }
    mostrarCripto() {
        for (let a of this.Monedas) {
            a.say();
        }
    }
    enterPassword(contraseña) {
        if (this.Intentos == 0) {
            console.log("Procediendo a eliminar datos de cuenta");
        }
        if (contraseña != this.Password) {
            this.Intentos--;
            console.log("Contraseña incorrecta, te quedan " + this.Intentos + " intentos");
            return false;
        }
        else {
            this.Intentos = 10;
            return true;
        }
    }
}
exports.BilleteraFisica = BilleteraFisica;
