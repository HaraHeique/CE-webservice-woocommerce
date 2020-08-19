# CE-webservice-woocommerce
O trabalho em questão é da disciplina de CE (Comércio Eletrônico), do curso de graduação de Bacharelado de Sistema de Informação do IFES - Serra, pelo docente Filipe Mutz.

### Informações gerais
- **Autores**: Harã Heique e Joel Will
- **Principais Ferramentas**:  WordPress, WooCommerce, NestJs, TypeORM, MySql, JavaScript, HTML, CSS e Bootstrap
- **Ambiente de desenvolvimento**: Visual Studio Code (versão 1.35.1+)

<p align="center">
    <img src="./docs/images/logo.png" alt="logo da marca" title="Logo Beauty Control" width="300" height="400"/>
</p>

O trabalho consiste em prover uma interface RESTful para o sistema de comércio eletrônico voltado para beleza desenvolvido, chamado **Beauty Control**, o qual foi criado através do plugin WooCommerce.
Uma observação importante a ser feita é que ao invés de esta interface ser consumida por uma CLI para alimentar a base de dados do e-commerce, ela é consumimda por uma aplicação cliente web, o qual também será descrita e detalhada ao longo da explicação das etapas deste trabalho.

### 1. Como executar?
Para execução tanto do *web service*, aplicação backend, quanto a da *interface do usuário web*, aplicação frontend, e também do plugin *WooCommerce* (adotada pela dupla), basta seguir os passos seguintes. 

**OBS**.: Todos os testes foram feitos no **Windows 10**.

#### 1.1 WooCommerce
- Para utilizar o WooCommerce basicamente é necessário baixar e iniciar o WAMP ou XAMP, com MySQL e o APACHE, após isto criar um banco de dados utilizado no e-commerce e logo depois baixar e iniciar o Wordpress e por fim instalar o plugin WooCommerce. Para mais detalhes de como utilizar a tecnologia basta seguir este [link](https://drive.google.com/file/d/1WXa7nEO55oRmkdD-6l8sI07nZUfCudiQ/view) que contém um vídeo com todas as etapas realizado na primeira etapa do trabalho.

**OBS**.: Crie um banco com nome **wordpress**, assim como é mostrado no vídeo do link acima.

#### 1.2 Web Service
- Instale o [Node.js](https://nodejs.org/en/);
- Instale o Framework [NestJS](https://nestjs.com/) com o comando:

```console
npm i -g @nestjs/cli
```

- Abra o terminal no diretório **/webservice** dentro do projeto e execute o seguinte comando:

```console
npm install
```

- Em seguida, execute o backend com o comando abaixo:

```console
npm run start
```

Também pode ser utilizado o comando abaixo:

```console
nest start 
```

#### 1.3 Interface Web (Cliente)
- Instale http-server com o comando

```console
npm i -g http-server
```

- Abra o terminal no diretório **/client** dentro do projeto e execute o comando abaixo:

```console
http-server -a localhost -o views/index.html
```

Após executar o comando acima irá abrir automaticamente a interface no seu navegador padrão na url http://localhost:8080/views/index.html.

**OBS.:** Caso ocorra um erro de SSL no Google Chrome (redireciona automaticamente de http para https) execute os passos do link: https://stackoverflow.com/questions/25277457/google-chrome-redirecting-localhost-to-http.


### 2. Controle à falhas
No web service nas seguintes situações são realizados os controles de falhas: 

**OBS.:** Algo importante a ressaltar que as falhas ocorridas e capturadas pelo web service são apresentadas para o usuário de forma amigável na interface cliente a partir de toasts, as quais aparecem no canto superior direito, melhorando assim a experiência do usuário.

- Na inserção e atualização de produtos, caso o valor ou a quantidade forem negativos como é mostrado na imagem abaixo.

<p align="center">
    <img src="./docs/images/erro-valor-negativo.png" alt="erro de valor negativo" title="Erro de valor negativo na inserção ou atualização do produto"/>
</p>

- Em qualquer operação que receba um identificador, se o identificador não existir na base de dados como é mostrado na imagem abaixo.

<p align="center">
    <img src="./docs/images/erro-id-invalido.png" alt="erro de ID inválido" title="Erro de ID não existente na base de dados"/>
</p>

### 3. Requisições ao web service
Ao contrário do que foi proposto, como dito anteriormente, foi criado uma interface web para facilitar tanto nos testes e consumo mais mais fácil e amigável possível ao usuário. Logo abaixo contém imagens com suas respectivas explicações de cada teste solicitado no trabalho.

#### 3.1 Listar todos os produtos

#### 3.2 Listar um único produto

#### 3.3 Inserir produto

#### 3.4 Atualizar produto

#### 3.5 Remover produto

#### 3.6 Obter estatísticas de vendas


### 4. Tabelas e queries utilizadas
Abaixo é apresentado uma tabela com as requisições e suas respectivas tabelas e raw queries utilizadas para as funcionalidades da aplicação:

Funcionalidade|Verbo HTTP|Tabelas|Query
---|---|---|---
**Listar produtos**|GET||
**Listar produto**|GET||
**Inserir produto**|POST||
**Atualizar produto**|PUT||
**Remover produto**|DELETE||
**Obter estatísticas**|GET||


### Informações adicionais
Todo o código fonte está hospedado no [GitHub](https://github.com/HaraHeique/CE-webservice-woocommerce).



  



