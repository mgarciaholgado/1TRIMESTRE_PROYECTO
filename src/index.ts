import { menuPral } from "./view/menu";
import { menuMain } from "./view/mainMenu";
import { leerTeclado } from "./view/entrada";
import { db } from "./database/database";
import { iUsuario, UsuariosDB } from "./schemas/usuarios";
import { Usuarios } from "./classes/Usuarios";
import { Monedas } from "./classes/Criptomonedas";
import { Billetera } from "./classes/Billetera";
import { CriptomonedasDB, iCripto } from "./schemas/criptomonedas";
import { clearScreenDown } from "readline";
import { clear } from "console";
import { BilleteraLogica } from "./classes/BilleteraLogica";
import { BilleteraFisica } from "./classes/BilleteraFisica";
import { menuCripto } from "./view/menuCripto";
import { BilleteraDB, iBilletera } from "./schemas/billetera";


// METER LAS CRIPTOS 
let CriptomonedasArray: Array<Monedas> = new Array<Monedas>();

CriptomonedasArray[0] = new Monedas(0, "Bitcoin", "BTC", 0, 59047, 444246);
CriptomonedasArray[1] = new Monedas(1,"Ethereum","ETH",0,4367,3264769);
CriptomonedasArray[2] = new Monedas(2,"Binance Coin","BNB",0,589,3711898);
CriptomonedasArray[3] = new Monedas(3,"Solana","SOL",0,228,7755230);
CriptomonedasArray[4] = new Monedas(4,"Polkadot","DOT",0,41,24567115);

let dSchemaBilletera: iBilletera = {
  _idWallet: null,
  NombreWallet: null,
  TipoWallet: null,
  Password: null,
  Monedas: [],
  InversionInic: null,
};

let dSchemaUsuario: iUsuario = {
  _idUser: null,
  Nombre: null,
  Password: null,
  DNI: null,
  Telefono: null,
  Billeteras: [],
};

// GUARDAMOS LAS CRIPTOS EN LA BASE DE DATOS
let salvar = async () => {
  let oSchema: any;
  let dSchemaCriptomoneda: iCripto = {
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
    oSchema = new CriptomonedasDB(dSchemaCriptomoneda);
    await oSchema.save();
  }
};

///  METODO LOGIN

const login = async () => {
  console.clear();
  console.log("-- Inicio de sesion MikeCoinMarket --");
  await db.conectarBD();
  const user = await leerTeclado("\nUsuario");
  const pass = await leerTeclado("Contraseña");

  // Buscamos los usuarios en la base de datos
  const query: Array<any> = await UsuariosDB.find({});
  for (let a of query) {
    if (a.Nombre == user && a.Password == pass) {
      let miUsuario = new Usuarios(
        a.idUser,
        a.Nombre,
        a.Password,
        a.DNI,
        a.Telefono,
        a.Billeteras
      );
        

      // MENU BILLETERA
      let x: number;
      do {
        console.clear();
        x = await menuMain();
        switch (x) {
          // Crear una billetera
          case 1:
            let miBilletera = await crearBilletera(miUsuario);
            await miUsuario.agregarBilletera(miBilletera);
            break;
          // Listar billetera
          case 2:
            await listarBilleras(miUsuario);
            break;

          // Buscar billetera
          case 3:
            await mostrarWallet(miUsuario);
            break;
          // Eliminar Billetera
          case 4:
            await eliminarBilletera(miUsuario);
            break;
          // Salir
          case 5:
            await accederBilletera(miUsuario);
            break;

          default:
            console.log("Opcion no valida");
            break;
        }
        await leerTeclado("\nPulse Enter para continuar");
      } while (x != 6);
    }
  }
};

const criptoBrocker = async (miBilletera: Billetera, miUsuario: Usuarios) => {
  // MENU CRIPTOS
  let x: any;
  do {
    console.clear();
    x = await menuCripto();
    switch (x) {
      case 1:
        // Listar mercado
        await listarmercado();
        break;

      case 2:
        // Ver mis criptomonedas
        await verCriptos(miBilletera, miUsuario);
        break;

      case 3:
        // Comprar criptomoneda
        await comprarCriptomoneda(miBilletera, miUsuario);
        break;

      case 4:
        // Vender Criptomoneda
        await eliminarCriptomoneda(miBilletera, miUsuario);
        break;

      case 5:
        console.log("Has salido..")
        break;

      default:
        console.log("Opcion no valida");
        break;
    }
    await leerTeclado("\nPulse Enter para continuar");
  } while (x != 5);
};

