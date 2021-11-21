import { leerTeclado } from '../view/entrada';

export const menuMain = async () => {
    let x: number
    console.log('\n')
    console.log('-- Bienvenido que desea hacer... --')
    console.log('\n1. Crear wallet')
    console.log('2. Listar mis wallets') 
    console.log('3. Buscar wallets')
    console.log('4. Eliminar una wallet')
    console.log('5. Acceder a Wallet')
    console.log('6. Salir') // En un futuro que pueda enviarte al menu.ts para cambiar de usuario.
    x = parseInt( await leerTeclado('\nOpción') )
    return x
}