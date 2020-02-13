const sql = require('../config/database');

module.exports = async (req, res, next) => {
  let id = '';

  if(req.params.id){
    id = req.params.id
  }else{
    id = req.body.pedidoId
  }

  await sql.query(`SELECT * FROM pedidos WHERE id=${id} AND finalizado=1`, function(err, rows) {
    if (err) throw err;
    if(rows.length === 0){
      return next();
    }

    res.status(400).json({message: 'Este pedido já foi finalizado'});
  });
}