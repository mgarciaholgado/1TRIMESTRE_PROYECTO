import { Billetera } from "./Billetera";

export class Usuarios {
  protected idUser: number;
  protected Nombre: string;
  protected Password: string;
  protected DNI: string;
  protected Telefono: number;
  protected Billeteras: Array<Billetera>;

  constructor(
    idUser: number,
    Nombre: string,
    Password: string,
    DNI: string,
    Telefono: number,
    Billeteras: Array<Billetera>
  ) {
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
    return this.Billeteras
  }

  //
  // SETTERS
  //

  set setidUser(idUser: number) {
    this.idUser = idUser;
  }

  set setNombre(Nombre: string) {
    this.Nombre = Nombre;
  }

  set setPassword(Password: string) {
    this.Password = Password;
  }

  set setDNI(DNI: string) {
    this.DNI = DNI;
  }

  set setTelefono(Telefono: number) {
    this.Telefono = Telefono;
  }

  listarBilleteras() {
    for (let a of this.Billeteras) {
      console.log(
        "Id Billetera: " +
          a.getidWallet +
          " | Nombre Billetera: " +
          a.getNombreWallet +
          " | Tipo billetera: " +
          a.getTipoWallet
      );
    }
  }

  buscarBilletera(name: any) {
    for (let a of this.Billeteras) {
      if (name == a.getNombreWallet) {
        return a;
      }
    }
  }

  existBilletera(name: any) {
    for (let a of this.Billeteras) {
      if (name == a.NombreWallet) {
        return true;
      }
    }
    return false;
  }

  generatePassword(miBilletera: Billetera, contraseña: string) {
    miBilletera.generatePassword(contraseña);
  }

  mostrarBilletera(name: any) {
    for (let a of this.Billeteras) {
      if (name == a.getNombreWallet) {
        console.log("Id Billetera: " +a.getidWallet +" | Nombre Billetera: " +a.getNombreWallet +" | Tipo billetera: " +a.getTipoWallet +" | Monedas: " +a.getMonedas);

      }
    }
  }

  eliminarBilletera(name: any) {
    for (let a of this.Billeteras) {
      if (name == a.getNombreWallet) {
        this.Billeteras.splice(this.Billeteras.indexOf(a), 1);
      }
    }
  }

  agregarBilletera(wallet: Billetera) {
    this.Billeteras.push(wallet);
  }
}
