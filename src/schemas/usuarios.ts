import { Schema, model } from 'mongoose'
import { Billetera } from '../classes/Billetera'
// Creamos un esquema para los clientes
const usuariosSchema = new Schema({
  _idUser: Number,
  Nombre: String,
  Password: String,
  DNI:String,
  Telefono:Number,
  Billeteras: Array
})

export type iUsuario = {
  _idUser: Number | null,
  Nombre: String | null,
  Password: String | null,
  DNI:String | null,
  Telefono:Number | null,
  Billeteras: Array<Billetera>
}

export const UsuariosDB = model('usuarios', usuariosSchema );