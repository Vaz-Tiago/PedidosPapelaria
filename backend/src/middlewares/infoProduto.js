const sql = require('../config/database');

module.exports = async (req, res, next) => {
  
  let produtoId = req.body.produtoId

  await sql.query(`SELECT * FROM produtos WHERE id=${produtoId} LIMIT 1`, function(err, rows) {
    if (err) throw err;
    if(rows.length > 0){

      req.body.produtoNome = rows[0].nome;
      req.body.produtoValor = rows[0].valor;

      return next();
    }

    res.status(400).json({message: 'Produto não encontrado'});
  });
}