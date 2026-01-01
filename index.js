// Captura o container do menu
const menu = document.getElementById("menu");

// Recupera o usuário logado do localStorage
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

// Verifica se existe um usuário logado
if(usuarioLogado) {

    // Cria conteúdo baseado no cargo
    switch(usuarioLogado.cargo) {
        case "Desenvolvedor":
            menu.innerHTML = `
                <h2>Menu Desenvolvedor</h2>
                <ul>
                    <li>Gerenciar Usuários</li>
                    <li>Editar Sistema</li>
                    <li>Visualizar Relatórios</li>
                </ul>
            `;
            break;

        case "Administradora":
            menu.innerHTML = `
                <h2>Menu Administradora</h2>
                <ul>
                    <li>Gerenciar Contas</li>
                    <li>Visualizar Pagamentos</li>
                </ul>
            `;
            break;

        case "Síndico":
            menu.innerHTML = `
                <h2>Menu Síndico</h2>
                <ul>
                    <li>Enviar Avisos</li>
                    <li>Gerenciar Moradores</li>
                </ul>
            `;
            break;

        case "Morador":
            menu.innerHTML = `
                <h2>Menu Morador</h2>
                <ul>
                    <li>Ver Avisos</li>
                    <li>Consultar Pagamentos</li>
                    <li>Informações do Apartamento ${usuarioLogado.apartamento}</li>
                </ul>
            `;
            break;

        default:
            menu.innerHTML = "<p>Cargo não definido.</p>";
    }

} else {
    // Se não houver usuário logado, redireciona para login
    alert("Você precisa fazer login!");
    window.location.href = "login.html";
}

// Botão de logout
const btnLogout = document.getElementById("logout");

btnLogout.addEventListener("click", () => {
    // Remove o usuário logado do localStorage
    localStorage.removeItem("usuarioLogado");

    // Redireciona para login.html
    window.location.href = "login.html";
});

// --------------------- AVISOS ---------------------

// Inicializa array de avisos do localStorage
let avisos = JSON.parse(localStorage.getItem("avisos")) || [];

// Função para mostrar avisos
function mostrarAvisos() {
    const container = document.getElementById("avisos-container");
    container.innerHTML = "<h2>Avisos</h2>";

    if (avisos.length === 0) {
        container.innerHTML += "<p>Nenhum aviso disponível.</p>";
    } else {
        avisos.forEach(aviso => {
            container.innerHTML += `<p><strong>${aviso.autor}:</strong> ${aviso.mensagem}</p>`;
        });
    }
}

// Mostrar avisos ao carregar a página
mostrarAvisos();

// Se o usuário pode criar avisos
if (["Desenvolvedor","Síndico","Administradora"].includes(usuarioLogado.cargo)) {
    const criarContainer = document.getElementById("criar-aviso-container");
    criarContainer.innerHTML = `
        <h3>Criar Aviso</h3>
        <textarea id="mensagem-aviso" placeholder="Digite o aviso aqui"></textarea><br>
        <button id="btn-criar-aviso">Enviar Aviso</button>
    `;

    document.getElementById("btn-criar-aviso").addEventListener("click", () => {
        const mensagem = document.getElementById("mensagem-aviso").value.trim();
        if(mensagem === "") return alert("Digite uma mensagem!");

        // Adiciona aviso
        avisos.push({autor: usuarioLogado.nome, mensagem: mensagem});
        localStorage.setItem("avisos", JSON.stringify(avisos));

        // Limpa campo e atualiza lista
        document.getElementById("mensagem-aviso").value = "";
        mostrarAvisos();
    });
}
