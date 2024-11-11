import GetMap from './GetMap.js'
import GetLegendGraphic from './GetLegendGraphic.js'
import GetFeature from './GetFeature.js'

export default class GeoserverCapa {
  // WMS
  _getMap
  _getLegendGraphic

  // WFS
  _getFeature

  constructor({ capa }) {
    this.id = capa.includes(':') ? capa.split(':')[1] : capa
    this.espacioDeTrabajo = capa.includes(':') ? capa.split(':')[0] : ''
    this._getMap = new GetMap({ capa, espacioDeTrabajo: this.espacioDeTrabajo })
    this._getLegendGraphic = new GetLegendGraphic({
      capa,
      espacioDeTrabajo: this.espacioDeTrabajo,
    })

    this._getFeature = new GetFeature(capa, this.espacioDeTrabajo)
  }

  get getMap() {
    return this._getMap
  }

  get getLegendGraphic() {
    return this._getLegendGraphic
  }

  get getFeature() {
    return this._getFeature
  }

  /**
   * @param {string} filtro
   */
  set filtro(filtro) {
    this.getMap.filtro = filtro
    this.getLegendGraphic.filtro = filtro

    this.getFeature.filtro = filtro
  }

  /**
   * Recibe cómo parámetro el nombre del sld que se requiere aplicar a la capa
   * @param {string} sld_name
   */
  set estilo(sld_name) {
    this.getMap.estilo = sld_name
    this.getLegendGraphic.estilo = sld_name
  }
}
