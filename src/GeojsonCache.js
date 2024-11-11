import { cargarGeojson, tiposGeometria, calcularLimites } from './_utils.js'

export default class GeojsonCache {
  _status = false
  _geojson = undefined
  _url = undefined

  constructor(url) {
    this._url = url
  }

  get status() {
    return this._status
  }

  /**
   * Url de una capa remota en formato geojson
   * @param {String} url
   */
  set url(url) {
    this._url = url
  }

  /**
   * Carga y los guarda los datos de la capa
   * en el etributo geojson de esta clase
   * @returns Boolean
   */
  async guardarGeojson() {
    await cargarGeojson(this._url).then(data => {
      if (data.hasOwnProperty('features')) {
        this._geojson = JSON.stringify(data)
        this._status = true
      }
    })
    return this._status
  }

  get geojson() {
    if (this._status) {
      return JSON.parse(this._geojson)
    }
    console.log('¡No se ha cargado la capa! Intenta con guardarGeojson()')
    return { features: [] }
  }

  get features() {
    return this.geojson.features
  }

  get properties() {
    return this.features.map(f => f.properties)
  }

  get geometrias() {
    return this.features.map(f => f.geometry)
  }

  get vertices() {
    return this.geometrias.map(g => {
      return g.coordinates.flat(tiposGeometria[g.type].flat)
    })
  }

  get limites() {
    return this.vertices.map(v => calcularLimites(v))
  }

  get limitesTotales() {
    return calcularLimites(this.vertices.flat())
  }

  /**
   * Devuelve el geojson con los datos de la capa
   * aplicando el filtro que llega como parámetro
   * @param {Function} filtro
   * @returns
   */
  geojsonFiltro(filtro) {
    if (typeof filtro === 'function') {
      const _geojson = { ...this.geojson }
      _geojson.features = _geojson.features.filter(filtro)
      return _geojson
    }

    if (filtro !== undefined) {
      console.log('¡No es posible aplicar el filtro!')
    }
    return this.geojson
  }

  featuresFiltro(filtro) {
    return this.geojsonFiltro(filtro).features
  }

  propertiesFiltro(filtro) {
    return this.featuresFiltro(filtro).map(f => f.properties)
  }

  geometriasFiltro(filtro) {
    return this.featuresFiltro(filtro).map(f => f.geometry)
  }

  verticesFiltro(filtro) {
    return this.geometriasFiltro(filtro).map(g => {
      return g.coordinates.flat(tiposGeometria[g.type].flat)
    })
  }

  limitesFiltro(filtro) {
    return this.verticesFiltro(filtro).map(v => calcularLimites(v))
  }

  limitesTotalesFiltro(filtro) {
    return calcularLimites(this.verticesFiltro(filtro).flat())
  }
}

function MultiGeometriaAsWKT(geometria) {
  return `${geometria.type.toUpperCase()} (${geometria.coordinates
    .map(
      multi =>
        `(${multi
          .map(geom => `(${geom.map(xy => xy.join(' ')).join(', ')})`)
          .join(', ')})`
    )
    .join(', ')})`
}
