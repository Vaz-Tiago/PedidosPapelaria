import styled from 'styled-components';

export const Container = styled.div`

  max-width: 800px;
  background: #eee;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0,0,0, 0.2);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    margin: 15px;
  }

`;

export const Linha = styled.div`

  display: flex;
  flex-direction: row;
  margin: 20px;
  justify-content: space-between;
  align-items: center;

  @media(max-width: 600px ) {
    flex-direction: column;
  }

`;

export const Button = styled.button`

  background: #0d2636;
  border: 0;
  border-radius: 4px;
  margin: 15px;
  width: 300px;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #eee;

`;


