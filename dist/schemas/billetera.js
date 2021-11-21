"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BilleteraDB = void 0;
const mongoose_1 = require("mongoose");
// Creamos un esquema para los clientes
const billeteraSchema = new mongoose_1.Schema({
    _idWallet: Number,
    NombreWallet: String,
    TipoWallet: String,
    Password: String,
    Monedas: Array,
    InversionInic: Number,
});
exports.BilleteraDB = (0, mongoose_1.model)("billetera", billeteraSchema);
