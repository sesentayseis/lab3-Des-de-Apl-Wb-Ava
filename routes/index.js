var express = require('express');
var router = express.Router();

// Ruta para el Paso 1
router.get('/', function(req, res, next) {
  res.render('paso1');
});

// Ruta para el Paso 2
router.post('/paso2', function(req, res, next) {
  console.log(req.body.curso +' funcion paso2')
  res.render('paso2', { curso: req.body.curso });
});

// Ruta para el Paso 3
router.post('/paso3', function(req, res, next) {
  console.log('paso3')
  
  console.log(req.body.curso)
  console.log(req.body.modulo)
  var modulos = req.body.modulo || [];
  res.render('paso3', { curso: req.body.curso, modulos: modulos});
  
});

// Ruta para el detalle y el total a pagar
router.post('/detalle', function(req, res, next) {
  console.log('- detalle -');
  var curso = req.body.curso;
  console.log(req.body.curso);
  var modulos = req.body.modulos;
  var modulos=modulos.split(',');
  console.log(req.body.modulos + '  cantidad:'+modulos.length);
  console.log(typeof req.body.modulos)
  var pago = req.body.pago;
  console.log(req.body.pago);
  var total = 0;

  // Calcular el total a pagar basado en el curso y los módulos seleccionados
  if (curso === 'Java') {
    total = modulos.length * 1200;
  } else if (curso === 'PHP') {
    total = modulos.length * 800;
  } else if (curso === '.NET') {
    total = modulos.length * 1500;
  }

  // Aplicar descuento del 10% si el pago es en efectivo
  if (pago === 'Efectivo') {
    total = total - (total * 0.1);
  }

  res.render('detalle', { curso: curso, modulos: modulos, pago: pago, total: total });
});

module.exports = router;
