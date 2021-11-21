import { Schema, model } from "mongoose";

// Creamos un esquema para los clientes
const criptomonedasSchema = new Schema({
    _id: Number,
    Nombre: String,
    Siglas: String,
    qty: Number,
    Token: Number,
    Capitalizacion: Number
});

export type iCripto = {
    _id: Number | null ,
    Nombre: String |null,
    Siglas: String |null,
    qty: Number | null,
    Token: Number | null ,
    Capitalizacion: Number | null;
}

export const CriptomonedasDB = model("criptomonedas", criptomonedasSchema);