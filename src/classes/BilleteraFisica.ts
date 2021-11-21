import { Billetera } from "./Billetera";
import { Monedas } from "./Criptomonedas";

export class BilleteraFisica extends Billetera {
  protected Intentos: number;

  constructor(
    idWallet: number,
    NombreWallet: string,
    TipoWallet: string,
    Password: string,
    InversionInic: number,
    Monedas: Array<Monedas>,
    Intentos: number
  ) {
    super(idWallet, NombreWallet, TipoWallet, Password, InversionInic, Monedas);
    this.Intentos = Intentos;
  }

  generatePassword(contraseña: string) {
    this.Password=contraseña
    return this.Password
  }

  mostrarCripto() {
    for(let a of this.Monedas) {
      a.sayCompra()
    }
  }

  enterPassword(contraseña: string) {
    if(this.Intentos == 0) {
      console.log("Procediendo a eliminar datos de cuenta")
    }
    if (contraseña != this.Password) {
      this.Intentos--;
      console.log(
        "Contraseña incorrecta, te quedan " + this.Intentos + " intentos"
      );
      return false;
    } else {
      this.Intentos = 10;
      return true;
    }
  }
}
