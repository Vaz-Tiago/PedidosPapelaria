const sql = require('../config/database');

class PedidoController {
  async index(req, res){
    
    await sql.query('SELECT * FROM pedidos', (error, results)=>{
      if(error){
        res.json(error);
      }else{
        res.json(results);
      }
    });
    
  }

  async create(req, res){
    const finalizado = 0

    await sql.query(`INSERT INTO pedidos (finalizado) 
    VALUES (${finalizado})`, (error, results)=>{
      if(error) {
        res.json(error);
      } else{
        res.json({ 
          message: 'Pedido aberto com sucesso', 
          pedidoId: results.insertId 
        });
      }
    });

  }


  async update(req, res){
    const id = parseInt(req.params.id);
    const status = req.body.finalizado;
    await sql.query(`UPDATE pedidos SET finalizado = ${status} WHERE id = ${id}`, function(err, rows, fields) {
      if (err) throw err;
      res.json({message: status === 0 ?  `Pedido ${id} Salvo` : `Pedido ${id} Finalizado`});
    });
  }

}

module.exports = new PedidoController();