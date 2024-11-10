import { urlService, validarCQL } from './_utils'

export default class GetMap {
  _servicio = 'wms'

  _capa
  _filtro = null
  _estilo = null

  constructor({ capa, espacioDeTrabajo }) {
    this._capa = capa
    this._url = urlService(espacioDeTrabajo, this._servicio)
  }

  get url() {
    return this._url
  }

  /**
   * @param {string}
   */
  set filtro(cql) {
    this._filtro = validarCQL(cql)
  }
  get filtro() {
    return this._filtro
  }

  /**
   * Recibe cómo parámetro el nombre del sld que se requiere aplicar a la capa
   * @param {string} sld_name
   */
  set estilo(sld_name) {
    this._estilo = sld_name
  }

  get parametros() {
    return {
      LAYERS: this._capa,
      STYLES: this._estilo,
      cql_filter: this.filtro,
    }
  }
}
