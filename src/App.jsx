/* V-55,Paso 1.8 Importamos nuestro componente */
import Guitar from "./components/Guitar"
import Heaader from "./components/Header"
//V-87,paso 2.1
import { useCart } from "./hooks/useCart"

function App() {

    //Vid 89,paso 2.3, ponemos el nombre de las funciones que ocupa el return
    const {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        //paso 2.7,agregamos las funciones del header
        isEmpty,
        cartTotal
    } = useCart()

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
                isEmpty={isEmpty}
                cartTotal={cartTotal}
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
