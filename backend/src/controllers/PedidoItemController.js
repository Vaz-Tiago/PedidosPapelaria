const sql = require('../config/database');

class PedidoItem {

  async create(req, res){
    const{ 
      produtoId, 
      pedidoId, 
      quantidade, 
      produtoNome,  
      produtoValor,
    } = req.body;

    var pedidoTotal = req.body.pedidoTotal;

    if(quantidade <= 0){
      res.status(400).json({
        message: "A quantidade de itens não pode ser menor ou igual a zero"
      });
    }

    for(let i = 1; i <= quantidade; i++){
      await sql.query(`INSERT INTO pedidoItens (produto_id, pedido_id) 
      VALUES (${produtoId}, ${pedidoId})`, (error)=>{
        if(error){
          res.json(error)
        }
      })
      pedidoTotal = pedidoTotal + produtoValor;
      await sql.query(`UPDATE pedidos SET total = ${pedidoTotal} WHERE id = ${pedidoId}`);
    }

    res.status(201).json({
      message: `${quantidade} produto(s) #${produtoId} adicionado(s) ao pedido, totalizando R$ ${pedidoTotal}`,
      produtoId: produtoId,
      produtoNome: produtoNome,
      produtoValor: produtoValor,
      pedidoId: pedidoId,
      PedidoTotal: pedidoTotal,
    });
  }

  async delete(req, res){
    const{ 
      pedidoItemId,
      produtoId, 
      pedidoId, 
      pedidoTotal,
      finalizado,
      produtoNome,  
      produtoValor,
    } = req.body;

    var total = pedidoTotal - produtoValor;
    
    if(finalizado === 1){
      return res.status(400).json({
        message: 'Este pedido já foi finalizado'
      })
    }
    
    await sql.query(`UPDATE pedidos SET total = ${total} WHERE id = ${pedidoId}`, (error)=>{
      if(error){
        res.json(error)
      }
    });

    await sql.query(`DELETE FROM pedidoItens WHERE id = ${pedidoItemId}`, (error)=>{
      if(error){
        res.json(error)
      }
    });

    res.status(200).json({ 
      message: `Item #${pedidoItemId} deletado com sucesso do pedido #${pedidoId}`,
      pedidoItemId,
      produtoId, 
      pedidoId, 
      produtoNome,  
      produtoValor,
      total
    });

  }

  async index(req, res){
    const id = req.body.pedidoId;

    await sql.query(`
      SELECT 	b.id as pedidoId, b.total as pedidoTotal,
        a.id as itemId,
        c.id as produtoId, c.nome as produtoNome, c.descricao as produtoDescricao, c.valor as produtoValor 
      FROM pedidoItens a 
        INNER JOIN 
        pedidos b ON a.pedido_id = b.id
        INNER JOIN 
        produtos c ON a.produto_id = c.id
      WHERE
        b.id = ${id}`,(error, results)=>{
      if(error){
        res.json(error);
      }
      if(results){
        res.json(results)
      }
    });
  }

}

module.exports = new PedidoItem();
