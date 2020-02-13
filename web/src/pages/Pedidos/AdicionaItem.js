import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Container, Linha } from '../../styles/MainStyle';
import './pedidos.css';

export default function AdicionaItem(props){

  const pedidoId = sessionStorage.getItem('pedidoId');

  const [produtoId, setProdutoId] = useState('');
  const [item, setItem] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [erro, setErro] = useState(false)
  const [retorno, setRetorno] = useState('Adicione itens ao seu pedido');
  const [next, setNext] = useState(false);


  useEffect(()=>{
    api.get(`/produtos/${produtoId}`)
    .then((res)=>{
      if(res.data[0]){
        setItem(res.data[0])
        setErro(false);
      }else{
        setErro(true);
      }
     
    }, (error)=>{
      console.log(error)
    })
  }, [produtoId])

  useEffect(()=>{
    let divErro = document.querySelector('.erro')
    let botaoAdicionar = document.querySelector('#botaoAdicionar')
    if(!erro){
      divErro.style.opacity = '0';
      botaoAdicionar.disabled = false;
    }else{
      divErro.style.opacity = '100%';
      botaoAdicionar.disabled = true;
    }
  },[erro, produtoId])


  function handleProductChange(e){
    setProdutoId(e.target.value);
  }

  function handleQuantityChange(e){
    setQuantidade(e.target.value);
  }

  async function handleAddItem(){
    await api.post('/pedidoitens', {
      pedidoId: pedidoId,
      produtoId: produtoId,
      quantidade: quantidade
    })
    .then((res)=>{
      setRetorno(res.data);
    }, (error)=>{
      console.log(error);
    });
  }

  function handleNextStep(){
    setNext(true);
  }

  if(next){
    props.history.push('/detalhepedido')
  }

  return(
    <Container>

      <h1>Adicione Itens ao Pedido</h1>
      <h1>| Pedido #{pedidoId} |</h1>
      <hr />

      <Linha>
        <div className='erro'>Produto Não Encontrado</div>
        <hr />
      </Linha>

      <Linha>
        <p className='retornoSucesso'>{retorno.message}</p>
      </Linha>


      <div className='conteudoPedido'>
        <div className='acaoPedido'>
          <div>
            <input 
                type='text'
                value='#ID'
                disabled
                className='inputAdd'
              />
              <input 
                type='number' 
                min='1'
                placeholder='Produto ID' 
                onChange={handleProductChange} 
                className='inputAdd'
              />
          </div>
          <div>
            <input 
              type='text'
              value='QTD'
              disabled
              className='inputAdd'
            />
            <input 
              type='number' 
              min='1'
              max='100'
              placeholder='Quantidade' 
              onChange={handleQuantityChange} 
              className='inputAdd' 
            />
          </div>
          <button id='botaoAdicionar' className='botaoAddItens' onClick={handleAddItem}>
            <span>
              Adicionar
            </span>
          </button>
        </div>

        <div className='itemDescricao'>
          id: {item.id} <br/>
          nome: {item.nome} <br/>
          descricao: {item.descricao} <br/>
          valor: {item.valor} <br/>
        </div>

      </div>

      <Linha>
        <button className='botaoAddItens' onClick={handleNextStep}>
          Revisar Pedido
        </button>
      </Linha>

    </Container>
  )
}