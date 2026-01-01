// --------------------- INICIALIZAÇÃO DOS USUÁRIOS ---------------------
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [
    {
        nome: "Guilherme Victor",
        email: "guilherme.freitas85@outlook.com",
        senha: "123456",
        apartamento: "000",
        cargo: "Desenvolvedor"
    },
    {
        nome: "Síndico Teste",
        email: "sindico@teste.com",
        senha: "senha123",
        apartamento: "000",
        cargo: "Síndico"
    },
    {
        nome: "Admin Teste",
        email: "admin@teste.com",
        senha: "admin123",
        apartamento: "000",
        cargo: "Administradora"
    }
];

localStorage.setItem("usuarios", JSON.stringify(usuarios));

// --------------------- CADASTRO ---------------------
const formCadastro = document.querySelector("form");

if(formCadastro && window.location.href.includes("cadastro.html")) {
    formCadastro.addEventListener("submit", function(e) {
        e.preventDefault();

        const nome = formCadastro.nome.value.trim();
        const email = formCadastro.email.value.trim();
        const senha = formCadastro.senha.value;
        const senha2 = formCadastro.senha2.value;
        const apartamento = formCadastro.apartamento.value;

        // Validação: campos obrigatórios
        if(!nome || !email || !senha || !senha2 || !apartamento) {
            alert("Todos os campos são obrigatórios!");
            return;
        }

        // Validação: senhas iguais
        if(senha !== senha2){
            alert("As senhas não coincidem!");
            return;
        }

        // Verifica se o email já existe
        const usuarioExistente = usuarios.find(u => u.email === email);
        if(usuarioExistente) {
            alert("Email já cadastrado! Tente outro.");
            return;
        }

        const novoUsuario = {
            nome: nome,
            email: email,
            senha: senha,
            apartamento: apartamento,
            cargo: "Morador"
        };

        usuarios.push(novoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Cadastro realizado com sucesso! Agora você pode fazer login.");
        window.location.href = "login.html";
    });
}

// --------------------- LOGIN ---------------------
if(window.location.href.includes("login.html")) {
    const formLogin = document.querySelector("form");

    if(formLogin) {
        formLogin.addEventListener("submit", function(e) {
            e.preventDefault();

            const email = formLogin.querySelector("input[type='email']").value.trim();
            const senha = formLogin.querySelector("input[type='password']").value;

            const usuario = usuarios.find(u => u.email === email && u.senha === senha);

            if(usuario) {
                localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
                window.location.href = "index.html";
            } else {
                alert("Email ou senha incorretos!");
            }
        });
    }
}

// --------------------- INDEX (Menu, Logout e Avisos) ---------------------
if(window.location.href.includes("index.html")) {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if(!usuarioLogado){
        alert("Você precisa fazer login!");
        window.location.href = "login.html";
    } else {
        // MENU DINÂMICO
        const menu = document.getElementById("menu");

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

        // LOGOUT
        const btnLogout = document.getElementById("btn-logout");
        if(btnLogout){
            btnLogout.addEventListener("click", () => {
                localStorage.removeItem("usuarioLogado");
                window.location.href = "login.html";
            });
        }
    }
}
