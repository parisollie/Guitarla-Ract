/* V-55,Paso 1.8 Importamos nuestro componente */
import Guitar from "./components/Guitar"
import Heaader from "./components/Header"
//V-60 y V-62, paso 1.10, importamos el useState y el useEffect
import { useState, useEffect } from "react"
// V-63,paso 1.11, importamos nuestro arreglo de guitarras.
import { db } from "./data/db"


function App() {

    //V-83,paso 1.56
    const initialCart = () => {
        //Obtenemos el carrito
        const localStorageCart = localStorage.getItem('cart')
        /*comprobamos el hay algo en la vairbale,Si hay algo en local Storage?e,entonces lo convertimos en carrito
         y sino sera un arreglo vacío*/
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    //V-63,Paso 1.12, le pongo  db que es nuestro archivo local
    const [data] = useState(db)

    //V-68,Paso 1.20, creamos el state de carrito y lo vamos inicializar.
    const [cart, setCart] = useState(initialCart)
    //console.log(data)

    //V-79,variabke para ooner el mayor de items en el carrito
    const MAX_ITEMS = 5
    //V-80, minimo de items en el carrito.
    const MIN_ITEMS = 1

    /*V-82,paso 1.55, local Storage, siempre tiene un call back.*/
    useEffect(() => {
        //Pasamos nuestro carrito a Json , tomados parámetros el nombre del identificador y de lo que queremos alamacenar
        localStorage.setItem('cart', JSON.stringify(cart))
        //se ejecuta cuando ya tiene algo listo.
    }, [cart])

    //--------------------------------------------------- FUNCIONES -----------------------------------------------------------

    //V-69,paso 1.24, función para agregar elementos
    function addToCart(item) {
        //console.log('agregando...')
        /*V-70,Paso 1.28,revisaremos si existe el elemento e itera sobre el carrito de compras, si agrego un elemento nuevo ?
        ya existe ese id ?, en que caso de que no exista regresa -1 */
        const itemExists = cart.findIndex(guitar => guitar.id === item.id)
        //Paso 1.29, si hay un elemento mayor ,significa que existe en el carrito.
        if (itemExists >= 0) {
            //V-80
            //Si al apretar el botón del carrito , ya no llega a mas.
            if (cart[itemExists].quantity >= MAX_ITEMS) return
            //console.log('Ya existe')
            //V-72,paso 1.32,Hacemos una copia del carrito
            const updateCart = [...cart]
            //Le pasamos la posicion e incrementamos el carrito.
            updateCart[itemExists].quantity++
            //Siempre debemos setear
            setCart(updateCart)

        } else {
            //V-69
            console.log('No existe...agregando')
            //Paso 1.30, la primera vez que el usario agrega la primera vez, agrega 1
            item.quantity = 1
            //setCart(prevCart => [...prevCart, item])
            //Paso 1.31,Le pasamos el carrito y ek item
            setCart([...cart, item])
        }
    }

    //V-78, paso 1.45, toma un id
    function removeFromCart(id) {
        console.log('Eliminando...', id)
        /*Paso 1.48,filtrame las guitarras diferentes al id que te estoy dando.
        Prevcart es mi variable, accedemos a cada una con el filter, regresa al nuevo arreglo y lo seteamos.*/
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    //V-79,paso 1.49
    function increaseQuantity(id) {
        //.map, nos genera nueva nueva copia 
        const updateCart = cart.map(item => {
            //si el id es igual al id actual le retorno las mismas cantidades
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    // retorno el item
                    ...item,
                    // pero la cantidad la aumento en 1
                    quantity: item.quantity + 1
                }
            }
            //para que el resto de los elementos fuera los mantenga
            return item
        })
        // seteamos la variable del carrito
        setCart(updateCart)
    }

    //V-80, paso 1.51
    function decreaseQuantity(id) {
        //.map, nos genera nueva nueva copia 
        const updateCart = cart.map(item => {
            //si el id es igual al id actual le retorno las mismas cantidades
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            //para que el resto de los elementos fuera los mantenga
            return item
        })
        setCart(updateCart)
    }

    /*V-81,paso 1.53
    Nuestra funcion de limpiar el carrito.*/
    function clearCart() {
        setCart([])
    }

    return (
        //Paso 1.5,Regresamos un solo componente en un Fragment
        <>
            {/* Regresamos un Header*/}
            <Heaader
                //V-73, paso 1.33, le pasaremos el cart al Header
                cart={cart}
                //Paso 1.46, le pasamos el prop para remover
                removeFromCart={removeFromCart}
                //V-79
                increaseQuantity={increaseQuantity}
                //V-80
                decreaseQuantity={decreaseQuantity}
                //V-81
                clearCart={clearCart}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {/* Paso 1.13, ponemos un mapa ,para poner las guitarras*/}
                    {data.map((guitar) => (
                        //V-64,Paso 1.9, ponemos nuestro compoenente de Guitarra
                        <Guitar
                            /*V-66 ,Paso 1.15,siempre necesitan una key cuando se itera en una lista,
                            si tenemos una base podemos ponerle el id.*/
                            key={guitar.id}
                            guitar={guitar}
                            //Paso 121, le pasamos el prop
                            setCart={setCart}
                            //cart = {cart}
                            //Paso 1.25, le mandamos la funcion de addToCart
                            addToCart={addToCart}
                        />
                    ))}
                </div>
            </main>

            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>
        </>
    )
}

export default App
