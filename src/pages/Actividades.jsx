import DefaultLayout from "../layout/DefaultLayout";
import { useEffect, useState } from 'react';
import ReactApexChart from "react-apexcharts";
import { Link } from 'react-router-dom';

const Actividades = () => {
  const [actividades, setActividades] = useState([]);
  const [totalActividades, setTotalActividades] = useState(0);
  const [actividadesHechas, setActividadesHechas] = useState(0);
  const [actividadesPendientes, setActividadesPendientes] = useState(0);
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroProducto, setFiltroProducto] = useState('');
  const [filtroPersonal, setFiltroPersonal] = useState('');
  const [filtroParcela, setFiltroParcela] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/actividades')
      .then(response => response.json())
      .then(data => {
        setActividades(data);

        setTotalActividades(data.length);

        const actividadesHechas = data.filter(actividad => actividad.hecho).length;
        setActividadesHechas(actividadesHechas);

        const actividadesPendientes = data.filter(actividad => !actividad.hecho).length;
        setActividadesPendientes(actividadesPendientes);

      })
      .catch(error => {
        console.error('Error al obtener los datos de las actividades:', error);
      });
  }, []);

  const handleActualizarActividad = (actividad) => {
    fetch(`http://localhost:5000/actividades/${actividad.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hecho: actividad.estado }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Actividad actualizada:', data);
      })
      .catch(error => {
        console.error('Error al actualizar la actividad:', error);
      });
  };

  const handleEstadoChange = (id, estado) => {
    const newActividades = actividades.map(actividad => {
      if (actividad.id === id) {
        return { ...actividad, estado };
      }
      return actividad;
    });
    setActividades(newActividades);
    handleActualizarActividad({ id, estado });
  };

  const actividadesFiltradas = actividades.filter(actividad => {
    const fecha = new Date(actividad.fecha.split('T')[0]);
    let cumpleFiltros = true;

    if (filtroFecha && fecha.getTime() !== new Date(filtroFecha).getTime()) {
      cumpleFiltros = false;
    }
    if (filtroProducto && actividad.producto !== filtroProducto) {
      cumpleFiltros = false;
    }
    if (filtroPersonal && actividad.personal !== filtroPersonal) {
      cumpleFiltros = false;
    }
    if (filtroParcela && actividad.nparcela !== filtroParcela) {
      cumpleFiltros = false;
    }
    if (filtroEstado && actividad.hecho.toString() !== filtroEstado) {
      cumpleFiltros = false;
    }

    return cumpleFiltros;
  });

  const actividadesHechasGrafico = actividades.filter(actividad => actividad.hecho).length;
  const actividadesPendientesGrafico = actividades.filter(actividad => !actividad.hecho).length;

  const options = {
    labels: ['Actividades Hechas', 'Actividades Pendientes'],
    colors: ['#34c38f', '#f46a6a'],
    legend: {
      show: false
    }
  };

  const series = [actividadesHechasGrafico, actividadesPendientesGrafico];

  return (
    <DefaultLayout>
      <h1 className="text-xl font-bold mb-2 text-center">Actividades</h1>
      {/* Bloque de estadísticas */}
      <div className="flex justify-center gap-4">
        <div>
          <h2 className="text bg-green-400 px-4 py-2 rounded-md">Total de Actividades: {totalActividades} </h2>
        </div>
        <div>
          <h2 className="text-primary bg-primary-400 px-4 py-2 rounded-md">Actividades Hechas: {actividadesHechas} </h2>
        </div>
        <div>
          <h2 className="text-danger bg-danger-400 px-4 py-2 rounded-md">Actividades Pendientes: {actividadesPendientes}</h2>
        </div>
      </div>

      {/* Bloque de filtros */}
      <h2 className="text-xl font-bold mt-2 text-center">Filtrado de tabla</h2>
      <div className="flex justify-center mt-2">
        <input type="date" value={filtroFecha} onChange={e => setFiltroFecha(e.target.value)}
          className="font-bold mb-2 mr-5 text-center"
        />
        <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)}
          className="font-bold mb-2 mr-5 text-center"
        >
          <option value="">Filtar por estado</option>
          <option value="true">Hechas</option>
          <option value="false">Pendientes</option>
        </select>
        <Link to="/anadiractividades" className="btn btn-primary font-bold mb-2 mr-5 text-center">Añadir Actividades</Link>
      </div>
      <div className="">

        <div className="actividades-lista">
          <div className="flex flex-col ga  p-4 items-center justify-center">
            <h2 className="text-xl font-bold mb-2 text-center">Tabla de Actividades</h2>
            <table className=''>
              <thead className=''>
                <tr>
                  <th className="px-4 py-2">Actividad</th>
                  <th className="px-4 py-2">Fecha</th>
                  <th className="px-4 py-2">Tiempo de Ejecucion</th>
                  <th className="px-4 py-2">Nº Parcela</th>
                  <th className="px-4 py-2">Producto</th>
                  <th className="px-4 py-2">Personal</th>
                  <th className="px-4 py-2">Estado actividad</th>
                </tr>
              </thead>
              <tbody>
                {actividadesFiltradas.map((actividad) => (
                  <tr className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-separate border border-slate-500' key={actividad.id}>
                    <td className="px-4 py-2">{actividad.actividad}</td>
                    <td className="px-4 py-2">{actividad.fecha.split('T')[0]}</td>
                    <td className="px-4 py-2">{actividad.tiempo}</td>
                    <td className="px-4 py-2">{actividad.nparcela}</td>
                    <td className="px-4 py-2">{actividad.producto}</td>
                    <td className="px-4 py-2">{actividad.personal}</td>
                    <td className="px-4 py-2">
                      {/* if hecho is equal to true  no input */}
                      {actividad.hecho ? (
                        <button
                          onClick={() =>
                            handleEstadoChange(actividad.id, true)
                          }
                          className="text-primary bg-green-400 px-4 py-2 rounded-md"
                        >
                          Hecho
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleEstadoChange(actividad.id, false)
                          }
                          className="text-danger bg-blue-400 px-4 py-2 rounded-md"
                        >
                          Pendiente
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex">
            <div className="flex flex-col ga  p-4 items-center justify-center">
              <h2 className="text-xl font-bold mb-2 text-center">Gráfico de Actividades</h2>
              <ReactApexChart options={options} series={series} type="pie" width={380} />
            </div>
          </div>
        </div>      </div>
    </DefaultLayout>
  );
};

export default Actividades;
