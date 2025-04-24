import { useEffect, useState } from "react"

export function SpaceList () {

    const [space, setSpace] = useState([])


    useEffect(() => {
        fetch('http://localhost:3000/')
        .then(res => res.json()
        .then(data => setSpace(data))
    )
    },[])

    return (
    <>

        {
            space.map(spa => {
        <div className="space-card">
            <img src="https://jeffersondealmeida.com.br/wp-content/uploads/2023/06/villa-com-piscina-de-luxo-espetacular-design-contemporaneo-arte-digital-imoveis-casa-casa-e-propriedade-ge.jpg" alt={spa.title}/>
            <h3></h3>
            <p>{spa.ubicacion}</p>
            <p>{spa.precioPorDia} Por dia</p>
            <p>{spa.capacidad} Personas</p>
            <p>{spa.servicios}</p>
            <p>{spa.isAvaiable ? 'Disponible' : 'No disponible'}</p>
        </div>
            })
        }

    </>
    )


}