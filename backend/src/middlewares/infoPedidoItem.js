const sql = require('../config/database');

module.exports = async (req, res, next) => {
  
  let id = '';

  // Caso parametro venha como id do item
  if(req.params.id){
    id = req.params.id;

    await sql.query(`SELECT * FROM pedidoItens WHERE id=${id} LIMIT 1`, function(err, rows) {
      if (err) throw err;
      if(rows.length > 0){
  
        req.body.pedidoItemId = rows[0].id;
        req.body.produtoId = rows[0].produto_id;
        req.body.pedidoId = rows[0].pedido_id;
  
        return next();
      }
  
      res.status(400).json({message: 'Item não encontrado'});
    });

  // Caso o parametro venha como id do pedido
  } else if(req.params.pedidoid){
    id = req.params.pedidoid

    await sql.query(`SELECT * FROM pedidoItens WHERE pedido_id=${id}`, function(err, rows) {
      if (err) throw err;
      if(rows.length > 0){
  
        req.body.pedidoItemId = rows[0].id;
        req.body.produtoId = rows[0].produto_id;
        req.body.pedidoId = rows[0].pedido_id;
  
        return next();
      }
  
      res.status(400).json({message: 'Item não encontrado'});
    });
    
  }else{
    id = req.body.pedidoId
  }


}