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
exports.menuCripto = void 0;
const entrada_1 = require("../view/entrada");
const menuCripto = () => __awaiter(void 0, void 0, void 0, function* () {
    let x;
    console.log('\n');
    console.log('-- Bienvenido que desea hacer... --');
    console.log('\n1. Listar mercado');
    console.log('2. Ver mis criptomonedas');
    console.log('3. Comprar una criptomoneda');
    console.log('4. Vender una criptomoneda');
    console.log('5. Cerrar sesion');
    x = parseInt(yield (0, entrada_1.leerTeclado)('\nOpción'));
    return x;
});
exports.menuCripto = menuCripto;
