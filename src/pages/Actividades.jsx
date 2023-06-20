import DefaultLayout from "../layout/DefaultLayout";
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import { useEffect, useState } from 'react';
import ReactApexChart from "react-apexcharts";


const Actividades = () => {
  const [actividades, setActividades] = useState([]);
  const [totalActividades, setTotalActividades] = useState(0);
  const [actividadesHechas, setActividadesHechas] = useState(0);
  const [actividadesPendientes, setActividadesPendientes] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/actividades')
      .then(response => response.json())
      .then(data => {
        setActividades(data);

        // Calcular el número total de actividades
        setTotalActividades(data.length);

        // Calcular el número de actividades hechas
        const actividadesHechas = data.filter(actividad => actividad.estado);
        setActividadesHechas(actividadesHechas.length);

        // Calcular el número de actividades pendientes
        const actividadesPendientes = data.filter(actividad => !actividad.estado);
        setActividadesPendientes(actividadesPendientes.length);
      })
      .catch(error => {
        console.error('Error al obtener los datos de las actividades:', error);
      });
  }, []);


  const handleActualizarActividad = (actividad) => {
    // Realizar la solicitud PUT al servidor para actualizar la actividad
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
      return actividad
    }
    );
    setActividades(newActividades);
    handleActualizarActividad({ id, estado });
    console.log(newActividades);
    // alert("Actividad actualizada correctamente");
    window.location.reload();
  };

  const actividadesOrdenadas = actividades.sort((a, b) => b.id - a.id);
  const actividadesLimitadas = actividadesOrdenadas.slice(0, 7);

  // Ordenar las actividades por hecho si o no
  const actividadesOrdenadasHechas = actividades.filter(actividad => actividad.hecho === false);


  const actividadesHechasGrafico = actividades.filter(actividad => actividad.hecho).length;
  const actividadesPendientesGrafico = actividades.filter(actividad => !actividad.hecho).length;

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      width: 250,
      stacked: false,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 2,
      colors: ["#fff"]
    },
    series: [],
    xaxis: {
      categories: ['Actividades'],
    },
    yaxis: {
      title: {
        text: undefined
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val
        }
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40
    }
  }

  const series = [{
    name: "Actividades Totales",
    data: [totalActividades],
    color: '#010101'
  }, {
    name: "Actividades Hechas",
    data: [actividadesHechasGrafico],
    color: '#10B981',

  }, {
    name: "Actividades Pendientes",
    data: [actividadesPendientesGrafico],
    color: '#DC3545',
  }]



  return (
    <DefaultLayout>
      <div className="max-w-570 mx-auto my-10 col-span-12 rounded-sm border border-stroke ">
        <div className="max-w-570 mx-auto my-5">
          {/* Bloque de estadísticas */}
          <div className="flex justify-center gap-4">
            <div className="flex gap-4">
              <div>
                <h2 className="text bg-green-400 px-4 py-2 rounded-md">Total de Actividades: {totalActividades} </h2>
              </div>
              <div>
                <h2 className="text-primary bg-primary-400 px-4 py-2 rounded-md">Actividades Hechas: {actividades.filter(actividad => actividad.hecho).length} </h2>
              </div>
              <div>
                <h2 className="text-danger bg-danger-400 px-4 py-2 rounded-md">Actividades Pendientes: {actividades.filter(actividad => !actividad.hecho).length}</h2>
              </div>
            </div>
          </div>

          {/* Bloque de gráfica */}
          <div className="flex justify-center gap-4">
            <ReactApexChart
              options={chartOptions}
              series={series}
              type="bar"
              height={350}
              width={550}
            />
          </div>
        </div>
      </div>

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
            {actividadesOrdenadasHechas.map((actividad) => (
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
                      className="text-succes bg-green-400 px-4 py-2 rounded-md"
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
    </DefaultLayout >
  );
};

export default Actividades;
