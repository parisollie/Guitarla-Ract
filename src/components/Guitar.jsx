//V-58,Paso 1.6 creando otro componente: Guitarla
//V-65,props
export default function Guitar({
    //V-66,Paso 1.16, le paso mi prop guitarra
    guitar,
    //Paso 1.26, le mandamos la funcion 
    addToCart
}) {
    //console.log(guitar)
    //Paso 1.17, hacemos una constante con el prop de guitarra para no estar haciendo esto -> guiar.name , solo ponemos name y ya.
    const { id, name, image, description, price } = guitar

    /*V-67, paso 1.18,pondremos nuestra funcion cuando el usuario de click
    const handleClick = (guitar) =>{
        //V-68,Paso 1.22 vas a setear el cart y me vas a guardar una copia del carrito(...cart) mantiene el objeto previo
        //  y agrega el nuevo elemento(guitar).
        setCart([...cart,guitar])
        //console.log('Diste click',id)
    }*/

    //Paso 1.7, ponemos nuestro return y pegamos el codigo de la guitarra
    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">{price}</p>
                <button
                    type="button"
                    className="btn btn-dark w-100"
                    //paso 1.19,le pasamos el id de cada guitarra.Le pasamos el objeto completo de guiatrra.
                    //onClick={() => handleClick(guitar)}
                    //Paso 1.23, prevCart, yo así le di el nombre      
                    //onClick={() => setCart(prevCart => [...prevCart,guitar])}
                    //Paso 1.27, mandamos la funcion al carrito.
                    onClick={() => addToCart(guitar)}
                >Agregar al Carrito</button>
            </div>
        </div>
    )
}