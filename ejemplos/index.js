import GetLegendGraphic from "./../src/GetLegendGraphic.js";

const capa = new GetLegendGraphic({
  capa:'salu_unidades_medicas_1n_clues_21_xy_p',
  espacioDeTrabajo: 'x',
})
capa._formato = 'application/json'
capa._legendOptions = undefined

console.log(capa);
console.log(capa.parametrosEnFormatoURL);
