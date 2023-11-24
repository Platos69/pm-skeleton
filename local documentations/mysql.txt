/*Comandos essenciais: 
Para acessar com todas as permissões: sudo mysql -h localhost -u root -p

Criar banco de dados: CREATE DATABASE NOME_BANCO;

Mostrar bancos de dados: SHOW DATABASES;

Entrar em um banco de dados: USE NOME_BANCO;

Mostrar tabelas: SHOW TABLES;

Criar tabelas: 
CREATE TABLE NOME_TABELA(
  NOME_DADO1 (VALOR DO DADO)VARCHAR(50),
  NOME_DADO2 (VALOR DO DADO)VARCHAR(100),
  NOME_DADO3 (VALOR DO DADO)INT(2)
);/*criar tabela e os tipos de dados são: blob, texto, numero, inteiro*/

Adicionar valor às tabelas: 
INSERT INTO NOME_TABELA(NOME_DADO1, NOME_DADO2, NOME_DADO3) VALUES/*valores tem que ser em ordem!!*/(
  'VALOR_DADO1', 
  'VALOR_DADO2',
  VALOR_DADO3
);

Listar dados da tabela: SELECT * FROM NOME_TABELA;

Listar com especificidade: SELECT * FROM NOME_TABELA WHERE NOME_DADO /*OPERADORES*/ = VALORDESEJADO;

Deletar toda à tabela: DELETE FROM NOME_TABELA;

Deletar uma linha através de um dado: DELETE FROM NOME_TABELA WHERE NOME_DADO /*OPERADORES*/ = VALORDESEJADO;

Atualizar todos os dados da tabela: UPDATE NOME_TABELA SET NOME_DADO /*OPERADORES*/ = VALORDESEJADO;

Atualizar algum o dado da tabela: UPDATE NOME_TABELA SET NOME_DADO /*OPERADORES*/ = VALORDESEJADO WHERE NOME_DADO /*OPERADORES*/ = VALORDESEJADO;
*/
