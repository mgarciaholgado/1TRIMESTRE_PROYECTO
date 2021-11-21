"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosDB = void 0;
const mongoose_1 = require("mongoose");
// Creamos un esquema para los clientes
const usuariosSchema = new mongoose_1.Schema({
    _idUser: Number,
    Nombre: String,
    Password: String,
    DNI: String,
    Telefono: Number,
    Billeteras: Array
});
exports.UsuariosDB = (0, mongoose_1.model)('usuarios', usuariosSchema);
