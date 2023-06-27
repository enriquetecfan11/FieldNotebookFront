import DefaultLayout from "../layout/DefaultLayout";
import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb2';
import util from "../utils/util";
import { useNavigate } from "react-router-dom";



const AddActividades = () => {
  const [actividades, setActividades] = useState([]);
  const [maquinaria, setMaquinaria] = useState([]);
  const [personal, setPersonal] = useState([]);
  const [productos, setProductos] = useState([]);
  const [parcela, setParcelas] = useState([]);
  const [fitosanitarioslist, setfitosanitarioslist] = useState([]);

  const navigate = useNavigate();

  // Get Maquinaria
  useEffect(() => {
    fetch(util.getMaquinaria())
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos de la maquinaria');
        }
        return response.json();
      })
      .then(data => {
        setMaquinaria(data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de la maquinaria:', error);
      });
  }, []);


  // Get Personal
  useEffect(() => {
    fetch(util.getPersonal())
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
    fetch(util.getProductos())
      .then(response => response.json())
      .then(data => {
        setProductos(data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de los productos:', error);
      });
  }, []);

  //Get Parcelas
  useEffect(() => {
    fetch(util.getParcelas())
      .then(response => response.json())
      .then(data => {
        setParcelas(data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de las actividades:', error);
      });
  }, []);


  // Realizar la solicitud GET para cargar la lista de fitosnanitarios
  useEffect(() => {
    fetch(util.getFitosanitarios())
      .then(response => response.json())
      .then(data => {
        setfitosanitarioslist(data);
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
      cantidadTiempo: formData.get('cantidadTiempo'),
      nparcela: formData.get('nparcela'),
      producto: formData.get('producto'),
      fitosanitario: formData.get('fitosanitario'),
      maquinaria: formData.get('maquinaria'),
      personal: formData.get('personal'),
      hecho: false,
    }

    fetch(util.getActividadesUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(actividadesData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        navigate('/actividades');
      })
      .catch((error) => {
        console.error('Error:', error);
        navigate('/actividades');
      });

    console.log(actividadesData);
    // window.location.reload();
    event.target.reset();
    navigate('/actividades')

  }


  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270 overflow-auto">
        <Breadcrumb pageName="Formulario para añadir actividades" />
        <form onSubmit={handelFormSubmit}>
          <div className="flex flex-col gap-4">
            <input type="text" name="actividad" id="actividad" placeholder="Nombre de la actividad" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2 dark:bg-[#1A222C] dark:text-white" />

            <input type="date" name="fecha" id="fecha" placeholder="Fecha de la actividad" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2 dark:bg-[#1A222C] dark:text-white" />

            <div className="flex flex-row">
              <input type="number" name="tiempo" id="tiempo" placeholder="Tiempo empleado" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 
            dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2 dark:bg-[#1A222C] dark:text-white" />
              {/* select // dia semana mes año */}
              <select
                name="cantidadTiempo"
                id="cantidadTiempo"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2 dark:bg-[#1A222C] dark:text-white">
                <option value="hora">Hora / Horas</option>
                <option value="dia">Día / Dias</option>
                <option value="semana">Semana / Semanas</option>
                <option value="mes">Mes / Meses</option>
                <option value="año">Año</option>
              </select>
            </div>

            <label htmlFor="Parcelas" className="dark:bg-[#1A222C] dark:text-white">Seleccione la parcela que va ha usar</label>
            <select
              name="nparcela"
              id="nparcela"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2 dark:bg-[#1A222C] dark:text-white">
              <option value=''>Seleccione la parcela</option>
              {parcela.map((parcela) => (
                <option key={parcela.id} value={parcela.id}>
                  ID Parcela {parcela.id} -- Nº SigPac {parcela.nsigpac}
                </option>
              ))}
            </select>

            <label htmlFor="producto" className="dark:bg-[#1A222C] dark:text-white">Seleccione el producto usado</label>
            <select
              name="producto"
              id="producto"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2 dark:bg-[#1A222C] dark:text-white">
              <option value=''>Seleccione el producto</option>
              {productos.map((producto) => (
                <option key={producto.id} value={producto.nombre}>
                  {producto.nombre} -- {producto.tipo}
                </option>
              ))}
            </select>

            <label htmlFor="fistosanitariolist" className="dark:bg-[#1A222C] dark:text-white">Seleccione el fitosaniario usado en la actividad</label>
            <select
              name='fitosanitario'
              id='fitosanitario'
              className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-[#1A222C] dark:text-white'
              required
            >
              <option value=''>Seleccione el fitosanitario</option>
              {fitosanitarioslist.map(fitosanitario => (
                <option key={fitosanitario.id} value={fitosanitario.nombre}>
                  {fitosanitario.sustanciaactiva}
                </option>
              ))}
            </select>
            <label htmlFor="maquinaria" className="dark:bg-[#1A222C] dark:text-white">Seleccione la maquinaria usada</label>
            <select
              name="maquinaria"
              id="maquinaria"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2 dark:bg-[#1A222C] dark:text-white"
            >
              <option value=''>Seleccione la maquinaria</option>
              {maquinaria.map((maquinaria) => (
                <option key={maquinaria.id} value={maquinaria.marca}>
                  {maquinaria.marca} -- {maquinaria.tipo}
                </option>
              ))}
            </select>

            <label htmlFor="personal" className="dark:bg-[#1A222C] dark:text-white">Seleccione el personal empleado en la actividad</label>
            <select
              name="personal"
              id="personal"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 my-2 dark:bg-[#1A222C] dark:text-white"
            >
              <option value=''>Seleccione el personal</option>
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
