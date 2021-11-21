"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuarios = void 0;
class Usuarios {
    constructor(idUser, Nombre, Password, DNI, Telefono, Billeteras) {
        this.idUser = idUser;
        this.Nombre = Nombre;
        this.Password = Password;
        this.DNI = DNI;
        this.Telefono = Telefono;
        this.Billeteras = Billeteras;
    }
    //
    // GETTERS
    //
    get getidUser() {
        return this.idUser;
    }
    get getNombre() {
        return this.Nombre;
    }
    get getPassword() {
        return this.Password;
    }
    get getDNI() {
        return this.DNI;
    }
    get getTelefono() {
        return this.Telefono;
    }
    get getBilletera() {
        return this.Billeteras;
    }
    //
    // SETTERS
    //
    set setidUser(idUser) {
        this.idUser = idUser;
    }
    set setNombre(Nombre) {
        this.Nombre = Nombre;
    }
    set setPassword(Password) {
        this.Password = Password;
    }
    set setDNI(DNI) {
        this.DNI = DNI;
    }
    set setTelefono(Telefono) {
        this.Telefono = Telefono;
    }
    listarBilleteras() {
        for (let a of this.Billeteras) {
            console.log("Id Billetera: " +
                a.getidWallet +
                " | Nombre Billetera: " +
                a.getNombreWallet +
                " | Tipo billetera: " +
                a.getTipoWallet);
        }
    }
    buscarBilletera(name) {
        for (let a of this.Billeteras) {
            if (name == a.getNombreWallet) {
                return a;
            }
        }
    }
    existBilletera(name) {
        for (let a of this.Billeteras) {
            if (name == a.NombreWallet) {
                return true;
            }
        }
        return false;
    }
    generatePassword(miBilletera, contraseña) {
        miBilletera.generatePassword(contraseña);
    }
    mostrarBilletera(name) {
        for (let a of this.Billeteras) {
            if (name == a.getNombreWallet) {
                console.log("Id Billetera: " + a.getidWallet + " | Nombre Billetera: " + a.getNombreWallet + " | Tipo billetera: " + a.getTipoWallet + " | Monedas: " + a.getMonedas);
            }
        }
    }
    eliminarBilletera(name) {
        for (let a of this.Billeteras) {
            if (name == a.getNombreWallet) {
                this.Billeteras.splice(this.Billeteras.indexOf(a), 1);
            }
        }
    }
    agregarBilletera(wallet) {
        this.Billeteras.push(wallet);
    }
}
exports.Usuarios = Usuarios;
