const sql = require('../config/database');

module.exports = async (req, res, next) => {
  
  if (req.params.pedidoid){
    var pedidoId = parseInt(req.params.pedidoid)
  }else {
    var pedidoId = req.body.pedidoId
  }
  await sql.query(`SELECT * FROM pedidos WHERE id=${pedidoId} LIMIT 1`, function(err, rows) {
    if (err) throw err;
    if(rows.length > 0){

      req.body.pedidoTotal = rows[0].total;
      req.body.finalizado = rows[0].finalizado;
      
      return next();
    }

    res.status(400).json({message: 'Pedido não encontrado'});
  });
}