import { leerTeclado } from '../view/entrada';

export const menuCripto = async () => {
    let x: number
    console.log('\n')
    console.log('-- Bienvenido que desea hacer... --')
    console.log('\n1. Listar mercado')
    console.log('2. Ver mis criptomonedas')
    console.log('3. Comprar una criptomoneda') 
    console.log('4. Vender una criptomoneda')
    console.log('5. Cerrar sesion')
    x = parseInt( await leerTeclado('\nOpción') )
    return x
}