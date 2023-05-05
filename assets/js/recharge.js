var funcionarios = [];

function limparCampos() {
  document.getElementById("nome").value = '';
  document.getElementById("diasTrabalhados").value = '';
  document.getElementById("qtdAlmocos").value = '';
  document.getElementById("qtdJantares").value = '';
  document.getElementById("nome").focus();
}

function adicionarFuncionario() {
  var nome = document.getElementById("nome").value;
  var diasTrabalhados = document.getElementById("diasTrabalhados").value;
  var qtdAlmocos = document.getElementById("qtdAlmocos").value;
  var qtdJantares = document.getElementById("qtdJantares").value;

  // Verifica se algum dos campos está vazio
  if (nome === "" || diasTrabalhados === "" || qtdAlmocos === "" || qtdJantares === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  var funcionario = {
    nome: nome,
    diasTrabalhados: diasTrabalhados,
    qtdAlmocos: qtdAlmocos,
    qtdJantares: qtdJantares
  };

  funcionarios.push(funcionario);

  atualizarTabela();
  limparCampos();
}

function atualizarTabela() {
  var tabela = document.getElementById("tabelaFuncionarios");
  tabela.innerHTML = "<tr><th>Nome</th><th>Dias Trabalhados</th><th>Quantidade de Almoços</th><th>Quantidade de Jantares</th><th></th></tr>";

  for (var i = 0; i < funcionarios.length; i++) {
    var funcionario = funcionarios[i];
    var row = tabela.insertRow(i + 1);

    var nomeCell = row.insertCell(0);
    nomeCell.innerHTML = funcionario.nome;

    var diasCell = row.insertCell(1);
    diasCell.innerHTML = funcionario.diasTrabalhados;

    var almocosCell = row.insertCell(2);
    almocosCell.innerHTML = funcionario.qtdAlmocos;

    var jantaresCell = row.insertCell(3);
    jantaresCell.innerHTML = funcionario.qtdJantares;

    var removerCell = row.insertCell(4);
    var removerBtn = document.createElement("button");
    removerBtn.innerHTML = "<i class='bx bx-trash' style='font-size:20px'></i>";
    removerBtn.id = i;
    removerBtn.onclick = function() {
      funcionarios.splice(this.id, 1);
      atualizarTabela();
    };
    removerCell.appendChild(removerBtn);

  }
}

function enviarEmail() {

  var centroCusto = prompt("Informe o centro de custo:");
  
  if (nome === "" || diasTrabalhados === "" || qtdAlmocos === "" || qtdJantares === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (!centroCusto) {
    alert("Informe o centro de custo")
    return;
  }
  var nomeProjeto = prompt("Informe o nome do projeto:");
  if (!nomeProjeto) {
    alert("Informe o nome do Projeto")
    return;
  }

  // Cria a mensagem de e-mail
  var message = {
    "subject": "Relatório de Funcionários",
    "body": {
      "contentType": "Text",
      "content": ""
    },
    "toRecipients": [
      {
        "emailAddress": {
          "address": "diego.tavares@3geoconsult.com.br"
        }
      }
    ]
  };

  // Adiciona o corpo do e-mail
  var corpoEmail = "";
  
  corpoEmail += "Centro de Custo: " + centroCusto + "\n";
  corpoEmail += "Nome do Projeto: " + nomeProjeto + "\n\n";

  for (var i = 0; i < funcionarios.length; i++) {
    var funcionario = funcionarios[i];

    corpoEmail += "Nome: " + funcionario.nome + "\n";
    corpoEmail += "Dias trabalhados: " + funcionario.diasTrabalhados + "\n";
    corpoEmail += "Quantidade de almoços: " + funcionario.qtdAlmocos + "\n";
    corpoEmail += "Quantidade de jantares: " + funcionario.qtdJantares + "\n\n";
  }

  message.body.content = corpoEmail;

  // Autentica a solicitação usando o token de acesso
  var accessToken = "<eyJ0eXAiOiJKV1QiLCJub25jZSI6Il8wVWxYS2lGbTY3ZHRIQWRFOFFOc1BDV0M4WlI3QXFhQks3TUwtR0U2SUEiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9jMjc3ZGNlNy00NmVmLTRjYzEtOGJlOS1kZDkxNWQwMmU3ODYvIiwiaWF0IjoxNjgzMzE0NTAzLCJuYmYiOjE2ODMzMTQ1MDMsImV4cCI6MTY4MzMxOTAyMywiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkUyWmdZTWdVY1YxMlI5VlBzZXJ5THpjYjdkV0tjVXJMSnJhWVhiNnphWTIzOHM1UWxXZ0EiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkdyYXBoIiwiYXBwaWQiOiI0YmRmNDM0My1hOWI1LTQ3OWItOGVkYS04YTg0MGE5ODI5YmQiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6IlRhdmFyZXMiLCJnaXZlbl9uYW1lIjoiRGllZ28iLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxODkuMTIzLjI1LjE5OCIsIm5hbWUiOiJEaWVnbyBUYXZhcmVzIiwib2lkIjoiOWQzZWE5NjEtYTI2OC00NmZmLWE3ZTYtYmU4NDhjYWQxZTBiIiwicGxhdGYiOiIxNCIsInB1aWQiOiIxMDAzMjAwMjFGNDU1NkM2IiwicmgiOiIwLkFTVUE1OXgzd3U5R3dVeUw2ZDJSWFFMbmhnTUFBQUFBQUFBQXdBQUFBQUFBQUFBbEFFcy4iLCJzY3AiOiJlbWFpbCBVc2VyLlJlYWQgcHJvZmlsZSBvcGVuaWQiLCJzdWIiOiJ5SjZYcUVQTkdEbFc1UkFSUTBXc3dfSUJUQWk0NGwzSXRVUnJqMV9MeGRjIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IlNBIiwidGlkIjoiYzI3N2RjZTctNDZlZi00Y2MxLThiZTktZGQ5MTVkMDJlNzg2IiwidW5pcXVlX25hbWUiOiJkaWVnby50YXZhcmVzQDNnZW9jb25zdWx0LmNvbS5iciIsInVwbiI6ImRpZWdvLnRhdmFyZXNAM2dlb2NvbnN1bHQuY29tLmJyIiwidXRpIjoiSDg5Ul8tNFlEVXlFSGNCc2JvY1dBUSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19zdCI6eyJzdWIiOiJEWGw5RlMxYnJtZGEzamZwMnRUcU1mdHNwaWFTZGt1NWVCcC0wdGJRQWljIn0sInhtc190Y2R0IjoxNTI3NjE4NjE1fQ.KdURh7SzPSAWoAtyVMe6h_tcZmch4hk3V8yjGtwOaDNkqAhHMsBDyZPNzSzPo6lmOZmaI1_AOYFlaUHriqC154Dzce7YO3ilvOUHH8bwe0GPjLcnip0gXx3hyTRIce7CfD6fQ5lf6qVw-5DNCrg6IZEWvJrw9Udq4IhSia2H0DDTbSPsSpogo4r75pb6mxjhrJVChQ15hYJ4NpyezxstkRC_1RbGqgGr5FKXOs64IJsNK2sZC6w0BSWEuo4wgwOXOdNMDUfTOve5qjMY0EK1qNilQE4VwPP8yOwSODysa9Vmeg1rJnexCdWwnvJqdsh121Tr5hrQEEOUt6Xj4xoagw>";

  var requestHeaders = {
    "Authorization": "Bearer " + accessToken,
    "Content-Type": "application/json"
  };

  // Envia a mensagem de e-mail
  var sendEmailUrl = "https://outlook.office.com/api/v2.0/me/sendmail";

  var xhr = new XMLHttpRequest();
  xhr.open("POST", sendEmailUrl, true);
  xhr.setRequestHeader("Authorization", requestHeaders.Authorization);
  xhr.setRequestHeader("Content-Type", requestHeaders["Content-Type"]);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 202) {
        console.log("Mensagem enviada com sucesso.");
      } else {
        console.log("Falha ao enviar a mensagem.");
      }
    }
  };
  xhr.send(JSON.stringify(message));
}