///  MENU LOGEADO

const verCriptos = async (miBilletera: Billetera, miUsuario: Usuarios) => {
  let key= miUsuario.getDNI
  let query = await UsuariosDB.find({ DNI: key });
  for (let a of query) {
    for (let e of a.Billeteras) {
      if (e.NombreWallet == miBilletera.getNombreWallet) {
        for (let i of e.Monedas) {
          let miCripto = new Monedas(
            i._id,
            i.Nombre,
            i.Siglas,
            i.qty,
            i.Token,
            i.Capitalizacion
          );
          miCripto.sayCompra();
        }
      }
    }
  }
};


const comprarCriptomoneda = async (miBilletera: Billetera, miUsuario: Usuarios) => {
  let siglasCripto = await leerTeclado(
    "Inserte las siglas de la criptomoneda que quiera comprar"
  );

  let query: Array<any> = await CriptomonedasDB.find({ Siglas: siglasCripto });
  for (let a of query) {
    let miCripto = new Monedas(
      a._id,
      a.Nombre,
      a.Siglas,
      a.qty,
      a.Token,
      a.Capitalizacion
    );
    let money = parseInt(await leerTeclado("¿Cuanto dinero quiere invertir?"));
    let value = miCripto.calculoValor(money);
    miCripto.setQty(value);
    if (miBilletera !== undefined) {
      miBilletera?.agregarCriptomoneda(miCripto);
      await UsuariosDB.updateOne(
        { DNI: miUsuario.getDNI },
        { Billeteras: miUsuario.getBilletera }
      );
    }
  }

  if (query.length == 0) {
    console.log("No ha introducido una criptomoneda que exista");
  }
};

const eliminarCriptomoneda = async (miBilletera: Billetera, miUsuario: Usuarios) => {
  let siglasCripto = await leerTeclado(
    "Inserte las siglas de la criptomoneda que quiera vender"
  );
  if (miBilletera !== undefined) {
    if (miBilletera.existCriptomoneda(siglasCripto)) {
      let miCripto = miBilletera.buscarCriptomoneda(siglasCripto);
      if (miCripto !== undefined) {
        miBilletera.quitarCriptomoneda(miCripto);
      }
    } else {
      console.log("No tienes esa criptomoneda");
    }
    await UsuariosDB.updateOne(
      { DNI: miUsuario.getDNI },
      { Billeteras: miUsuario.getBilletera }
    );
  }
};

const accederBilletera = async (Usuario: Usuarios) => {
  let nombreBilletera = await leerTeclado("Introduzca el nombre de la Billetera a la que quiere acceder");

  if (Usuario.existBilletera(nombreBilletera)) {
    Usuario.mostrarBilletera(nombreBilletera);
    let miBilletera = Usuario.buscarBilletera(nombreBilletera);
    let miContraseña: string;
    let myValue: Boolean;
    if (miBilletera !== undefined) {
      do {
        miContraseña = await leerTeclado(
          "Inserte la contraseña de la billetera escogida"
        );
        myValue = miBilletera.enterPassword(miContraseña);
      } while (myValue == false);
      await criptoBrocker(miBilletera, Usuario);
    } else {
      console.log("La billetera no existe");
    }
    return;
  }else {
    console.log("LA BILLETERA NO EXISTE SUCIO");
    
  }
};

const eliminarBilletera = async (Usuario: Usuarios) => {
  let nombreBilletera = await leerTeclado("Inserte el nombre de la billetera a eliminar");
  if (Usuario.existBilletera(nombreBilletera)) {
    Usuario.mostrarBilletera(nombreBilletera);
    Usuario.eliminarBilletera(nombreBilletera);
    if (!Usuario.existBilletera(nombreBilletera)) {
      console.log("Se ha eliminado correctamente");
    }
  } else {
    console.log("No existe esa billetera");
  }
  await UsuariosDB.updateOne(
    { DNI: Usuario.getDNI },
    { Billeteras: Usuario.getBilletera }
  );
};

