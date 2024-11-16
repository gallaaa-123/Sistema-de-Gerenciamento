// Variável para armazenar o índice do animal a ser editado
let animalParaEditar = null;

// Função para salvar ou atualizar os dados do animal
function salvarAnimal(event) {
    event.preventDefault(); // Previne o envio do formulário

    // Obtendo os dados dos campos do formulário
    const nome = document.getElementById('nome').value;
    const especie = document.getElementById('especie').value;
    const idade = document.getElementById('idade').value;
    const peso = document.getElementById('peso').value;
    const pelagem = document.getElementById('pelagem').value;
    const castrado = document.getElementById('castrado').value;
    const lesao = document.getElementById('lesao').value;
    const localizacaoLesao = document.getElementById('localizacaoLesao').value;
    const teveFilhotes = document.getElementById('teveFilhotes').value;
    const quantidadeFilhotes = document.getElementById('quantidadeFilhotes').value;

    // Criando o objeto do animal
    const animal = {
        nome,
        especie,
        idade,
        peso,
        pelagem,
        castrado,
        lesao,
        localizacaoLesao,
        teveFilhotes,
        quantidadeFilhotes
    };

    // Obtendo os animais salvos no localStorage
    let animais = JSON.parse(localStorage.getItem('animais')) || [];

    if (animalParaEditar !== null) {
        // Atualizando o animal existente
        animais[animalParaEditar] = animal;
        animalParaEditar = null; // Resetando o índice após a edição
        alert('Animal atualizado com sucesso!');
    } else {
        // Adicionando o novo animal à lista
        animais.push(animal);
        alert('Animal cadastrado com sucesso!');
    }

    // Salvando a lista atualizada no localStorage
    localStorage.setItem('animais', JSON.stringify(animais));

    // Limpando o formulário após o cadastro
    document.getElementById('animalForm').reset();
    // Voltando o botão para "Cadastrar"
    document.querySelector('button[type="submit"]').textContent = 'Cadastrar';
    exibirAnimais(); // Atualizando a tabela
}

