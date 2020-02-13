const sql = require('../config/database')

class ProdutoController {

  async index(req, res) {
    await sql.query('SELECT * FROM produtos', (error, results)=>{
      if(error){
        res.json(error)
      }else {
        res.json(results)
      }
    });
  }

  async search(req, res){
    let filter = '';
    const id = parseInt(req.params.id);
    if(id){
      filter = ` WHERE id = ${id}`;
    }
    await sql.query(`SELECT * FROM produtos ${filter}`, (error, results)=>{
      if(error){
        res.json(error);
      }
      if(results){
        res.json(results);
      }
    });
  }

}

module.exports = new ProdutoController();