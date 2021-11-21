"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remover = void 0;
const menu_1 = require("./view/menu");
const mainMenu_1 = require("./view/mainMenu");
const entrada_1 = require("./view/entrada");
const database_1 = require("./database/database");
const usuarios_1 = require("./schemas/usuarios");
const Usuarios_1 = require("./classes/Usuarios");
const Criptomonedas_1 = require("./classes/Criptomonedas");
const Billetera_1 = require("./classes/Billetera");
const criptomonedas_1 = require("./schemas/criptomonedas");
const BilleteraLogica_1 = require("./classes/BilleteraLogica");
const BilleteraFisica_1 = require("./classes/BilleteraFisica");
const menuCripto_1 = require("./view/menuCripto");
let CriptomonedasArray = new Array();
CriptomonedasArray[0] = new Criptomonedas_1.Monedas(0, "Bitcoin", "BTC", 0, 59047, 444246);
CriptomonedasArray[1] = new Criptomonedas_1.Monedas(1, "Ethereum", "ETH", 0, 4367, 3264769);
CriptomonedasArray[2] = new Criptomonedas_1.Monedas(2, "Binance Coin", "BNB", 0, 589, 3711898);
CriptomonedasArray[3] = new Criptomonedas_1.Monedas(3, "Solana", "SOL", 0, 228, 7755230);
CriptomonedasArray[4] = new Criptomonedas_1.Monedas(4, "Polkadot", "DOT", 0, 41, 24567115);
let dSchemaBilletera = {
    _idWallet: null,
    NombreWallet: null,
    TipoWallet: null,
    Password: null,
    Monedas: [],
    InversionInic: null,
};
let dSchemaUsuario = {
    _idUser: null,
    Nombre: null,
    Password: null,
    DNI: null,
    Telefono: null,
    Billeteras: [],
};
let salvar = () => __awaiter(void 0, void 0, void 0, function* () {
    let oSchema;
    let dSchemaCriptomoneda = {
        _id: null,
        Nombre: null,
        Siglas: null,
        qty: null,
        Token: null,
        Capitalizacion: null,
    };
    for (let a of CriptomonedasArray) {
        dSchemaCriptomoneda._id = a.getid;
        dSchemaCriptomoneda.Nombre = a.getNombre;
        dSchemaCriptomoneda.Siglas = a.getSiglas;
        dSchemaCriptomoneda.qty = a.getQty;
        dSchemaCriptomoneda.Token = a.getToken;
        dSchemaCriptomoneda.Capitalizacion = a.getCapitalizacion;
        oSchema = new criptomonedas_1.CriptomonedasDB(dSchemaCriptomoneda);
        yield oSchema.save();
    }
});
///  METODO LOGIN
const login = () => __awaiter(void 0, void 0, void 0, function* () {
    console.clear();
    console.log("-- Inicio de sesion MikeCoinMarket --");
    yield database_1.db.conectarBD();
    const user = yield (0, entrada_1.leerTeclado)("\nUsuario");
    const pass = yield (0, entrada_1.leerTeclado)("Contraseña");
    const query = yield usuarios_1.UsuariosDB.find({});
    for (let a of query) {
        if (a.Nombre == user && a.Password == pass) {
            let miUsuario = new Usuarios_1.Usuarios(a.idUser, a.Nombre, a.Password, a.DNI, a.Telefono, a.Billeteras);
            let x;
            do {
                console.clear();
                x = yield (0, mainMenu_1.menuMain)();
                switch (x) {
                    // Crear una billetera
                    case 1:
                        let miBilletera = yield crearBilletera(miUsuario);
                        yield miUsuario.agregarBilletera(miBilletera);
                        break;
                    // Listar billetera
                    case 2:
                        yield listarBilleras(miUsuario);
                        break;
                    // Buscar billetera
                    case 3:
                        yield mostrarWallet(miUsuario);
                        break;
                    // Eliminar Billetera
                    case 4:
                        yield eliminarBilletera(miUsuario);
                        break;
                    // Acceder a la billetera
                    case 5:
                        yield accederBilletera(miUsuario);
                        break;
                    default:
                        console.log("Opcion no valida");
                        break;
                }
                yield (0, entrada_1.leerTeclado)("\nPulse Enter para continuar");
            } while (x != 6);
        }
    }
});
const criptoBrocker = (miBilletera, miUsuario) => __awaiter(void 0, void 0, void 0, function* () {
    let x;
    do {
        console.clear();
        x = yield (0, menuCripto_1.menuCripto)();
        switch (x) {
            case 1:
                // Listar mercado
                yield listarmercado();
                break;
            case 2:
                // Ver mis criptomonedas
                yield verCriptos(miBilletera, miUsuario);
                break;
            case 3:
                // Comprar criptomoneda
                yield comprarCriptomoneda(miBilletera, miUsuario);
                break;
            case 4:
                // Vender Criptomoneda
                yield eliminarCriptomoneda(miBilletera, miUsuario);
                break;
            case 5:
                //await accederBilletera(miUsuario);
                break;
            default:
                console.log("Opcion no valida");
                break;
        }
        yield (0, entrada_1.leerTeclado)("\nPulse Enter para continuar");
    } while (x != 5);
});
///  MENU LOGEADO
const verCriptos = (miBilletera, miUsuario) => __awaiter(void 0, void 0, void 0, function* () {
    let key = miUsuario.getDNI;
    let query = yield usuarios_1.UsuariosDB.find({ DNI: key });
    for (let a of query) {
        for (let e of a.Billeteras) {
            if (e.NombreWallet == miBilletera.getNombreWallet) {
                for (let i of e.Monedas) {
                    let miCripto = new Criptomonedas_1.Monedas(i._id, i.Nombre, i.Siglas, i.qty, i.Token, i.Capitalizacion);
                    miCripto.sayCompra();
                }
            }
        }
    }
});
const comprarCriptomoneda = (miBilletera, miUsuario) => __awaiter(void 0, void 0, void 0, function* () {
    let siglasCripto = yield (0, entrada_1.leerTeclado)("Inserte las siglas de la criptomoneda que quiera comprar");
    let query = yield criptomonedas_1.CriptomonedasDB.find({ Siglas: siglasCripto });
    for (let a of query) {
        let miCripto = new Criptomonedas_1.Monedas(a._id, a.Nombre, a.Siglas, a.qty, a.Token, a.Capitalizacion);
        let money = parseInt(yield (0, entrada_1.leerTeclado)("¿Cuanto dinero quiere invertir?"));
        let value = miCripto.calculoValor(money);
        miCripto.setQty(value);
        if (miBilletera !== undefined) {
            miBilletera === null || miBilletera === void 0 ? void 0 : miBilletera.agregarCriptomoneda(miCripto);
            yield usuarios_1.UsuariosDB.updateOne({ DNI: miUsuario.getDNI }, { Billeteras: miUsuario.getBilletera });
        }
    }
    if (query.length == 0) {
        console.log("No ha introducido una criptomoneda que exista");
    }
});
const eliminarCriptomoneda = (miBilletera, miUsuario) => __awaiter(void 0, void 0, void 0, function* () {
    let siglasCripto = yield (0, entrada_1.leerTeclado)("Inserte las siglas de la criptomoneda que quiera vender");
    if (miBilletera !== undefined) {
        if (miBilletera.existCriptomoneda(siglasCripto)) {
            let miCripto = miBilletera.buscarCriptomoneda(siglasCripto);
            if (miCripto !== undefined) {
                miBilletera.quitarCriptomoneda(miCripto);
            }
        }
        else {
            console.log("No tienes esa criptomoneda");
        }
        yield usuarios_1.UsuariosDB.updateOne({ DNI: miUsuario.getDNI }, { Billeteras: miUsuario.getBilletera });
    }
});
const accederBilletera = (Usuario) => __awaiter(void 0, void 0, void 0, function* () {
    let nombreBilletera = yield (0, entrada_1.leerTeclado)("Introduzca el nombre de la Billetera a la que quiere acceder");
    if (Usuario.existBilletera(nombreBilletera)) {
        Usuario.mostrarBilletera(nombreBilletera);
        let miBilletera = Usuario.buscarBilletera(nombreBilletera);
        let miContraseña;
        let myValue;
        if (miBilletera !== undefined) {
            do {
                miContraseña = yield (0, entrada_1.leerTeclado)("Inserte la contraseña de la billetera escogida");
                myValue = miBilletera.enterPassword(miContraseña);
            } while (myValue == false);
            yield criptoBrocker(miBilletera, Usuario);
        }
        else {
            console.log("La billetera no existe");
        }
        return;
    }
    else {
        console.log("LA BILLETERA NO EXISTE SUCIO");
    }
});
const eliminarBilletera = (Usuario) => __awaiter(void 0, void 0, void 0, function* () {
    let nombreBilletera = yield (0, entrada_1.leerTeclado)("Inserte el nombre de la billetera a eliminar");
    if (Usuario.existBilletera(nombreBilletera)) {
        Usuario.mostrarBilletera(nombreBilletera);
        Usuario.eliminarBilletera(nombreBilletera);
        if (!Usuario.existBilletera(nombreBilletera)) {
            console.log("Se ha eliminado correctamente");
        }
    }
    else {
        console.log("No existe esa billetera");
    }
    yield usuarios_1.UsuariosDB.updateOne({ DNI: Usuario.getDNI }, { Billeteras: Usuario.getBilletera });
});
const listarmercado = () => __awaiter(void 0, void 0, void 0, function* () {
    console.clear();
    console.log("-- Este es el mercado hoy.. --\n");
    let query = yield criptomonedas_1.CriptomonedasDB.find({});
    for (let a of query) {
        let myCripto = new Criptomonedas_1.Monedas(a._id, a.Nombre, a.Siglas, a.qty, a.Token, a.Capitalizacion);
        myCripto.sayMercado();
    }
});
const mostrarWallet = (Usuario) => __awaiter(void 0, void 0, void 0, function* () {
    let miRequisito;
    miRequisito = yield (0, entrada_1.leerTeclado)("Inserte el nombre de la billetera");
    if (Usuario.existBilletera(miRequisito)) {
        Usuario.mostrarBilletera(miRequisito);
    }
    else {
        console.log("La billetera no existe");
    }
});
const listarBilleras = (Usuario) => __awaiter(void 0, void 0, void 0, function* () {
    let query = yield usuarios_1.UsuariosDB.find({ DNI: Usuario.getDNI });
    for (let a of query) {
        for (let e of a.Billeteras) {
            let miWallet = new Billetera_1.Billetera(e.idWallet, e.NombreWallet, e.TipoWallet, e.Password, e.Monedas, e.InversionInic);
            miWallet.general();
        }
    }
    yield usuarios_1.UsuariosDB.updateOne({ DNI: Usuario.getDNI }, { Billeteras: Usuario.getBilletera });
});
const crearBilletera = (Usuario) => __awaiter(void 0, void 0, void 0, function* () {
    let idBilletera = Math.trunc(Math.random() * (999999 - 11111) + 11111);
    let nombreBilletera = "";
    nombreBilletera = yield (0, entrada_1.leerTeclado)("Inserte nombre para la billetera");
    while (Usuario.existBilletera(nombreBilletera)) {
        console.log("El nombre introducido ya está en uso");
        nombreBilletera = yield (0, entrada_1.leerTeclado)("Inserte nombre para la billetera");
    }
    let tipoBilletera = yield (0, entrada_1.leerTeclado)("Elija el tipo de billetera:\n1) Billetera normal\n2) Billetera Logica\n3) Billetera Fisica\n");
    let miBilletera;
    switch (tipoBilletera) {
        case "1":
            tipoBilletera = "Normal";
            miBilletera = new Billetera_1.Billetera(idBilletera, nombreBilletera, tipoBilletera, "0", 0, []);
            break;
        case "2":
            tipoBilletera = "Logica";
            miBilletera = new BilleteraLogica_1.BilleteraLogica(idBilletera, nombreBilletera, tipoBilletera, "0", 0, []);
            break;
        case "3":
            tipoBilletera = "Fisica";
            miBilletera = new BilleteraFisica_1.BilleteraFisica(idBilletera, nombreBilletera, tipoBilletera, "0", 0, [], 10);
            break;
    }
    let miPassword;
    if (miBilletera.getTipoWallet == "Fisica") {
        miPassword = yield (0, entrada_1.leerTeclado)("Inserte contraseña de Wallet");
    }
    else {
        miPassword = "";
    }
    Usuario.generatePassword(miBilletera, miPassword);
    Usuario.listarBilleteras;
    yield usuarios_1.UsuariosDB.updateOne({ DNI: Usuario.getDNI }, { Billeteras: Usuario.getBilletera });
    return miBilletera;
});
///  METODO REGISTRO
const register = () => __awaiter(void 0, void 0, void 0, function* () {
    console.clear();
    console.log("-- Bienvenido al registro de MikeCoinMarket --\n");
    console.log("Ingrese los siguientes datos...");
    yield database_1.db
        .conectarBD()
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        const nuevoUsuario = new usuarios_1.UsuariosDB({
            Nombre: yield (0, entrada_1.leerTeclado)("\nNombre"),
            Password: yield (0, entrada_1.leerTeclado)("Password"),
            DNI: yield (0, entrada_1.leerTeclado)("DNI"),
            Telefono: yield (0, entrada_1.leerTeclado)("Telefono"),
            Billeteras: [],
        });
        yield nuevoUsuario.save();
        console.log("\nUsuario creado....");
    }))
        .catch((error) => {
        console.log(error);
    });
});
///  MENU INICIAL
const remover = () => __awaiter(void 0, void 0, void 0, function* () {
    yield criptomonedas_1.CriptomonedasDB.remove({});
});
exports.remover = remover;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.db.conectarBD();
    yield (0, exports.remover)();
    yield salvar();
    console.clear();
    let n;
    do {
        n = yield (0, menu_1.menuPral)();
        switch (n) {
            case 1:
                yield login();
                break;
            case 2:
                yield register();
                break;
            case 3:
                console.log("Has salido...");
                break;
            default:
                console.log("Opcion no valida");
                break;
        }
    } while (n != 3);
});
main();
