// import url_servidor_mapas from './entorno'

export function urlService(url_servidor_mapas, service, workspace) {
  return `${[url_servidor_mapas, workspace, service]
    .filter(i => i)
    .map(d => (d.slice(-1) == '/' ? d.slice(0, -1) : d)) // Esta línea hace que no haya diagonales consecutivas "//" en el path
    .join('/')}?`
}

export function validarCQL(cql) {
  return cql.replace(/^\s\s*/, '').replace(/\s\s*$/, '') != ''
    ? `${cql.trim()} `
    : null
}

/**
 * Consulta los datos de una capa remota en formato geojson
 * @returns Promise
 */
export async function cargarGeojson(url) {
  const respuesta = await fetch(url)
  if (respuesta.ok) return respuesta.json()
  else {
    console.info(respuesta)
    return { features: [] }
  }
}

export function calcularLimites(vertices) {
  // xmin, ymin, xmax, ymax
  return [
    Math.min(...vertices.map(vertice => vertice[0])),
    Math.min(...vertices.map(vertice => vertice[1])),
    Math.max(...vertices.map(vertice => vertice[0])),
    Math.max(...vertices.map(vertice => vertice[1])),
  ]
}

export const tiposGeometria = {
  MultiPolygon: {
    flat: 2,
  },
}
