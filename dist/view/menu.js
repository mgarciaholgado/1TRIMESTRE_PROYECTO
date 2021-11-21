"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuPral = void 0;
const entrada_1 = require("../view/entrada");
const menuPral = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    console.log('\n');
    console.log('-- Bienvenido a MikExchange --');
    console.log('\n1. Hacer login');
    console.log('2. Registrarse');
    console.log('3. Salir');
    n = parseInt(yield (0, entrada_1.leerTeclado)('\nopción'));
    return n;
});
exports.menuPral = menuPral;