// Função para exibir os animais cadastrados na página de consulta
function exibirAnimais() {
    const animais = JSON.parse(localStorage.getItem('animais')) || [];
    const tabela = document.getElementById('tabelaAnimais').getElementsByTagName('tbody')[0];

    // Limpando a tabela antes de preencher
    tabela.innerHTML = '';

    // Verificando se há animais cadastrados
    if (animais.length === 0) {
        tabela.innerHTML = '<tr><td colspan="11">Nenhum animal cadastrado.</td></tr>';
        return;
    }

    // Adicionando as linhas com os dados dos animais
    animais.forEach((animal, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${animal.nome}</td>
            <td>${animal.especie}</td>
            <td>${animal.idade}</td>
            <td>${animal.peso}</td>
            <td>${animal.pelagem}</td>
            <td>${animal.castrado}</td>
            <td>${animal.lesao}</td>
            <td>${animal.localizacaoLesao}</td> <!-- Nova coluna -->
            <td>${animal.teveFilhotes}</td>
            <td>${animal.quantidadeFilhotes}</td> <!-- Nova coluna -->
            <td>
                <button onclick="editarAnimal(${index})">E</button>
                <button onclick="excluirAnimal(${index})">D</button>
            </td>
        `;

        tabela.appendChild(tr);
    });
}

// Função para excluir um animal
function excluirAnimal(index) {
    const animais = JSON.parse(localStorage.getItem('animais')) || [];
    animais.splice(index, 1);
    localStorage.setItem('animais', JSON.stringify(animais));
    exibirAnimais();
}

// Função para editar um animal
function editarAnimal(index) {
    const animais = JSON.parse(localStorage.getItem('animais')) || [];
    const animal = animais[index];

    // Preenchendo o formulário com os dados do animal a ser editado
    document.getElementById('nome').value = animal.nome;
    document.getElementById('especie').value = animal.especie;
    document.getElementById('idade').value = animal.idade;
    document.getElementById('peso').value = animal.peso;
    document.getElementById('pelagem').value = animal.pelagem;
    document.getElementById('castrado').value = animal.castrado;
    document.getElementById('lesao').value = animal.lesao;
    document.getElementById('localizacaoLesao').value = animal.localizacaoLesao;
    document.getElementById('teveFilhotes').value = animal.teveFilhotes;
    document.getElementById('quantidadeFilhotes').value = animal.quantidadeFilhotes;

    // Alterando o botão para "Atualizar"
    document.querySelector('button[type="submit"]').textContent = 'Atualizar';

    // Salvando o índice do animal a ser editado
    animalParaEditar = index;
}

// Função para mostrar ou esconder campos dependendo da seleção
function toggleLesao(select) {
    const localizacaoLesaoDiv = document.getElementById('localizacaoLesaoDiv');
    if (select.value === 'sim') {
        localizacaoLesaoDiv.style.display = 'block';
    } else {
        localizacaoLesaoDiv.style.display = 'none';
    }
}

function toggleFilhotes(select) {
    const quantidadeFilhotesDiv = document.getElementById('quantidadeFilhotesDiv');
    if (select.value === 'sim') {
        quantidadeFilhotesDiv.style.display = 'block';
    } else {
        quantidadeFilhotesDiv.style.display = 'none';
    }
}

// Carregar os animais ao carregar a página de consulta
if (window.location.pathname.includes('consultaAnimal.html')) {
    exibirAnimais();
}

// Adicionar evento para salvar ou atualizar o animal no cadastro
if (window.location.pathname.includes('cadastroAnimal.html')) {
    document.getElementById('animalForm').addEventListener('submit', salvarAnimal);
}

// Variáveis para armazenar os dados temporários
let alimentacoes = JSON.parse(localStorage.getItem('alimentacoes')) || [];

// ==================== Funções para Registrar Alimentação ====================

// Função para salvar alimentação
function salvarAlimentacao(event) {
    event.preventDefault();

    const idAnimal = document.getElementById('animalId').value;
    const tipoAlimento = document.getElementById('alimento').value;
    const quantidade = document.getElementById('quantidade').value;
    const dataChegada = document.getElementById('dataChegada').value;

    if (!idAnimal || !tipoAlimento || !quantidade || !dataChegada) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const novaAlimentacao = {
        idAnimal,
        tipoAlimento,
        quantidade: `${quantidade} g`,
        dataChegada
    };

    // Adiciona o novo registro ao array
    alimentacoes.push(novaAlimentacao);

    // Salva no localStorage
    localStorage.setItem('alimentacoes', JSON.stringify(alimentacoes));

    alert('Alimentação registrada com sucesso!');
    document.querySelector('form').reset();
}

// ==================== Funções para Gerar Relatório ====================

// Função para exibir relatórios de alimentação com base no ID do animal
function gerarRelatorio(event) {
    event.preventDefault();

    const buscarIdAnimal = document.getElementById('animalId').value;

    if (!buscarIdAnimal) {
        alert('Por favor, insira um ID de animal.');
        return;
    }

    const registrosFiltrados = alimentacoes.filter(alim => alim.idAnimal === buscarIdAnimal);

    const tabelaRelatorio = document.createElement('table');
    tabelaRelatorio.setAttribute('border', '1');
    tabelaRelatorio.style.width = '100%';

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr style="background-color: #ffa500;">
            <th>ID do Animal</th>
            <th>Tipo de Alimento</th>
            <th>Quantidade</th>
            <th>Data</th>
            <th>Ações</th>
        </tr>
    `;
    tabelaRelatorio.appendChild(thead);

    const tbody = document.createElement('tbody');

    if (registrosFiltrados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">Nenhum registro encontrado para este ID.</td></tr>';
    } else {
        registrosFiltrados.forEach((alim, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${alim.idAnimal}</td>
                <td>${alim.tipoAlimento}</td>
                <td>${alim.quantidade}</td>
                <td>${alim.dataChegada}</td>
                <td>
                    <button onclick="editarAlimentacao(${index})">E</button>
                    <button onclick="excluirAlimentacao(${index})">D</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    tabelaRelatorio.appendChild(tbody);

    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Limpa qualquer tabela anterior
    contentDiv.appendChild(tabelaRelatorio);
}

// Função para excluir um registro de alimentação
function excluirAlimentacao(index) {
    if (confirm('Deseja realmente excluir este registro?')) {
        alimentacoes.splice(index, 1);
        localStorage.setItem('alimentacoes', JSON.stringify(alimentacoes));
        alert('Registro excluído com sucesso!');
        gerarRelatorio(new Event('submit'));
    }
}

// Função para editar um registro de alimentação
function editarAlimentacao(index) {
    const alimentacao = alimentacoes[index];

    document.getElementById('animalId').value = alimentacao.idAnimal;
    document.getElementById('alimento').value = alimentacao.tipoAlimento;
    document.getElementById('quantidade').value = parseInt(alimentacao.quantidade);
    document.getElementById('dataChegada').value = alimentacao.dataChegada;

    // Remove o registro antigo para que possa ser atualizado
    alimentacoes.splice(index, 1);
    localStorage.setItem('alimentacoes', JSON.stringify(alimentacoes));
}

// ==================== Event Listeners ====================
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se está na página de Registrar Alimentação
    if (window.location.pathname.includes('cadastroAlimentacao.html')) {
        document.querySelector('form').addEventListener('submit', salvarAlimentacao);
    }

    // Verifica se está na página de Gerar Relatório de Cuidados
    if (window.location.pathname.includes('relatorioCuidado.html')) {
        document.querySelector('form').addEventListener('submit', gerarRelatorio);
    }
});

// Função para excluir um animal na página de consulta (exemplo reutilizado)
function excluirAnimal(index) {
    const animais = JSON.parse(localStorage.getItem('animais')) || [];
    animais.splice(index, 1);  // Remove o animal do array
    localStorage.setItem('animais', JSON.stringify(animais));  // Atualiza o localStorage
    exibirAnimais();  // Atualiza a tabela de animais na página
}

// Função para excluir um registro de alimentação (adaptado para utilizar a mesma lógica)
function excluirAlimentacao(index) {
    if (confirm('Deseja realmente excluir este registro?')) {
        const alimentacoes = JSON.parse(localStorage.getItem('alimentacoes')) || [];  // Recupera o array de alimentações
        alimentacoes.splice(index, 1);  // Remove o registro de alimentação do array
        localStorage.setItem('alimentacoes', JSON.stringify(alimentacoes));  // Atualiza o localStorage com a lista modificada
        alert('Registro excluído com sucesso!');  // Exibe uma mensagem de confirmação
        gerarRelatorio(new Event('submit'));  // Atualiza o relatório na página
    }
}

// Função para gerar o relatório de alimentação (não muda, mas importante para garantir que a tabela seja atualizada após exclusão)
function gerarRelatorio(event) {
    event.preventDefault();  // Previne o envio do formulário

    const buscarIdAnimal = document.getElementById('animalId').value;  // Pega o ID do animal informado

    if (!buscarIdAnimal) {
        alert('Por favor, insira um ID de animal.');
        return;
    }

    const alimentacoes = JSON.parse(localStorage.getItem('alimentacoes')) || [];  // Recupera o array de alimentações
    const registrosFiltrados = alimentacoes.filter(alim => alim.idAnimal === buscarIdAnimal);  // Filtra os registros pelo ID do animal

    // Cria a tabela
    const tabelaRelatorio = document.createElement('table');
    tabelaRelatorio.setAttribute('border', '1');
    tabelaRelatorio.style.width = '100%';

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr style="background-color: #ffa500;">
            <th>ID do Animal</th>
            <th>Tipo de Alimento</th>
            <th>Quantidade</th>
            <th>Data</th>
            <th>Ações</th>
        </tr>
    `;
    tabelaRelatorio.appendChild(thead);

    const tbody = document.createElement('tbody');

    if (registrosFiltrados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">Nenhum registro encontrado para este ID.</td></tr>';
    } else {
        registrosFiltrados.forEach((alim, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${alim.idAnimal}</td>
                <td>${alim.tipoAlimento}</td>
                <td>${alim.quantidade}</td>
                <td>${alim.dataChegada}</td>
                <td>
                    <button onclick="editarAlimentacao(${index})">E</button>
                    <button onclick="excluirAlimentacao(${index})">D</button> <!-- Botão de exclusão com índice -->
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    tabelaRelatorio.appendChild(tbody);

    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';  // Limpa a área de conteúdo antes de adicionar a tabela
    contentDiv.appendChild(tabelaRelatorio);  // Adiciona a tabela atualizada ao DOM
}

// Namespace para controle de gastos
const ControleGastos = {
    // Função para registrar transação no Controle de Gastos
    registrarTransacao: function() {
        // Obtém os valores dos campos
        const descricao = document.getElementById('descricao').value;
        const valor = parseFloat(document.getElementById('valor').value);
        const tipo = document.getElementById('tipo').value;
        const data = document.getElementById('data').value;

        // Verifica se os campos estão preenchidos
        if (!descricao || !valor || !tipo || !data) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Cria o objeto da transação
        const transacao = { descricao, valor, tipo, data };

        // Obtém as transações salvas do localStorage
        let transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];

        // Adiciona a nova transação
        transacoes.push(transacao);

        // Salva as transações no localStorage
        localStorage.setItem('transacoes', JSON.stringify(transacoes));

        // Atualiza a tabela de transações
        this.exibirTransacoes();

        // Limpa o formulário
        document.getElementById('fluxoCaixaForm').reset();
    },

    // Função para exibir as transações na tabela
    exibirTransacoes: function() {
        const tabela = document.getElementById('tabelaTransacoes').getElementsByTagName('tbody')[0];
        tabela.innerHTML = ''; // Limpa a tabela antes de adicionar novos registros

        // Obtém as transações salvas no localStorage
        let transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];

        // Se não houver transações, exibe uma mensagem
        if (transacoes.length === 0) {
            tabela.innerHTML = '<tr><td colspan="5">Nenhuma transação registrada.</td></tr>';
            return;
        }

        // Exibe cada transação na tabela
        transacoes.forEach((transacao, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${transacao.descricao}</td>
                <td>R$ ${transacao.valor.toFixed(2)}</td>
                <td>${transacao.tipo}</td>
                <td>${transacao.data}</td>
                <td>
                    <button onclick="ControleGastos.excluirTransacao(${index})">Excluir</button>
                </td>
            `;
            tabela.appendChild(tr);
        });
    },

    // Função para excluir uma transação
    excluirTransacao: function(index) {
        if (confirm('Deseja realmente excluir esta transação?')) {
            let transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];
            transacoes.splice(index, 1); // Remove a transação
            localStorage.setItem('transacoes', JSON.stringify(transacoes)); // Atualiza o localStorage
            this.exibirTransacoes(); // Atualiza a tabela
        }
    },

    // Função para atualizar o orçamento no Controle de Gastos
    atualizarOrcamento: function() {
        const limiteReceitas = parseFloat(document.getElementById('orcamentoReceitas').value);
        const limiteDespesas = parseFloat(document.getElementById('orcamentoDespesas').value);

        const orcamento = { limiteReceitas, limiteDespesas };

        // Salva os limites de orçamento no localStorage
        localStorage.setItem('orcamento', JSON.stringify(orcamento));

        // Exibe os resultados do orçamento
        this.exibirOrcamento();
    },

    // Função para exibir o orçamento atual no Controle de Gastos
    exibirOrcamento: function() {
        const orcamento = JSON.parse(localStorage.getItem('orcamento')) || {};
        const resultadoOrcamento = document.getElementById('resultadoOrcamento');

        if (orcamento.limiteReceitas && orcamento.limiteDespesas) {
            resultadoOrcamento.innerHTML = `
                <p><strong>Limite de Receitas:</strong> R$ ${orcamento.limiteReceitas.toFixed(2)}</p>
                <p><strong>Limite de Despesas:</strong> R$ ${orcamento.limiteDespesas.toFixed(2)}</p>
            `;
        } else {
            resultadoOrcamento.innerHTML = '<p>Defina os limites de receita e despesas.</p>';
        }
    },

    // Função para gerar o relatório financeiro no Controle de Gastos
    gerarRelatorio: function() {
        const orcamento = JSON.parse(localStorage.getItem('orcamento')) || {};
        const limiteDespesas = orcamento.limiteDespesas || 0;

        // Obtém as transações de tipo "despesa"
        const transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];
        const despesas = transacoes.filter(transacao => transacao.tipo.toLowerCase() === 'despesa');

        // Soma o total das despesas
        const totalDespesas = despesas.reduce((total, transacao) => total + transacao.valor, 0);

        // Verifica se as despesas estão dentro do limite
        const limiteCumprido = totalDespesas <= limiteDespesas;

        // Exibe o relatório mensal
        const relatorioMensal = document.getElementById('relatorioMensal');
        relatorioMensal.innerHTML = `
            <p><strong>Total de Despesas:</strong> R$ ${totalDespesas.toFixed(2)}</p>
            <p><strong>Limite de Despesas:</strong> R$ ${limiteDespesas.toFixed(2)}</p>
            <p><strong>Limite Cumprido:</strong> ${limiteCumprido ? 'Sim' : 'Não'}</p>
        `;
    }
};

// Chama as funções para carregar os dados quando a página for carregada
document.addEventListener('DOMContentLoaded', () => {
    // Carrega as funções do Controle de Gastos
    ControleGastos.exibirTransacoes();  
    ControleGastos.exibirOrcamento();  

    // Adiciona o evento para o botão de gerar relatório
    document.getElementById('gerarRelatorioBtn').addEventListener('click', ControleGastos.gerarRelatorio);

    // Adiciona o evento para o botão de registrar transação
    document.getElementById('registrarTransacaoBtn').addEventListener('click', ControleGastos.registrarTransacao);

    // Adiciona o evento para o botão de atualizar orçamento
    document.getElementById('atualizarOrcamentoBtn').addEventListener('click', ControleGastos.atualizarOrcamento);
});

