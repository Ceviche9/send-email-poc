export function generateDocumentValidation({
  order,
  products,
  price,
  installments,
  installmentsValue,
  name,
}: {
  order: number;
  products: string[];
  price: string;
  installments: number;
  installmentsValue: number;
  name: string;
}): string {
  return `<!doctype html>
  <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Email de Contato</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        p {
          margin-bottom: 10px;
        }    
        img {
          width: 40%; /* Faça a imagem ocupar 100% da largura da div */
          height: auto;
          display: block;
          margin-top: 20px;
          margin-left: auto; /* Centraliza a imagem horizontalmente */
          margin-right: auto; /* Centraliza a imagem horizontalmente */
        }
      </style>
    </head>
    <body>
      <div class="container">
        <p>
          Prezado(a) <strong>${name}</strong>, tudo bem? Estamos entrando em 
          contato em razão do pedido de número: <strong>${order}</strong>, 
          onde consta o produto: <strong>${products}</strong>, 
          parcelado em <strong>${installments}x</strong> de <strong>R$ ${installmentsValue}</strong>, 
          totalizando <strong>R$ ${price}</strong>. 
          Ressaltamos que adotamos novas práticas de segurança para a primeira compra via cartão de crédito, 
          iremos prosseguir com os procedimentos de emissão da nota fiscal e envio, assim que os documentos seguintes forem confirmados, 
          são eles:
          ressaltamos que adotamos novas práticas de segurança para a primeira
          compra via cartão de crédito, iremos prosseguir com os procedimentos de
          emissão da nota fiscal e envio, assim que os documentos seguintes forem
          confirmados, são eles:
        </p>
        <ul>
          <li>Foto frente e verso do RG ou CNH</li>
          <li>Foto APENAS da frente do cartão (apenas nome do titular)</li>
        </ul>
        <p>
          Ressaltamos que a compra no cartão precisa ser no mesmo nome do cliente
          cadastrado, o setor de segurança NÃO possui interesse em dados
          financeiros como os números do cartão, desejamos apenas informações que
          comprovem a identidade (RG) e titularidade do cartão (nome do cliente no
          cartão). Desde já agradecemos a atenção, caso possua dúvidas sobre o
          requerimento de dados indicamos a checagem do seguinte site, pois nele
          há informações cedidas pelo Procon a respeito da solicitação de dados
          para compras via cartão de crédito:
          <a
            href="https://www.terra.com.br/economia/direitos-do-consumidor/procon-esclarece-duvidas-nas-compras-com-cartao-de-credito,ec48e6edbf17a410VgnVCM4000009bcceb0aRCRD.html#:~:text=%3A%3A%3A%20A%20loja%20tem%20direito,consumidor%20n%C3%A3o%20pode%20ser%20obrigado"
            target="_blank"
            >Procon</a
          >.
        </p>
        <p>Agradecemos vossa atenção!</p>
        <p>-- Atenciosamente</p>
      </div>
      <img src="https://imgur.com/gXdgnn4.png" alt="Assinatura">
    </body>
  </html>
  `;
}
