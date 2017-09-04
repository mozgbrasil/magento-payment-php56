[checkmark]: https://raw.githubusercontent.com/mozgbrasil/mozgbrasil.github.io/master/assets/images/logos/logo_32_32.png "MOZG"
![valid XHTML][checkmark]

[url-method]: http://www.payment.com.br/
[requerimentos]: http://mozgbrasil.github.io/requerimentos/
[contact-payment]: http://www.payment.com.br/payment/ecp/comunidade.do?app=portal&pg=20004&view=faleconosco
[tickets]: https://cerebrum.freshdesk.com/support/tickets/new
[preco]: http://www.cerebrum.com.br/preco/
[getcomposer]: https://getcomposer.org/
[uninstall-mods]: https://getcomposer.org/doc/03-cli.md#remove
[artigo-composer]: http://mozg.com.br/ubuntu/composer
[ioncube-loader]: http://www.ioncube.com/loaders.php
[acordo]: http://mozg.com.br/acordo-licenca-usuario-final/

# Mozg\Payment

## Sinopse

Integração a [Payment][url-method]

## Motivação

Atender o mercado de módulos para Magento oferecendo melhorias e um excelente suporte

## Suporte / Dúvidas

Para obter o devido suporte [Clique aqui][tickets], relatando o motivo da ocorrência o mais detalhado possível e anexe o print da tela para nosso entendimento

## Preço

[Clique aqui][preco]

## Recursos

- Autorização, Consulta, Captura, Reembolso

## Característica técnica

No checkout é feito o processo de autorização para o método de pagamento

Em seguida é feito acesso para a notificação da transação

O status do pedido deve ficar como Revisão do pagamento

Em seguida é processada a notificação pelo backend em Payment_Event_Queue ou via Cron

----
## Recorrencia

Para  o processo para recorrencia devendo informar o mesmo PaymentId

1 - Finalizar o pedido

2 - Pegar o pspReference e informar em PaymentId

http://127.0.0.1/public_html/magento-1.9.3.0-dev32/mozg_payment/process/notification/PaymentId/b6f727e7-2f19-422b-84a8-d0230b431dde/

No uso de RECURRING_CONTRACT 

Acesse em app/code/local/Mozg/Payment/Model/Api.php

Altere em recurringDetailReference sendo o PaymentId

Execute o Queue

Verá no historico do pedido "Criado o contrato de faturamento "
-----

## Instalação - Atualização - Desinstalação - Desativação

--

Este módulo destina-se a ser instalado usando o [Composer][getcomposer]

Execute o seguinte comando no terminal, para visualizar a existencia do Composer e sua versão

	composer --version

Caso não tenha o Composer em seu ambiente, sugiro ler o seguinte artigo [Clique aqui][artigo-composer]

--

É necessário que o servidor tenha o suporte a extensão [ionCube PHP Loader][ioncube-loader]

Para visualizar se essa extensão está ativa em seu servidor

Certique se da presença do arquivo phpinfo.php na raiz do seu projeto

	<?php phpinfo(); ?>

Caso não exista o arquivo phpinfo.php na raiz do projeto Magento, crie o mesmo adicionado o conteúdo acima

Acesse o arquivo pelo browser

Em seguida pesquise pelo termo "ionCube PHP Loader"

Caso o seu servidor não tenha o suporte a extensão, [Clique aqui][ioncube-loader]

Em "Loader Downloads API", efetue download do pacote compatível com o seu servidor

Descompacte o pacote e faça upload do arquivo "loader-wizard.php" para seu servidor, onde será demonstrado o passo a passo para a ativação da extensão

