const express = require('express');

// Controllers
const ProdutoController = require('./controllers/ProdutoController');
const PedidoController = require('./controllers/PedidoController');
const PedididoItemController = require('./controllers/PedidoItemController');

//Middlewares
const verificaPedido = require('./middlewares/verificaPedido');
const infoProduto = require('./middlewares/infoProduto');
const infoPedido = require('./middlewares/infoPedido');
const infoPedidoItem = require('./middlewares/infoPedidoItem');



const router = express.Router();

router.get('/', (req, res) => res.json({message: "Teste Desenvolvido para Think4"}));


// Produtos
router.get('/produtos', ProdutoController.index)
router.get('/produtos/:id?',ProdutoController.search);

// Pedidos
router.get('/pedidos', PedidoController.index);
router.post('/pedidos', PedidoController.create);
router.patch('/pedidos/:id', verificaPedido, PedidoController.update);

// PedidoItens
router.post(
  '/pedidoitens', 
  verificaPedido, infoProduto, infoPedido, 
  PedididoItemController.create
);

router.delete(
  '/pedidoitens/:id', 
  infoPedidoItem, infoProduto, infoPedido, 
  PedididoItemController.delete
);

router.get(
  '/pedidoitens/:pedidoid', 
  infoPedidoItem, infoProduto, infoPedido, 
  PedididoItemController.index
);


module.exports = router;