const listarmercado = async () => {
  console.clear();
  console.log("-- Este es el mercado hoy.. --\n");

  let query: Array<any> = await CriptomonedasDB.find({});
  for (let a of query) {
    let myCripto = new Monedas(
      a._id,
      a.Nombre,
      a.Siglas,
      a.qty,
      a.Token,
      a.Capitalizacion
    );
    myCripto.sayMercado();
  }
};

const mostrarWallet = async (Usuario: Usuarios) => {
  let miRequisito: any;
  miRequisito = await leerTeclado("Inserte el nombre de la billetera");
  if (Usuario.existBilletera(miRequisito)) {
    Usuario.mostrarBilletera(miRequisito);
  } else {
    console.log("La billetera no existe");
  }
};

const listarBilleras = async (Usuario: Usuarios) => {
  let query = await UsuariosDB.find({ DNI: Usuario.getDNI });
  for (let a of query) {
    for (let e of a.Billeteras) {
      let miWallet = new Billetera(
        e.idWallet,
        e.NombreWallet,
        e.TipoWallet,
        e.Password,
        e.Monedas,
        e.InversionInic
      );
      miWallet.general();
    }
  }
  await UsuariosDB.updateOne(
    { DNI: Usuario.getDNI },
    { Billeteras: Usuario.getBilletera }
  );
};


const crearBilletera = async (Usuario: Usuarios) => {
  let idBilletera = Math.trunc(Math.random() * (999999 - 11111) + 11111);
  let nombreBilletera: string = "";
  nombreBilletera = await leerTeclado("Inserte nombre para la billetera");
  while (Usuario.existBilletera(nombreBilletera)) {
    console.log("El nombre introducido ya está en uso");
    nombreBilletera = await leerTeclado("Inserte nombre para la billetera");
  }
  let tipoBilletera = await leerTeclado(
    "Elija el tipo de billetera:\n1) Billetera normal\n2) Billetera Logica\n3) Billetera Fisica\n"
  );
  let miBilletera: any;
  switch (tipoBilletera) {
    case "1":
      tipoBilletera = "Normal";
      miBilletera = new Billetera(
        idBilletera,
        nombreBilletera,
        tipoBilletera,
        "0",
        0,
        []
      );
      break;
    case "2":
      tipoBilletera = "Logica";
      miBilletera = new BilleteraLogica(
        idBilletera,
        nombreBilletera,
        tipoBilletera,
        "0",
        0,
        []
      );

      break;
    case "3":
      tipoBilletera = "Fisica";
      miBilletera = new BilleteraFisica(
        idBilletera,
        nombreBilletera,
        tipoBilletera,
        "0",
        0,
        [],
        10
      );
      break;
  }
  let miPassword: string;
  if (miBilletera.getTipoWallet == "Fisica") {
    miPassword = await leerTeclado("Inserte contraseña de Wallet");
  } else {
    miPassword = "";
  }
  Usuario.generatePassword(miBilletera, miPassword);
  Usuario.listarBilleteras;
  await UsuariosDB.updateOne(
    { DNI: Usuario.getDNI },
    { Billeteras: Usuario.getBilletera }
  );
  return miBilletera;
};

///  METODO REGISTRO

const register = async () => {
  console.clear();
  console.log("-- Bienvenido al registro de MikeCoinMarket --\n");
  console.log("Ingrese los siguientes datos...");

  await db
    .conectarBD()
    .then(async () => {
      const nuevoUsuario = new UsuariosDB({
        Nombre: await leerTeclado("\nNombre"),
        Password: await leerTeclado("Password"),
        DNI: await leerTeclado("DNI"),
        Telefono: await leerTeclado("Telefono"),
        Billeteras: [],
      });
      await nuevoUsuario.save();
      console.log("\nUsuario creado....");
    })
    .catch((error) => {
      console.log(error);
    });
};

///  MENU INICIAL

export const remover = async () => {
  await CriptomonedasDB.remove({});
};

const main = async () => {
  await db.conectarBD();
  await remover();
  await salvar();
  console.clear();
  let n: number;
  do {
    n = await menuPral();
    switch (n) {
      case 1:
        await login();
        break;

      case 2:
        await register();
        break;

      case 3:
        console.log("Has salido...");
        break;

      default:
        console.log("Opcion no valida");
        break;
    }
  } while (n != 3);
};
main();
