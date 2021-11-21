"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriptomonedasDB = void 0;
const mongoose_1 = require("mongoose");
// Creamos un esquema para los clientes
const criptomonedasSchema = new mongoose_1.Schema({
    _id: Number,
    Nombre: String,
    Siglas: String,
    qty: Number,
    Token: Number,
    Capitalizacion: Number
});
exports.CriptomonedasDB = (0, mongoose_1.model)("criptomonedas", criptomonedasSchema);
