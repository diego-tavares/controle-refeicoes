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
    removerBtn.innerHTML = "<i class='bx bx-trash'></i>";
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
  var accessToken = "<9d3ea961-a268-46ff-a7e6-be848cad1e0b>";

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

