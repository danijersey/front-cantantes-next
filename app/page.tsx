'use client'; 
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Cantante {
  id: number;
  nombre: string;
  edad: number;
  genero: string;
  pais: string;
}

const Home = () => {
  const [cantantes, setCantantes] = useState<Cantante[]>([]);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState('');
  const [id, setId] = useState<number | null>(null); 
  const [pais, setPais] = useState('');

  useEffect(() => {
    const fetchCantantes = async () => {
      const response = await axios.get('http://localhost:3000/api/cantantes/cantantes'); 
      setCantantes(response.data);
    };
    fetchCantantes();
  }, []);

  const crearCantante = async () => {
    const response = await axios.post('http://localhost:3000/api/cantantes/cantantes', {
      nombre,
      edad,
      genero,
      pais,
    });
    setCantantes([...cantantes, response.data]);
    limpiarFormulario();
  };

  const actualizarCantante = async () => {
    const response = await axios.put('http://localhost:3000/api/cantantes/cantantes', {
      id,
      nombre,
      edad,
      genero,
      pais
    });
    setCantantes(cantantes.map(c => (c.id === id ? response.data : c)));
    limpiarFormulario();
  };

  const eliminarCantante = async (id: number) => {
    await axios.delete(`http://localhost:3000/api/cantantes/cantantes?id=${id}`);
    setCantantes(cantantes.filter(c => c.id !== id));
  };

  const limpiarFormulario = () => {
    setNombre('');
    setEdad('');
    setGenero('');
    setId(null);
    setPais('');
  };
  return (
    <div className="container">
      <div className="background">
        {/* Imagen colocada a la derecha */}
        <div className="imagenes">
          <Image
            className='virgen'
            src="/imagenes/Virgin24.png"
            alt="Descripción de la imagen"
            width={300}
            height={300}
          />
        </div>
        <div className="imagene2">
  <Image
    className='boton'
    src="/imagenes/Group1000003199.png"
    alt="Descripción de la imagen"
    width={220} // Cambia a 50
    height={270} // Cambia a 50
  />
  
  
</div>
<div className="imagene3">
  <Image
    className='texto'
    src="/imagenes/Manageallofyourc.png"
    alt="Descripción de la imagen"
    width={410} // Cambia a 50
    height={350} // Cambia a 50
  />
  
  
</div>
<div className="imagene4">
  <Image
    className='texto'
    src="/imagenes/ehya.png"
    alt="Descripción de la imagen"
    width={410} // Cambia a 50
    height={350} // Cambia a 50
  />
  
  
</div>
<div className="imagenecuadrotexto">
  <Image
    className='textoamarillo'
    src="/imagenes/imag.png"
    alt="Descripción de la imagen"
    width={120} // Cambia a 50
    height={10} // Cambia a 50
  />
  
  
</div>
<div className="imagenemenu">
  <Image
    className='menu'
    src="/imagenes/ima.png"
    alt="Descripción de la imagen"
    width={370} // Cambia a 50
    height={350} // Cambia a 50
  />
  
  
</div>
<div className="imageneflecha">
  <Image
    className='flecha'
    src="/imagenes/image.png"
    alt="Descripción de la imagen"
    width={50} // Cambia a 50
    height={30} // Cambia a 50
  />
  
  
</div>
<div className="imageneluna">
  <Image
    className='luna'
    src="/imagenes/image4.png"
    alt="Descripción de la imagen"
    width={50} // Cambia a 50
    height={30} // Cambia a 50
  />
  
  
</div>
<div className="imageneestrellita">
  <Image
    className='extrellita'
    src="/imagenes/Mask.png"
    alt="Descripción de la imagen"
    width={60} // Cambia a 50
    height={60} // Cambia a 50
  />
  
  
</div>
<div className="imagenCirculoNft">
  <Image
    className='imagenCirculoNft'
    src="/imagenes/CirculoNft.png"
    alt="Descripción de la imagen"
    width={120} // Cambia a 50
    height={120} // Cambia a 50
  />
  
  
</div>

      </div>
  
      <div className='formulario'>
        <h1>Cantantes</h1>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
        />
        <input
          type="number"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          placeholder="Edad"
        />
        <input
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          placeholder="Género"
        />
        <input
          value={pais}
          onChange={(e) => setPais(e.target.value)}
          placeholder="País"
        />
        <button onClick={id ? actualizarCantante : crearCantante}>
          {id ? 'Actualizar Cantante' : 'Crear Cantante'}
        </button>
  
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Género</th>
              <th>País</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cantantes.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nombre}</td>
                <td>{c.edad}</td>
                <td>{c.genero}</td>
                <td>{c.pais}</td>
                <td>
                  <button
                    onClick={() => {
                      setId(c.id);
                      setNombre(c.nombre);
                      setEdad(c.edad.toString());
                      setGenero(c.genero);
                      setPais(c.pais);
                    }}
                  >
                    Editar
                  </button>
                  <button onClick={() => eliminarCantante(c.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default Home;
