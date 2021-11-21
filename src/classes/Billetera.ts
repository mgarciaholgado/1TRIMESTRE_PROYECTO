import { Monedas } from "../classes/Criptomonedas";

export class Billetera {
  protected idWallet: number;
  public NombreWallet: string;
  protected TipoWallet: string;
  protected Password: string;
  protected InversionInic: number;
  protected Monedas: Array<Monedas>;

  constructor(idWallet: number, NombreWallet: string, TipoWallet: string, Password: string, InversionInic: number, Monedas: Array<Monedas>) {
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
    if(this.Monedas.length==0) {
      return "No tenemos monedas"
    } else {
    return this.Monedas;
    }
  }

  get getPassword() {
    return this.Password;
  }

  enterPassword(contraseña: string) {
    return true
  }

  agregarCriptomoneda(Moneda: Monedas) {
    this.Monedas.push(Moneda)
  }

  quitarCriptomoneda(Moneda: Monedas) {
    this.Monedas.splice(this.Monedas.indexOf(Moneda),1)
  }

  buscarCriptomoneda(Siglas: String) {
    for (let a of this.Monedas) {
      if(a.getSiglas==Siglas) {
        return a
      }
    }
  }

  existCriptomoneda(Siglas: String) {
    let value=false
    for(let a of this.Monedas) {
      if(a.getSiglas==Siglas) {
        value = true
      } 
    }
    return value
  }

  generatePassword(contraseña: string) {
    this.Password=""
    return this.Password
  }

  get getInversionInic() {
    return this.InversionInic;
  }

  //
  // SETTERS
  //

  set setidWallet(idWallet: number) {
    this.idWallet = idWallet;
  }

  set setNombreWallet(NombreWallet: string) {
    this.NombreWallet = NombreWallet;
  }
  
  set setTipoWallet(TipoWallet: string) {
    this.TipoWallet = TipoWallet;
  }

  set setMonedas(Monedas: any) {
    this.Monedas = Monedas;
  }

  set setInversionInic(InversionInic: number) {
    this.InversionInic = InversionInic;
  }

  general() {
    console.log("Id de Billetera: "+this.idWallet+", Nombre Billetera: "+this.getNombreWallet)
  }

  mostrarCripto() {
    for(let a of this.Monedas) {
      a.sayMercado()
    }
  }
  
}
