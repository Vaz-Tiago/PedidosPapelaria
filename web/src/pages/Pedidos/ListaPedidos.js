import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Container, Linha, Button } from '../../styles/MainStyle';
import { FaCheck, FaEdit } from 'react-icons/fa'

export default function ListaPedidos(props){

  const [pedidos, setPedidos] = useState([]);
  const [back, setBack] = useState(false);
  const [editar, setEditar] = useState(false);

  useEffect(()=>{
    api.get(`/pedidos`)
    .then((res)=>{
      setPedidos(res.data)
    }, (error)=>{
      console.log(error)
    })
  },[]);


  function handleEdit(id){
    sessionStorage.setItem('pedidoId', id)
    setEditar(true)
  }

  if(editar){
    props.history.push('/adicionaitem')
  }

  if(back){
    props.history.push('/')
  }


  return(
    <Container>
      <h1>Lista de Pedidos</h1>
      <hr />

      {pedidos.length === 0 ? 
        <Linha>
          <h1>Nenhum Pedido Feito</h1>
        </Linha>
      :
        <Linha>
          <table className="listaItens" cellPadding='0' cellSpacing='0'>
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Valor</th>
                <th>Criado</th>
                <th>Atualizado</th>
                <th>Status</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td colSpan="5">
                  <div className="links"></div>
                </td>
              </tr>
            </tfoot>
            <tbody>

              {pedidos.map(pedido =>(
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>R${pedido.total}</td>
                <td>{pedido.criado}</td>
                <td>{pedido.atualizado}</td>
                <td>
                  {!pedido.finalizado  ? 
                  <button className='botaoRemover' onClick={()=>handleEdit(pedido.id)}> < FaEdit /></button>
                  :
                  <button className='botaoRemover' disabled> < FaCheck /></button>
                }
                </td>
              </tr>
            ))}

            </tbody>
          </table>

        </Linha>

      }

      <Linha>
        <Button onClick={()=>{setBack(true)}}>Voltar</Button>
      </Linha>
    </Container>
  )
}