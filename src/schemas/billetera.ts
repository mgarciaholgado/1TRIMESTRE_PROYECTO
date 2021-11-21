import { Schema, model } from "mongoose";
import { Monedas } from '../classes/Criptomonedas';

// Creamos un esquema para los clientes
const billeteraSchema = new Schema({
  _idWallet: Number,
  NombreWallet: String,
  TipoWallet: String,
  Password: String,
  Monedas: Array,
  InversionInic: Number,
});

export type iBilletera = {
  _idWallet: Number | null;
  NombreWallet: String | null;
  TipoWallet: String | null;
  Password: String | null;
  Monedas: Array<Monedas>;
  InversionInic: Number | null;
}

export const BilleteraDB = model("billetera", billeteraSchema);
