import React, { useState } from 'react';
import api from '../../services/api';
import { Container, Linha, Button } from '../../styles/MainStyle';

export default function Main(props){

  const [criar, setCriar] = useState(false);
  const [listar, setListar] = useState(false);

  async function novoPedido(){
    await api.post('/pedidos')
    .then((res)=>{
      sessionStorage.setItem('pedidoId', res.data.pedidoId);
    }, (error) => {
      console.log(error);
    });

    setCriar(true);
  }

  function handleListar(){
    setListar(true)
  }
  
  if(criar){
    props.history.push('/adicionaitem')
  }

  if(listar){
    props.history.push('/listapedidos')
  }
  return(
    <Container>

      <h1>Pedidos Papelaria</h1>
      <h1>Tiago Vaz - API REST</h1>
      <hr />

      <Linha>
        
        <Button onClick = {()=> novoPedido()}>
          Novo Pedido
        </Button>

        <Button onClick = {handleListar}>
          Listar Pedidos
        </Button>
      </Linha>

    </Container>
  )
}
