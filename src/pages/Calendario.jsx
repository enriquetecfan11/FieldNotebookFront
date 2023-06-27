import React, { useState, useEffect } from 'react';
import { isSameDay, startOfMonth, endOfMonth, addMonths, eachDayOfInterval } from 'date-fns';
import { Badge, Button } from 'antd';
import DefaultLayout from '../layout/DefaultLayout';
import ReactWeather, { useOpenWeather } from 'react-open-weather';

const CalendarioActividades = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [actividades, setActividades] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    fetch('http://localhost:5000/actividades')
      .then(response => response.json())
      .then(data => {
        setActividades(data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de las actividades:', error);
      });
  }, []);

  const filteredActividades = actividades.filter(actividad =>
    isSameDay(new Date(actividad.fecha), selectedDate)
  );

  const startDate = startOfMonth(currentMonth);
  const endDate = endOfMonth(currentMonth);
  const daysOfMonth = eachDayOfInterval({ start: startDate, end: endDate });

  const handlePrevMonth = () => {
    setCurrentMonth(prevMonth => addMonths(prevMonth, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(nextMonth => addMonths(nextMonth, 1));
  };

  const { data, isLoading, errorMessage } = useOpenWeather({
    key: '959d55cbfd41bca8951a491bde080a8c',
    lat: '36.7292',
    lon: '-4.4293',
    lang: 'es',
    unit: 'metric',
    showForecast: true,
  });

  const customStyles = {
    fontFamily: 'Helvetica, sans-serif',
    gradientStart: '#355842',
    gradientMid: '#355842',
    gradientEnd: '#355842',
    forecastBackgroundColor: '#355842',
    locationFontColor: '#ffff',
    todayTempFontColor: '#ffff',
    todayDateFontColor: '#ffff',
    todayRangeFontColor: '#ffff',
    todayDescFontColor: '#ffff',
    todayInfoFontColor: '#ffff',
    todayIconColor: '#ffff',
    forecastSeparatorColor: '#ffff',
    forecastDateColor: '#ffff',
    forecastDescColor: '#ffff',
    forecastRangeColor: '#ffff',
    forecastIconColor: '#ffff',
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Calendario de Actividades</h1>
        <div className="flex justify-center mb-4">
          <Button className='bg-black hover:bg-blue-400 text-white font-bold border-b-4 border-blue-700 hover:border-blue-500 rounded dark:text-white' type="primary" icon="left" onClick={handlePrevMonth} />
          <span className="mx-4 text-lg font-semibold dark:text-white">
            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <Button className='bg-black hover:bg-blue-400 text-white font-bold border-b-4 border-blue-700 hover:border-blue-500 rounded dark:text-white' type="primary" icon="right" onClick={handleNextMonth} />
        </div>
        <div className="flex justify-center">
          <div className="w-full sm:w-1/2">
            <div className="grid grid-cols-7 gap-2">
              {daysOfMonth.map(day => {
                const hasActivities = actividades.some(actividad =>
                  isSameDay(new Date(actividad.fecha), day)
                );

                const dayClasses = `text-center p-2 rounded ${isSameDay(day, selectedDate)
                  ? 'bg-graydark text-white'
                  : hasActivities
                    ? 'bg-graydark-500 text-meta-5'
                    : 'bg-gray-200 dark:text-white'
                  }`;

                return (
                  <div
                    key={day.toISOString()}
                    className={dayClasses}
                    onClick={() => setSelectedDate(day)}
                  >
                    {day.getDate()}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full sm:w-1/2">
            {filteredActividades.length > 0 ? (
              <ul className="mt-4">
                <h2 className="text-xl font-bold mb-2 text-center">Actividades para el día seleccionado</h2>
                {filteredActividades.map(actividad => (
                  <li key={actividad.id} className="flex items-center mb-2">
                    <Badge color="blue" className="mb-2 mt-9 mr-2" />
                    <span className='dark:text-white'>{actividad.actividad}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xl font-bold mb-2 text-center dark:text-white">No hay actividades para esta fecha.</p>
            )}
          </div>
        </div>
        <div className="mt-9 flex flex-col items-centr mb-5">
          <p className="text-lg font-semibold dark:text-white">Leyenda del calendario</p>

          <div className='flex flex-col sm:flex-row m-1'>
            <div className="flex items-center mb-4 m-1">
              <Badge color="blue" className="mr-2" />
              <span className='dark:text-white'>Actividades para el día seleccionado</span>
            </div>
            <div className="flex items-center mb-4 m-1">
              <Badge color="graydark" className="mr-2" />
              <span className='bg-graydark text-white '>Día seleccionado</span>
            </div>
            <div className="flex items-center mb-4 m-1">
              <Badge color="gray" className="mr-2" />
              <span className='dark:text-white'>Días sin actividades</span>
            </div>
          </div>
        </div>
        
        <ReactWeather 
          isLoading={isLoading}
          errorMessage={errorMessage}
          data={data}
          lang="es"
          locationLabel="Malaga"
          unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
          theme={customStyles}
        />
      </div>

    </DefaultLayout >
  );
};

export default CalendarioActividades;
