var funcionarios = [];

function adicionarFuncionario() {
    var nome = document.getElementById("nome").value;
    var diasTrabalhados = document.getElementById("diasTrabalhados").value;
    var qtdAlmocos = document.getElementById("qtdAlmocos").value;
    var qtdJantares = document.getElementById("qtdJantares").value;

    var funcionario = {
        nome: nome,
        diasTrabalhados: diasTrabalhados,
        qtdAlmocos: qtdAlmocos,
        qtdJantares: qtdJantares
    };

    funcionarios.push(funcionario);

    atualizarTabela();
}

function atualizarTabela() {
    var tabela = document.getElementById("tabelaFuncionarios");
    tabela.innerHTML = "<tr><th>Nome</th><th>Dias Trabalhados</th><th>Quantidade de Almoços</th><th>Quantidade de Jantares</th></tr>";

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
    }
}

function enviarEmail() {
    var corpoEmail = "";

    for (var i = 0; i < funcionarios.length; i++) {
        var funcionario = funcionarios[i];

        corpoEmail += "Nome: " + funcionario.nome + "\n";
        corpoEmail += "Dias trabalhados: " + funcionario.diasTrabalhados + "\n";
        corpoEmail += "Quantidade de almoços: " + funcionario.qtdAlmocos + "\n";
        corpoEmail += "Quantidade de jantares: " + funcionario.qtdJantares + "\n\n";
    }

    var assuntoEmail = "Relatório de Funcionários";
    var emailDestino = "exemplo@exemplo.com";
    var emailCorpo = "mailto:" + emailDestino + "?subject=" + encodeURIComponent(assuntoEmail) + "&body=" + encodeURIComponent(corpoEmail);

    window.location.href = emailCorpo;
}
