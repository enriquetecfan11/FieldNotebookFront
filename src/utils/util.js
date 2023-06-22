const API_BASE_URL = 'http://192.168.1.100:5000'; // Reemplaza esta URL con la base URL de tu API

/*
  Actividades
  Actividad ID
  Personal
  Maquinaria
  Productos
  fitosantarioslist
  fitosanitarios

*/


export default {
  getActividadesUrl: () => `${API_BASE_URL}/actividades`,
  getActividadUrl: (actividadId) => `${API_BASE_URL}/actividades/${actividadId}`,
  getPersonal: () => `${API_BASE_URL}/personal`,
  getMaquinaria: () => `${API_BASE_URL}/maquinaria`,
  getProductos: () => `${API_BASE_URL}/productos`,
  getFitosanitarios: () => `${API_BASE_URL}/fitosanitarios`,
  getFitosanitariosList: () => `${API_BASE_URL}/fitosanitarioslist`,
};