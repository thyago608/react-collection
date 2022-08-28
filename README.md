<p align="center">
 <img src="/public/logo.png" alt="collection" />
</p>
<br>

## Sobre

O projeto **React Collection**, é uma plataforma de gerenciamento de produtos. O mesmo foi desenvolvido dentro de um período de 4 dias, afim de cumprir o prazo estipulado para um teste. <br><br>

## Desafio Proposto:

**Descrição do teste:**

A tarefa consiste em criar uma lista de materiais e um modal para edição e inserção de novos materiais, seguindo os detalhes:
	
Lista: a lista deve conter cards com a imagem do material (url_thumbnail), a descrição(description)  e a linha (line);
Modal: o modal de alteração deve conter os mesmos campos da listagem, exceto o url_thumbnail.

**Observações:**

A listagem e o modal devem ser responsivos;
Na listagem, incluir um campo texto para buscar os materiais, por descrição e linha;
Opções de editar e excluir o material na listagem;

<br>

## Desenvolvimento

Foi desenvolvido o proposto pelo teste, além de adicionar a funcionalidade de páginação e fornecido ao usuário a possibilidade de escolha de imagem no modal de CRIAÇÃO, assim respeitando as definições do teste.

<br>

## Tecnologias utilizadas

- [JSON-Server](https://www.npmjs.com/package/json-server)
- [Next.js](https://nextjs.org/)
- [React](https://pt-br.reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Sass](https://sass-lang.com/)
- [Axios](https://axios-http.com/docs/intro)
- [React Query](https://tanstack.com/query/v4)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction/)

<br>

## Sobre as Tecnologias Utilizadas:

**Next.js**: Framework que fornece uma estrutura de aplicações ReactJS.

**Typescript**: Superset para realizar a tipagem das informações.

**Sass**: Pré-processador css para realizar estilização da aplicação.

**Axios**: Cliente HTTP para o consumo de dados.

**React-Query**: Biblioteca que facilita busca, o armazenamento em cache, sincronização e a atualização do estado do servidor.

**Json-Server**: Biblioteca que gera uma api fake para o consumo, criação, atualização,e remoção de dados.

**React Toastify**: Biblioteca que fornece notificações rápidas para o usuário. 

**React Icons**: Biblioteca de ícones.

<br>

## Sobre os dados utilizados:

Para o teste, foi fornecido pela empresa **Collection** uma lista de produtos que poderia ser utilizado como Mock.
Foi criado uma api fake através do JSON-Server, utilizando a listagem de produtos fornecida.

<br>

## Como baixar o projeto

```bash
 # Clonar repositório
 $ git clone https://github.com/thyago608/react-collection

 # Entrar no diretório da aplicação
 $ cd react-collection

 # Baixar as dependências
 $ yarn install

# SERÁ NECESSÁRIO UTILIZAR DOIS TERMINAIS!!

 # Executando o JSON-Server
 $ yarn server
    
 # Executando a aplicação
 $ yarn dev
```
<br>

Desenvolvido por Thyago Ribeiro 👋
