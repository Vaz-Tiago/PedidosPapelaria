import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Main from './pages/Home/Main';
import AdicionaItem from './pages/Pedidos/AdicionaItem';
import DetalhePedido from './pages/Pedidos/DetalhePedido';
import ListaPedidos from './pages/Pedidos/ListaPedidos';

export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path = '/' component = { Main } />
        <Route path = '/adicionaitem' component = { AdicionaItem } />
        <Route path = '/detalhepedido' component = { DetalhePedido } />
        <Route path = '/listapedidos' component = { ListaPedidos } />
      </Switch>
    </BrowserRouter>
  )
}