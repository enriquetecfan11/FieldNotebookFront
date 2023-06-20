import DefaultLayout from "../layout/DefaultLayout";
import { useEffect, useState } from 'react';


const AddActividades = () => {
  const [actividades, setActividades] = useState([]);
  const [maquinaria, setMaquinaria] = useState([]);
  const [personal, setPersonal] = useState([]);
  const [productos, setProductos] = useState([]);

  // Get Maquinaria
  useEffect(() => {
    fetch('http://localhost:5000/maquinaria')
      .then(response => response.json())
      .then(data => {
        setMaquinaria(data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de la maquinaria:', error);
      });
  }, []);

  // Get Personal
  useEffect(() => {
    fetch('http://localhost:5000/personal')
      .then(response => response.json())
      .then(data => {
        setPersonal(data);
      })
      .catch(error => {
        console.error('Error al obtener los datos del personal:', error);
      });
  }, []);

  // Get Productos
  useEffect(() => {
    fetch('http://localhost:5000/productos')
      .then(response => response.json())
      .then(data => {
        setProductos(data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de los productos:', error);
      });
  }, []);


  const handelFormSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const actividadesData = {
      actividad: formData.get('actividad'),
      fecha: formData.get('fecha'),
      tiempo: formData.get('tiempo'),
      nparcela: formData.get('nparcela'),
      producto: formData.get('producto'),
      maquinaria: formData.get('maquinaria'),
      personal: formData.get('personal'),
      hecho: false, // Agregar el campo "hecho" y establecerlo en "false"
    };

    console.log(actividadesData);

    fetch('http://localhost:5000/actividades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(actividadesData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      
    window.location.href = 'http://localhost:5173/actividades'; // Redireccionar a la página de actividades
    form.reset();
  }


  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270 overflow-auto">
        <h4>Formulario para añadir actividades</h4>
        <form onSubmit={handelFormSubmit}>
          <div className="flex flex-col gap-4">
            <input type="text" name="actividad" id="actividad" placeholder="Nombre de la actividad" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2" />

            <input type="date" name="fecha" id="fecha" placeholder="Fecha de la actividad" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2" />

            <input type="text" name="tiempo" id="tiempo" placeholder="Tiempo empleado en la actividad" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 
            dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2" />

            <input type="number" name="nparcela" id="nparcela" placeholder="Nº de parcela" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 
            dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2" />

            <label htmlFor="producto">Seleccione el producto usado</label>
            <select
              name="producto"
              id="producto"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2">
              {productos.map((producto) => (
                <option key={producto.id} value={producto.nombre}>
                  {producto.nombre} -- {producto.tipo}
                </option>
              ))}
            </select>



            <label htmlFor="maquinaria">Seleccione la maquinaria usada</label>
            <select
              name="maquinaria"
              id="maquinaria"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2"
            >
              {maquinaria.map((maquinaria) => (
                <option key={maquinaria.id} value={maquinaria.marca}>
                  {maquinaria.marca} -- {maquinaria.tipo}
                </option>
              ))}
            </select>

            <label htmlFor="personal">Seleccione el personal empelado en la actividad</label>
            <select
              name="personal"
              id="personal"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2"
            >
              {personal.map((personal) => (
                <option key={personal.id} value={personal.nombre}>
                  {personal.nombre} - Nº Incripcion {personal.ninscripcion}
                </option>
              ))}
            </select>

            <button type='submit' className="text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Añadir Actividad</button>


          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default AddActividades;
