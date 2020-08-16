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
Para execução tanto do web service, aplicação backend, quanto a da interface do usuário web, aplicação frontend, e também do plugin WooCommerce (adotada pela dupla), basta seguir os passos seguintes.

#### 1.1 WooCommerce
...

#### 1.2 Web Service
...

#### 1.3 Interface Web (Cliente)
...


### 2. Controle à falhas
No web service nas seguintes situações... são realizados os controles de falhas... blá blá blá. Algo importante a ressaltar que as falhas ocorridas e capturadas pelo web service são apresentadas para o usuário de forma amigável na interface cliente a partir de toasts, as quais aparecem no canto superior direito, melhorando assim a experiência do usuário. 

COLOCAR IMAGENS DOS TOASTS DE SUCESSO E ERRO


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



  



