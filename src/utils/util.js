const API_BASE_URL = 'http://localhost:5000'; // Reemplaza esta URL con la base URL de tu API

export default {
  getActividadesUrl: () => `${API_BASE_URL}/actividades`,
  getActividadUrl: (id) => `${API_BASE_URL}/actividades/${id}`,
  getPersonal: () => `${API_BASE_URL}/personal`,
  getMaquinaria: () => `${API_BASE_URL}/maquinaria`,
  getProductos: () => `${API_BASE_URL}/productos`,
  getFitosanitarios: () => `${API_BASE_URL}/fitosanitarios`,
  getFitosanitariosList: () => `${API_BASE_URL}/fitosanitarioslist`,
  getUsuarios: () => `${API_BASE_URL}/usuarios`,
  getParcelas: () => `${API_BASE_URL}/parcelas`,
  getParcelaID: () => `${API_BASE_URL}/parcelas/:id`,
};
