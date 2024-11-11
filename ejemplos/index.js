import { GetLegendGraphic, utils } from "./../src/index.js";

const capa = new GetLegendGraphic({
  capa:'salu_unidades_medicas_1n_clues_21_xy_p',
  espacioDeTrabajo: 'x',
})
capa._formato = 'application/json'
capa._legendOptions = undefined

console.log(capa);
// console.log(capa.parametrosEnFormatoURL);

console.log(utils.urlService('gema.conahcyt.mx/geoserver', 'wms') + capa.parametrosEnFormatoURL);
