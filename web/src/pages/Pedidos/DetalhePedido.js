import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Container, Linha, Button } from '../../styles/MainStyle';

import { FaRegTrashAlt } from 'react-icons/fa'

import './detalhe.css';

export default function DetalhePedido(props){
  const pedidoId = sessionStorage.getItem('pedidoId');

  const [itens, setItens] = useState([]);
  const [total, setTotal] = useState('Calculando...');
  const [back, setBack] = useState(false);
  const [inicio, setInicio] = useState(false);


  useEffect(()=>{
    api.get(`/pedidoitens/${pedidoId}`)
    .then((res)=>{
      setItens(res.data)
      setTotal(res.data[0].pedidoTotal)
    }, (error)=>{
      console.log(error)
    })
    
  }, [pedidoId, itens])


  async function handleDelete(id){
    await api.delete(`/pedidoitens/${id}`)
    .then((res)=>{
    }, (error)=>{
      console.log(error)
    })
  }


  async function handleSave(){
    await api.patch(`/pedidos/${pedidoId}`, {
      finalizado: 0
    })
    .then((res)=>{
      console.log(res.data)
      sessionStorage.removeItem('pedidoId')
      setInicio(true);
    }, (error)=>{
      console.log(error)
    })
  }


  async function handleFinish(){
    await api.patch(`/pedidos/${pedidoId}`, {
      finalizado: 1
    })
    .then((res)=>{
      console.log(res.data)
      sessionStorage.removeItem('pedidoId')
      setInicio(true);
    }, (error)=>{
      console.log(error)
    })
  }

  function handleBack(){
    setBack(true);
  }

  if(inicio){
    props.history.push('/')
  }

  if(back){
    props.history.push('/adicionaitem')
  }

  return(
    <Container>
      <h1>Revisar Itens do Pedido</h1>
      <h1>| Pedido #{pedidoId} |</h1>
      <hr />
      <Linha>
        <Button onClick={handleBack}>Voltar</Button>
        <Button onClick={handleSave}>Salvar</Button>
        <Button onClick={handleFinish}>Finalizar</Button>
      </Linha>

      <Linha>
        <table className="listaItens" cellPadding='0' cellSpacing='0'>
          <thead>
            <tr>
              <th>Item</th>
              <th>Produto</th>
              <th>Nome</th>
              <th>Valor</th>
              <th>Remover</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td colSpan="5">
                <div className="links">Valor Total do Pedido R$ {total}</div>
              </td>
            </tr>
          </tfoot>
          <tbody>

            {itens.map(item =>(
            <tr key={item.itemId}>
              <td>{item.itemId}</td>
              <td>{item.produtoId}</td>
              <td>{item.produtoNome}</td>
              <td>R${item.produtoValor}</td>
              <td><button className='botaoRemover' onClick={()=>{handleDelete(item.itemId)}}> < FaRegTrashAlt /></button></td>
            </tr>
          ))}

          </tbody>
        </table>

      </Linha>

      
    </Container>
  )
}