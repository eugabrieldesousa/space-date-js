# SpaceDate - Período de Seleção de Datas

## Visão Geral
SpaceDate é um componente customizável de seleção de datas que permite aos usuários escolher um intervalo de tempo (start e end date) com base em um formato intuitivo e responsivo. Ele oferece suporte multilíngue (é configurado automaticamente com base na URL) e inclui funcionalidades como presets de datas, validação de intervalo, e um design moderno.

## Recursos Principais
- **Suporte Multilíngue:** Idiomas disponíveis: Português (pt), Espanhol (es), e Inglês (en). O idioma é detectado automaticamente com base no caminho da URL.
- **Validação de Intervalo:** Garante que a data final é maior que a data inicial.
- **Presets de Datas:** Opções rápidas para selecionar 7, 30 ou 90 dias.
- **Customização:** Várias opções podem ser ajustadas via parâmetros de inicialização.
- **Responsividade:** Funciona bem em dispositivos móveis e desktop.

## Instalação
1. Clone ou baixe o repositório do projeto.
2. Inclua o arquivo JavaScript em sua aplicação:
   ```html
   <script src="path/to/spacedate.js"></script>
   ```
3. Certifique-se de incluir os estilos CSS para o componente:
   ```html
   <link rel="stylesheet" href="path/to/spacedate.css">
   ```

## Inicialização
Você pode inicializar o componente SpaceDate chamando o construtor e passando o seletor do gatilho (trigger).

### Exemplo Básico
```javascript
const datePicker = new SpaceDate("#date-picker-trigger", {
  format: "MM/DD/YYYY",
  separator: " to ",
});
```

### Opções de Configuração
- **format**: Define o formato da data. (Padrão: "DD/MM/YYYY")
- **separator**: Define o separador entre as datas inicial e final. (Padrão: " - ")

## Traduções
As traduções estão definidas para Português, Espanhol e Inglês. Elas incluem:
- Tooltip para mensagens de erro.
- Placeholders para os campos de data inicial e final.
- Nomes dos meses e dias da semana.

### Configurações de Idioma
O idioma é automaticamente detectado pela função `getLanguageFromPath`, que verifica o caminho da URL para determinar o idioma (exemplo: `/es/` para espanhol). Se nenhum idioma correspondente for encontrado, o padrão é Português.

## Estrutura do Projeto
- **translations**: Contém os textos traduzidos para cada idioma.
- **SpaceDate Class**: Gera o modal, listeners de eventos e validações.
- **Modal Dinâmico**: Cria elementos de interface DOM, incluindo calendários e headers.
- **Tooltip**: Informa ao usuário quando a seleção de intervalo é inválida.

## Estilo
Certifique-se de aplicar estilos consistentes para o componente. O arquivo CSS pode ser personalizado de acordo com o design da sua aplicação.

### Exemplo de CSS (Padrão)
```css
.spacedate-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.spacedate-modal {
  position: absolute;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  z-index: 1000;
}
.spacedate-btn {
  background: #007BFF;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
```

## Eventos
### Evento de Aplicar
Quando o usuário clica no botão **Aplicar**, o URL é atualizado com os parâmetros `since` e `until`, correspondendo ao intervalo selecionado:
```javascript
const params = {
  since: this.formatDateForUrl(this.startDate),
  until: this.formatDateForUrl(this.endDate),
};
const url = new URL(window.location.href);
url.searchParams.set("since", params.since);
url.searchParams.set("until", params.until);
window.location.href = url.href;
```

## Contribuições
Fique à vontade para enviar sugestões, reportar problemas ou criar pull requests. Todas as contribuições são bem-vindas!

## Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais informações.

---

Aproveite o SpaceDate para criar uma experiência incrível de seleção de datas em seus projetos!

