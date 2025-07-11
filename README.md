# SpaceDate – Componente de seleção de intervalo de datas

## 🧭 Visão Geral  
SpaceDate é um componente de seleção de intervalo de datas (start → end), leve, responsivo e multilíngue. Foi **implementado e utilizado pela Duas Rodas** em seu site oficial, proporcionando experiência fluida em filtros e agendamentos.

## 🚀 Recursos Principais  
- **Multilíngue automático** (pt, en, es), detectado pela URL  
- **Validação inteligente:** garante que a data final seja posterior à inicial  
- **Presets configuráveis:** seleção rápida (7, 30 ou 90 dias)  
- **Alta customização:** formato, separador, `minDate`, `maxDate`, etc.  
- **Design moderno e responsivo:** compatível com desktop e mobile  

## ⚙️ Instalação & Uso  

### Instalação  
```bash
git clone https://github.com/seu-usuario/spacedate.git
```

Inclua os arquivos na sua aplicação:
```html
<script src="path/to/spacedate.js"></script>
<link rel="stylesheet" href="path/to/spacedate.css">
```

### Inicialização
```javascript
const dp = new SpaceDate("#trigger", {
  format: "DD/MM/YYYY",
  separator: " até ",
  presets: [7, 30, 90],
  minDate: "2025-01-01",
  maxDate: "2025-12-31",
});
```

## 🌍 Idiomas & Traduções  
Detecta idioma pelo caminho da URL: `/pt/`, `/en/`, `/es/`  
Inclui traduções para tooltips, placeholders, nomes de meses e dias da semana.

## 📂 Estrutura do Projeto  
- `translations/` – arquivos de texto para cada idioma  
- `SpaceDate.js` – lógica central (DOM, eventos, validações)  
- `Modal/` – interface visual do calendário  
- `Tooltip/` – mensagens de erro para seleção inválida  
- `spacedate.css` – estilos responsivos padrões  

## 📌 Integração no site da Duas Rodas  
Ao clicar em **Aplicar**, os parâmetros `since` e `until` são formatados e adicionados à URL, redirecionando o usuário para a versão filtrada:

```javascript
const params = {
  since: dp.formatForUrl(dp.startDate),
  until: dp.formatForUrl(dp.endDate)
};
const url = new URL(window.location.href);
url.searchParams.set("since", params.since);
url.searchParams.set("until", params.until);
window.location.href = url.toString();
```

## 💡 Porque este projeto agrega valor  
✅ Aplicado em ambiente real de cliente: **Duas Rodas**  
✅ Engloba UX, i18n, validação, SEO e performance  
✅ Código modular e reutilizável, facilmente integrável em outros projetos  

## 📥 Contribuições & Licença  
Contribuições são bem-vindas!  
Licenciado sob **MIT** – consulte o arquivo `LICENSE` para mais detalhes.

---

### ⚡ Destaques para Recrutadores  
- Uso real em projeto corporativo  
- Estrutura clara e profissional  
- Demonstra domínio técnico em internationalization, UX, validação e integração via URL

---

Fique à vontade para abrir issues ou criar PRs.  
Obrigado por conferir o **SpaceDate**! 😊
