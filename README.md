# ArtOnline

O ArtOnline é uma plataforma para comprar cópias das suas obras de artes dos seus artistas favoritos.
Sabendo que hoje muito da arte no mundo de hoje é consumida virtualmente, permitimos a compra de arte virtual inspirado pela tecnologia do nft. Você pode comprar artes virtuais e exibir para todo o mundo em nossa plataforma sua incrível coleção. Ou pode apostar em artistas emergentes e ganhar dinheiro revendendo arte.

Venha para o ArtOnline, entre no mundo da arte.

**Grupo:**
Breno Cunha Queiroz - 11218991\
Francisco de Freitas Pedrosa - 11215699\
Thales Willian Dalvi da Silva - 11219196\

## Sumário
- [1.Requisitos](#1-requisitos)
- [2.Descrição do projeto](#2-descrição-do-projeto)
	- [2.1.Diagrama de Navegação](#21-diagrama-de-navegação)
	- [2.2.Dados no Servidor](#22-dados-no-servidor)
- [3.Comentários sobre o código](#3-comentários-sobre-o-código)
- [4.Plano de teste](#4-plano-de-teste)
- [5.Resultado dos testes](#5-resultado-dos-testes)
- [6.Procedimentos para executar](#6-procedimentos-para-executar)
- [7.Problemas](#7-problemas)
- [8.Comentários](#8-comentários)

## 1. Requisitos
Abaixo vamos apresentar requisitos adicionais específicos para o sistema do ArtOnline.
- Deve ser possível que um cliente adicione uma arte digital para venda.
- Na primeira vez que a arte é adiciona ao site, deve se especificar a quantidade de cópias disponíveis.
- Quando um cliente compra uma arte digital, ele deve ganhar a posse sobre a quantidade que ele comprou.
- Deve existir uma página para gerenciar as artes digitais já compradas
- Cada arte digital em nome de um cliente pode, ou não, estar disponível para venda.
- Deve ser possível clicar na imagem do produto para vê-lo em maior resolução.
- Cada cliente possui um link público com todas as artes que tem posse.
- O cliente deve saber o total de dinheiro que conseguiu ganhar com suas artes.

## 2. Descrição do projeto
O ArtOnline um sistema onde pessoas podem comprar e vender artes digitais. Após realizado o cadastro, cada cliente pode comprar uma arte de outro usuário, ou adicionar artes próprias. 

Se o cliente X decidir compra uma arte de outro cliente Y, ele deve entrar na página de detalhes da arte em questão, selecionar a quantidade, e adicionar à sacola. Após isso, o usuário pode processeguir para o checkout, onde insere os dados do cartão (não irá precisar ser dados reais) e finaliza sua compra. Quando isto acontecer, irá diminuir a quantidade de artes disponíveis do cliente Y, e o cliente X terá a quantidade comprada adicionada em seu nome (outra instância no banco de dados).

Se o cliente decidir por realizar um upload, ele deve selecionar um arquivo de imagem, escolher um nome, preço, e total de cópias disponíveis. O sistema irá garantir que nunca irá existir mais cópias do que o especificado inicialmente. Após isto, esta arte estará disponível para outros clientes comprarem.
Vale ressaltar que não irá existir um sistema de retirada do dinheiro, nem serão realizadas transações com dinheiro real.

### 2.1 Diagrama de Navegação
Abaixo apresentamos o diagrama de navegação do site. Nas páginas inicial, busca, e checkout, é possível que o cliente clique em uma das artes para ir para sua página de detalhes. Somente admins terão acesso á edição de cadastros e produtos livre de todos os produtos. Através da página "Minhas artes" é possível que o cliente gerencie suas artes digitais para venda (alterar preço e se está disponível para venda). 

<center>
	<img src="./img/navDiag.png" width="800"/>
</center>

Seguindo o diagrama de navegação, temos as seguintes páginas:\
Clique em _M_ para ir à image do mockup. (criados utilizando [Figma](https://www.figma.com))\
Clique em _H_ para ir à página html.

**Páginas:**
- Página Principal ([M](./mockup/paginaPrincipal.png), [H](./src/pages/index.html))
- Detalhe Arte ([M](./mockup/detalheArte.png))
- Busca (filtro na página inicial)
- Login ([M](./mockup/login.png), [M mobile](./mockup/loginMobile.png))
- Registro ([M](./mockup/registro.png), [M mobile](./mockup/registerMobile.png))
- Sacola ([M](./mockup/sacola.png), [H](./src/pages/public/bag.html))
	- Checkout ([M](./mockup/checkout.png))
- Minhas artes ([M](./mockup/minhasArtes.png))
	- Gerenciar arte existe ([M](./mockup/gerenciarArteExistente.png))
	- Upload nova arte ([M](./mockup/uploadNovaArte.png))
- Admin ([M](./mockup/admin.png), [H](./src/pages/admin/main.html))
	- Lista Artes ([M](./mockup/adminListaArtes.png), [H](./src/pages/admin/list.html))
		- Adicionar Arte ([M](./mockup/adminAdicionarArte.png))
		- Editar Arte ([M](./mockup/adminEditarArte.png), [H](./src/pages/admin/edit.html))
	- Lista Clientes ([M](./mockup/adminListaClientes.png))
		- Adicionar Cliente ([M](./mockup/adminAdicionarCliente.png))
		- Editar Cliente ([M](./mockup/adminEditarCliente.png))
	- Lista Admins ([M](./mockup/adminListaAdmins.png))
		- Adicionar Admin ([M](./mockup/adminAdicionarAdmin.png))
		- Editar Admin ([M](./mockup/adminEditarAdmin.png))

### 2.2 Dados no Servidor
Todos os dados especificados nos requisitos gerais, e nos requisitos da [seção 1](#1-requisitos) serão armazenados em um banco de dados relacional. Apresentamos abaixo os campos das tabelas mais importantes:

_Art {id, name, description, image, price, quantity, quantity_sold, can_sell, owner_id, creator_id, creation}\
Customer {id, name, address, phone, email, password, total_received, token, creation}\
Admin {id, name, username, phone, email, password, token, creation}_

Além disso, o servidor irá prover uma API para permitir a comunicação da aplicação com o banco de dados de acordo com as permissões do usuário. Será possível distinguir entre usuário nos requests a partir do token.

## 3. Comentários sobre o código
O código está disponível na pasta `src`. É possível encontrar as páginas html em `src/pages`, imagens locais na `src/img`, e os arquivos de estilização css em `src/styles`. Os arquivos css estão distribuídos de forma à permitir a reutilização de estilos, a maneira que encontramos para fazer isso foi dividir em `main.css` os estilos utilizados em todo o site, em `admin.css` os estilos utilizados só em página de admin, e assim por diante.

## 4. Plano de teste
Estamos pretendendo utilizar o [jest](https://jestjs.io/pt-BR/) para realizar os testes nas páginas, visto que ele funciona bem com _Vue_ e foi desenvolvido para javascript. Iremos descrever melhor esta seção assim que começarmos a realizar os testes.\
Para testar o backend iremos utilizar o [Postman](https://www.postman.com/), futuramente iremos adicionar um link com a documentação da API gerada pelo Postman.

## 5. Resultado dos testes

## 6. Procedimentos para executar

## 7. Problemas

## 8. Comentários

