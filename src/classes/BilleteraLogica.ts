import { Billetera } from "./Billetera";
import { Monedas } from "./Criptomonedas"
export class BilleteraLogica extends Billetera{    
    constructor(idWallet: number, NombreWallet: string, TipoWallet: string, Password: string, InversionInic: number, Monedas: Array<Monedas>) {
        super(idWallet, NombreWallet, TipoWallet, Password, InversionInic, Monedas)
    }

    generatePassword(contraseña: string) {
        this.Password=Math.trunc(Math.random() * (9999-1111)+1111)+""
        console.log("Su contraseña generada es: "+this.Password)
        return this.Password
    }

    mostrarCripto() {
        for(let a of this.Monedas) {
          a.sayCompra()
        }
      }

    enterPassword(contraseña: string) {
		if(contraseña!=this.Password) {
            console.log("Contraseña incorrecta")
            return false
		} else {
			return true
		}
	}
  }

function ParseString(arg0: number): string {
    throw new Error("Function not implemented.");
}