[Clique aqui](https://youtu.be/GZ2J6MLkko4) para ver os processos executados

--

Para utilizar o(s) módulo(s) da MOZG é necessário aceitar o [Acordo de licença do usuário final][acordo]

--

Sugiro manter um ambiente de testes para efeito de testes e somente após os devidos testes aplicar os devidos procedimento no ambiente de produção

--

Sugiro efetuar backup da plataforma Magento e do banco de dados

--

Antes de efetuar qualquer atualização no Magento sempre mantenha o Compiler e o Cache desativado

--

Certique se da presença do arquivo composer.json na raiz do seu projeto Magento e que o mesmo tenha os parâmetros semelhantes ao modelo JSON abaixo

	{
	  "minimum-stability": "dev",
	  "prefer-stable": true,
	  "license": [
	    "proprietary"
	  ],
	  "repositories": [
	    {
	      "type": "composer",
	      "url": "https?://packages.firegento.com"
	    }
	  ],
	  "extra": {
	    "magento-root-dir": "./",
	    "magento-deploystrategy": "copy",
	    "magento-force": true
	  }
	}

Caso não exista o arquivo composer.json na raiz do projeto Magento, crie o mesmo adicionado o conteúdo acima

### Para instalar o módulo execute o comando a seguir no terminal do seu servidor no diretório do seu projeto

	composer require mozgbrasil/magento-payment-php56:dev-master

Você pode verificar se o módulo está instalado, indo ao backend em:

	STORES -> Configuration -> ADVANCED/Advanced -> Disable Modules Output

--

### Para atualizar o módulo execute o comando a seguir no terminal do seu servidor no diretório do seu projeto

Antes de efetuar qualquer processo que envolva atualização no Magento é recomendado manter o Compiler e Cache desativado

	composer clear-cache && composer update

Na ocorrência de erro, renomeie a pasta /vendor/mozgbrasil e execute novamente

Para checar a data do módulo execute o seguinte comando

	grep -ri --include=*.json 'time": "' ./vendor/mozgbrasil

--

### Para [desinstalar][uninstall-mods] o módulo execute o comando a seguir no terminal do seu servidor no diretório do seu projeto

	composer remove mozgbrasil/magento-payment-php56 && composer clear-cache && composer update

--

### Para desativar o módulo

1. Antes de efetuar qualquer processo que envolva atualização sobre o Magento é necessário manter o Compiler e Cache desativado

2. Caso queira desativar os módulos da MOZG renomeie a seguinte pasta app/code/local/Mozg

A desativação do módulo pode ser usado para detectar se determinada ocorrência tem relação com o módulo

## Como configurar o método de entrega

Antes de configurar o módulo você deve cadastrar o CEP de origem, indo ao backend em:

	STORES -> Configuration -> Sales/Shipping Settings -> Origin

Para configurar o método de entrega, acesse no backend em:

	STORES -> Configuration -> Sales/Shipping Methods -> Payment (powered by MOZG)

Você terá os campos a seguir

### • **Ativar**

Para "ativar" ou "desativar" o uso do método

### • **Ordem de exibição**

É a ordem apresentada em métodos de entrega no passo de fechamento de pedido

### • **Título**

Nome do método que deve ser exibido

### • **Serviços**

Selecione os serviços desejado, para selecionar mais de um, segure a tecla "Ctrl" e clique nos serviços

### • **Serviço Para Entrega Gratuita**

Quando houver um desconto de frete grátis, esse serviço terá o valor zero

### • **Calcular taxa de manuseio**

Podendo ser fixo ou percentual

### • **Taxa de Manuseio**

Será adicionado o valor ao frete

### • **Mostrar método se não aplicável**

Quando configurado como "Não", caso seja retornado algum serviço com erro, não será exibido o método de entrega

### • **Debug**

Deve ser armazenado os processos do módulo em var/log/

O arquivo 

<DATE>_mozg.log

se trata de log do módulo sendo um log mais detalhado contendo todos os processos inclusive das execuções realizadas pelas bibliotecas externas do módulo

O arquivo

shipping_<METHOD>.log

se trata de log nativo do magento relativo ao método de entrega

### • **Enviar para países aplicáveis**

Você pode definir se o método deve funcionar para "Todos os Países aceito" ou "Especificar Países "

### • **Enviar para países específicos**

Você deve selecionar os países que o método deve ser funcional

### • **Tipo de Produto a ser transportado**

Tipo de Produto a ser transportado

### • **CPF ou CNPJ do cliente que será responsável pelo pagamento**

Preencha nesse campo o número do CPF ou CNPJ vinculado ao contrato com a Payment

### • **Filial da Payment que irá efetuar a coleta da mercadoria e emitir o CTRC do cliente.**

Filial da Payment que irá efetuar a coleta da mercadoria e emitir o CTRC do cliente.

### • **Nome do Município de origem da Mercadoria. Mesmo Município do Cliente Responsável**

Nome do Município de origem da Mercadoria. Mesmo Município do Cliente Responsável.

### • **Sigla do Estado de origem**

Sigla do Estado de origem

### • **Exibir Prazo de Entrega**

Se será ou não mostrado o prazo de entrega para seu cliente

### • **Mensagem que Exibe o Prazo de Entrega**

Se será ou não mostrado o prazo de entrega para seu cliente

### • **Adicionar (dias) ao prazo de entrega**

Quantidade de dias que será adicionado ao prazo

### • **Mostrar serviço com retorno de erro**

Quando configurado como "Não", caso seja retornado algum serviço com erro, o mesmo não deve ser exibido no método de entrega

## Quais os recursos do módulo

- [✓] Cálculo do frete
- [✓] Rastreamento

## Perguntas mais frequentes "FAQ"

### Como conferir os valores dos fretes junto a transportada

Você pode visualizar no log os parâmetros enviado a transportada

Quando finalizado o pedido é armazenado no historico as dimensões da caixa que foi usada para o obter o frete

### Como aplicar o Frete Grátis

Na configuração do módulo para o método de entrega é possível definir o "Serviço Para Entrega Gratuita" recurso que deve ser aplicado quando definido a ação de "Frete Grátis" nas "Regras da Promoção"

No Backend do Magento, acesse o menu: Promoções -> Regras de Promoção -> Criar regra -> Crie uma regra e defina na aba "Ações" o uso do Frete Grátis

Dessa forma na exibição do cálculo do frete será exibido para o serviço escolhido o valor zerado

Esse recurso se trata de regra nativa do Magento caso tenha algum problema sugiro desativar todas as regras de promoção e ativar uma de cada vez até encontrar o motivo da ocorrência

### Dados de contato - Payment

Comercial - Payment <comercial.bhz@bhz.payment.com.br>

Entre em contato com o setor comercial da JAMEF  
Solicite a habilitação da sua conta como cliente para acesso ao webservice da JAMEF  
Fone: (31) 2102-8808  
Fax: (31) 2102-8803

TI - Payment

Em caso de dúvidas, favor entrar em contato com a equipe de TI da Payment através do telefone

Tel.: (31) 2102-8904 - Suporte TI

brunoferreira@bhz.payment.com.br - Suporte TI

lucas@bhz.payment.com.br - Suporte TI

vagnero@bhz.payment.com.br - Suporte TI

rejaine@bhz.payment.com.br - Suporte TI

andreluiz@bhz.payment.com.br - Gerente de TI

ou acesse

Para entrar em contato com a [Payment][contact-payment]

## Manual

http://www.payment.com.br/payment/ecp/comunidade.do?evento=portlet&pIdPlc=ecpTaxonomiaMenuPortal&app=portal&tax=21381&lang=pt_BR&pg=20004&taxn=20035&taxp=0&

## Contribuintes

Equipe Mozg

## License

[Comercial License](LICENSE.txt)

## Badges

[![Join the chat at https://gitter.im/mozgbrasil](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mozgbrasil/)
[![Latest Stable Version](https://poser.pugx.org/mozgbrasil/magento-payment-php56/v/stable)](https://packagist.org/packages/mozgbrasil/magento-payment-php56)
[![Total Downloads](https://poser.pugx.org/mozgbrasil/magento-payment-php56/downloads)](https://packagist.org/packages/mozgbrasil/magento-payment-php56)
[![Latest Unstable Version](https://poser.pugx.org/mozgbrasil/magento-payment-php56/v/unstable)](https://packagist.org/packages/mozgbrasil/magento-payment-php56)
[![License](https://poser.pugx.org/mozgbrasil/magento-payment-php56/license)](https://packagist.org/packages/mozgbrasil/magento-payment-php56)
[![Monthly Downloads](https://poser.pugx.org/mozgbrasil/magento-payment-php56/d/monthly)](https://packagist.org/packages/mozgbrasil/magento-payment-php56)
[![Daily Downloads](https://poser.pugx.org/mozgbrasil/magento-payment-php56/d/daily)](https://packagist.org/packages/mozgbrasil/magento-payment-php56)
[![Reference Status](https://www.versioneye.com/php/mozgbrasil:magento-payment-php56/reference_badge.svg?style=flat-square)](https://www.versioneye.com/php/mozgbrasil:magento-payment-php56/references)
[![Dependency Status](https://www.versioneye.com/php/mozgbrasil:magento-payment-php56/1.0.0/badge?style=flat-square)](https://www.versioneye.com/php/mozgbrasil:magento-payment-php56/1.0.0)

:cat2:
