import { urlService, validarCQL } from './_utils'

export default class GetLegendGraphic {
  _servicio = 'wms'
  _version = '1.3.0'
  _respuesta = 'GetLegendGraphic'
  _formato = 'image/png'
  _transparente = true
  _alto = 20
  _ancho = 20
  _estilo = null

  _capa
  _filtro = null
  _legendOptions

  constructor({ capa, espacioDeTrabajo }) {
    this._capa = capa
    this._url = urlService(espacioDeTrabajo, this._servicio)
    this._legendOptions = new LegendOptions()
  }

  get url() {
    return `${this._url}${this.parametrosEnFormatoURL}`
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

  /**
   * @param {array}
   */
  set dimensiones([ancho, alto]) {
    this._ancho = ancho
    this._alto = alto
  }

  get parametros() {
    return {
      service: this._servicio,
      version: this._version,
      request: this._respuesta,
      format: this._formato,
      layer: this._capa,
      transparent: this._transparente,
      height: this._alto,
      width: this._ancho,
      legend_options: this.legendOptions.asText,
      style: this._estilo,
      cql_filter: this.filtro,
    }
  }

  get parametrosEnFormatoURL() {
    return Object.entries(this.parametros)
      .filter(([, valor]) => valor != undefined) // Filtrar valores con valor
      .map(([id, valor]) => `${id}=${encodeURIComponent(valor)}`)
      .join('&')
  }

  get legendOptions() {
    return this._legendOptions
  }
  get legendOptionsObj() {
    return this._legendOptions.obj
  }
}

/**
 * doc: https://github.com/geoserver/geoserver/blob/main/doc/en/user/source/services/wms/get_legend_graphic/index.rst
 */
class LegendOptions {
  _fontName = 'Montserrat' // (string) el nombre de la fuente que se usará al generar los títulos de las reglas. La fuente debe estar disponible en el servidor.
  _fontStyle = 'normal' // (string) se puede establecer en cursiva o negrita para controlar el estilo del texto. No se permiten otras combinaciones en este momento, pero también podríamos implementarlas.
  _fontSize = 12
  _fontColor = '000000'
  _fontAntiAliasing = true // (true/false) cuando es verdadero, habilita el suavizada para los títulos de las reglas
  _bgColor // (hex) background color for the generated legend, values are expressed in 0xRRGGBB format
  _dpi // (integer) sets the DPI for the current request, in the same way as it is supported by GetMap. Setting a DPI larger than 91 (the default) makes all fonts, symbols and line widths grow without changing the current scale, making it possible to get a high resolution version of the legend suitable for inclusion in printouts
  _forceLabels // "on" means labels will always be drawn, even if only one rule is available. "off" means labels will never be drawn, even if multiple rules are available. Off by default.
  _forceTitles // "off" means layer titles will not be drawn for layer groups. On by default.
  _labelMargin = 10 // margin (in pixels) para usar entre iconos y etiquetas.
  _layout // sets icons layout to be vertical (default) or horizontal.
  _columnheight // enables multicolumn layout when layout is vertical. Each column height is limited by the columnheight value (in pixels).
  _rowwidth // enables multirow layout when layout is horizontal. Each row width is limited by the rowwidth value (in pixels).
  _columns // enables multicolumn layout when layout is vertical. The value is the maximum columns number of legend. The rows used are equal to the next greater integer of <total of icons>/<number of columns>.
  _rows // enables multirow layout when layout is horizontal. The value is the maximum rows number of legend. The columns used are equal to the next greater integer of <total of icons>/<number of rows>.
  _grouplayout // Orientation of groups of layer, possible values are horizontal and vertical (default if not specified).
  _countMatched // When set to true, adds at the end of each label the number of features matching that rule in the current map. Requires extra parameters, see details in the :ref:`dedicated section <content-dependent>`.
  _hideEmptyRules = false
  _wrap // When set to true word wraps long legend labels, leading to taller legends but less wide ones.
  _wrap_limit // when set, it wraps the legend label with the specified number of pixels.

  constructor() {}

  get asObj() {
    return {
      fontName: this._fontName,
      fontStyle: this._fontStyle,
      fontSize: this._fontSize,
      fontColor: this._fontColor,
      fontAntiAliasing: this._fontAntiAliasing,
      labelMargin: this._labelMargin,
      hideEmptyRules: this._hideEmptyRules,
      dy: 0.2,
    }
  }

  /** (integer)
   * nos permite establecer el tamaño de fuente para los distintos
   * elementos de texto. Tenga en cuenta que el tamaño predeterminado
   * en geoserver es 12.
   * @param {number} size
   */
  set fontSize(size) {
    this._fontSize = size
  }

  /** (hex)
   * nos permite establecer el color para el texto de las reglas y
   * etiquetas (ver arriba para recomendaciones sobre cómo crear valores).
   * Los valores se expresan en formato 0xRRGGBB
   * @param {string} color
   */
  set fontColor(color) {
    this._fontColor = color
  }

  /** (true/false)
   * Cuando se establece en true, oculta las reglas que no coinciden
   * con ninguna característica.
   * @param {boolean} val
   */
  set hideEmptyRules(val) {
    this._hideEmptyRules = Boolean(val)
  }

  get asText() {
    return Object.keys(this.asObj)
      .map(op => `${op}:${this.asObj[op]};`)
      .join('')
  }
}
