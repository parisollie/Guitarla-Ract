//import { Fragment } from "react"
//import Guitar from "./Guitar"
//Vid 77
import { useMemo } from "react"
//Vid 78
//V-55, paso 1.2, creamos nuestro componente Header, le debemos poner export default.
export default function Heaader({
   //Aplicamos destructuring
   cart,
   removeFromCart,
   increaseQuantity,
   decreaseQuantity,
   clearCart }) {

   /*
     V-75,Paso 1.41,State Derivado, es derivado porque depende de este state (cart.length)
     V-77,Paso 1.44 UseMemo,renderizarav cuando el carrito cambie y toma 2 cosas.
   */
   const isEmpty = useMemo(() => cart.length === 0, [cart])

   /*V-76,paso 1.42,ponemos 0 ,porque sumaremos apartir de ahí
   toma el acumulado , ose ael total y el segundo es el item , el elemento actual, el 0 es el valor inicial , 
   es como una iteracion*/
   const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

   //Paso 1.3, creamos el return del componente Header
   //V-57,paso 1.4, cambiamos a className

   return (
      <header className="py-5 header">
         <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
               <div className="col-8 col-md-3">
                  <a href="index.html">
                     <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                  </a>
               </div>
               <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                  <div
                     className="carrito"
                  >
                     <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                     <div id="carrito" className="bg-white p-3">
                        {/*V-74,Paso 1.40, operador ternario para ver el mensaje de
                        si el carrito esta vacío.*/}
                        {isEmpty ? (
                           <p className="text-center">El carrito esta vacio</p>
                        ) : (
                           <>
                              <table className="w-100 table">
                                 <thead>
                                    <tr>
                                       <th>Imagen</th>
                                       <th>Nombre</th>
                                       <th>Precio</th>
                                       <th>Cantidad</th>
                                       <th></th>
                                    </tr>
                                 </thead>
                                 <tbody>

                                    {/* Paso 1.34, vamos a estar iterando en guitarra
                                    por cada elemento en el carrito.
                                    */}
                                    {cart.map(guitar => (
                                       //Paso 1.39, ponemos el id de la guiarra para que sea único
                                       <tr key={guitar.id}>
                                          <td>
                                             <img
                                                className="img-fluid"
                                                //Paso 1.38, le inyectamos la imagen de la guitarra
                                                src={`/img/${guitar.image}.jpg`}
                                                alt="imagen guitarra"
                                             />
                                          </td>
                                          {/*Paso 1.35, ponemos el nombre de la guitarra */}
                                          <td>{guitar.name}</td>
                                          <td className="fw-bold">
                                             {/*Paso 1.36, ponemos el precio de la guitarra */}
                                             ${guitar.price}
                                          </td>
                                          <td className="flex align-items-start gap-4">
                                             <button
                                                type="button"
                                                className="btn btn-dark"
                                                // Paso 1.52
                                                onClick={() => decreaseQuantity(guitar.id)}
                                             >
                                                -
                                             </button>
                                             {/*Paso 1.37, ponemos la cantidad de la guitarra */}
                                             {guitar.quantity}
                                             <button
                                                type="button"
                                                className="btn btn-dark"
                                                //paso 1.50, le pasamos la funcion de incrementar
                                                onClick={() => increaseQuantity(guitar.id)}
                                             >
                                                +
                                             </button>
                                          </td>
                                          <td>
                                             <button
                                                className="btn btn-danger"
                                                type="button"
                                                //Paso 1.47, le pasamos el pro de eliminar del carrito.
                                                onClick={() => removeFromCart(guitar.id)}
                                             >
                                                X
                                             </button>
                                          </td>
                                       </tr>

                                    ))}
                                 </tbody>
                              </table>
                              {/*Paso 1.43, ponemos el total a pagar, ponemos el nombre de la guitarra */}
                              <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal}</span></p>
                           </>
                        )}
                        <button
                           className="btn btn-dark w-100 mt-3 p-2"
                           //Paso 1.54, limpiamos el carrito
                           onClick={clearCart}
                        >Vaciar Carrito</button>
                     </div>
                  </div>
               </nav>
            </div>
         </div>
      </header>
   )

}