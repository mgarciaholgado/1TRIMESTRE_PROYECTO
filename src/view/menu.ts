import { leerTeclado } from '../view/entrada'

export const menuPral = async () => {
    let n: number
    console.log('\n')
    console.log('-- Bienvenido a MikExchange --')
    console.log('\n1. Hacer login')
    console.log('2. Registrarse')
    console.log('3. Salir')
    n = parseInt( await leerTeclado('\nopción') )
    return n
}