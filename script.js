const btnGenerate = document.getElementById("generate-pdf");
const element = document.getElementById("content");
const bodyEl = document.getElementById("body");

function dadosUsuario() {
  btnGenerate.style.display = "none";
  element.innerHTML = `
    <form id="form-curriculo">
      <h1 style="text-align: center;">Formulário de Currículo</h1>
      <h2>Dados Pessoais</h2>

      <label>Nome Completo:</label>
      <input type="text" name="nome">

      <label>Data de Nascimento:</label>
      <input type="date" name="nascimento">

      <label>Endereço:</label>
      <input type="text" name="endereco">

      <label>Telefone:</label>
      <input type="tel" name="telefone" placeholder="(00) 00000-0000">

      <label>E-mail:</label>
      <input type="email" name="email">

      <h2>Formação Acadêmica</h2>

      <label>Nível de Escolaridade:</label>
      <select name="escolaridade">
          <option value="fundamental">Ensino Fundamental</option>
          <option value="medio">Ensino Médio</option>
          <option value="tecnico">Curso Técnico</option>
          <option value="superior">Ensino Superior</option>
          <option value="pos">Pós-graduação</option>
          <option value="mestrado">Mestrado</option>
          <option value="doutorado">Doutorado</option>
      </select>

      <label>Curso / Formação:</label>
      <input type="text" name="curso">

      <label>Instituição:</label>
      <input type="text" name="instituicao">

      <label>Ano de Conclusão:</label>
      <input type="number" name="conclusao" min="1900" max="2100">

      <h2>Experiência Profissional</h2>

      <div>
        <label>Empresa:</label>
        <input type="text" name="empresa">

        <label>Cargo:</label>
        <input type="text" name="cargo">

        <label>Período:</label>
        <input type="text" name="periodo" placeholder="ex: 2019 - 2022">
      </div>

      <label>Descrição das Atividades:</label>
      <textarea name="atividades" rows="4"></textarea>

      <h2>Habilidades</h2>

      <label>Liste suas habilidades:</label>
      <textarea name="habilidades" rows="4" placeholder="Ex: Comunicação, Trabalho em equipe, Excel, etc."></textarea>

      <button type="submit" id="enviar" >Enviar</button>
    </form>
    <div id="footer">Leo Gomes • Desenvolvedor Web</div>

  `;

  const form = document.getElementById("form-curriculo");
  form.addEventListener("submit", cadastrar);
}

dadosUsuario();

function cadastrar(e) {
  e.preventDefault();

  btnGenerate.style.display = "block";

  const dados = Object.fromEntries(new FormData(e.target));

  element.innerHTML = `
    <div id="curriculo-formatado" style="font-family: Arial; padding: 20px; max-width: 800px;">
    <h2>Curriculo Profissional</h2>
      <h1>${dados.nome}</h1>
      <p><strong>Data de nascimento:</strong> ${dados.nascimento}</p>
      <p><strong>Endereço:</strong> ${dados.endereco}</p>
      <p><strong>Telefone:</strong> ${dados.telefone}</p>
      <p><strong>E-mail:</strong> ${dados.email}</p>

      <h2>Formação Acadêmica</h2>
      <p><strong>Escolaridade:</strong> ${dados.escolaridade}</p>
      <p><strong>Curso:</strong> ${dados.curso}</p>
      <p><strong>Instituição:</strong> ${dados.instituicao}</p>
      <p><strong>Ano de Conclusão:</strong> ${dados.conclusao}</p>

      <h2>Experiência Profissional</h2>
      <p><strong>Empresa:</strong> ${dados.empresa}</p>
      <p><strong>Cargo:</strong> ${dados.cargo}</p>
      <p><strong>Período:</strong> ${dados.periodo}</p>
      <p><strong>Atividades:</strong><br>${dados.atividades}</p>

      <h2>Habilidades</h2>
      <p>${dados.habilidades.replace(/\n/g, "<br>")}</p>

      <button id="voltar" onclick="dadosUsuario()">Voltar</button>
    </div>
  `;
}

btnGenerate.addEventListener("click", () => {
  voltar.style.display = "none";
  const pdfContent = document.getElementById("curriculo-formatado");

  if (!pdfContent) {
    alert("Preencha o formulário primeiro!");
    return;
  }

  //configure pdf opt
  const opt = {
    margin: [10, 10, 10, 10],
    filename: "arquivo.pdf",
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  //generate pdf
  html2pdf().set(opt).from(element).save();

  setTimeout(() => {
    dadosUsuario();
  }, 2000);
});
