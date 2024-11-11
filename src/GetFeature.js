import GeojsonCache from './GeojsonCache.js'
import { /*urlService,*/ validarCQL } from './_utils.js'

export default class GetFeature {
  _servicio = 'wfs'
  _version = '2.0.0'
  _respuesta = 'GetFeature'
  _formato = 'application/json'

  _capa
  _filtro = null
  _cache

  constructor(capa, espacioDeTrabajo) {
    this._capa = capa
    // this._url = urlService(espacioDeTrabajo, this._servicio)
    this._cache = new GeojsonCache(this.url)
  }

  // get url() {
  //   return `${this._url}${this.parametrosEnFormatoURL}`
  // }

  /**
   * @param {string}
   */
  set filtro(cql) {
    this._filtro = validarCQL(cql)
    this.cache.url = this.url
  }
  get filtro() {
    return this._filtro
  }

  get _parametrosGeoserver() {
    return {
      service: this._servicio,
      version: this._version,
      request: this._respuesta,
      typeNames: this._capa,
      outputformat: this._formato,
      // propertyName: this.campos,
      count: this._cantidad,
      // sortBy: this.orden,
      cql_filter: this.filtro,
    }
  }

  get parametrosEnFormatoURL() {
    return Object.entries(this._parametrosGeoserver)
      .filter(([, valor]) => valor) // Filtrar valores con valor
      .map(([id, valor]) => `${id}=${encodeURIComponent(valor)}`)
      .join('&')
  }

  get cache() {
    return this._cache
  }
}
