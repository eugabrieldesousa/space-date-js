import { LanguageKey, Language } from "./type";

const translations: Record<LanguageKey, Language> = {
  pt: {
    tooltip: "A data final precisa ser maior que a data inicial.",
    title: "Selecione o Período",
    startPlaceholder: "Data de início",
    endPlaceholder: "Data de término",
    apply: "Aplicar",
    cancel: "Cancelar",
    clear: "Limpar",
    days7: "7 dias",
    days30: "30 dias",
    days90: "90 dias",
    weekdays: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa"],
    months: [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ],
  },
  es: {
    tooltip: "La fecha final debe ser mayor que la fecha inicial.",
    title: "Seleccione el Período",
    startPlaceholder: "Fecha de inicio",
    endPlaceholder: "Fecha de fin",
    apply: "Aplicar",
    cancel: "Cancelar",
    clear: "Limpiar",
    days7: "7 días",
    days30: "30 días",
    days90: "90 días",
    weekdays: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
    months: [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ],
  },
  en: {
    tooltip: "The end date must be greater than the start date.",
    title: "Select Period",
    startPlaceholder: "Start date",
    endPlaceholder: "End date",
    apply: "Apply",
    cancel: "Cancel",
    clear: "Clear",
    days7: "7 days",
    days30: "30 days",
    days90: "90 days",
    weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    months: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
  },
};

export default translations;

export function getLanguageFromPath(): string {
  const path = window.location.pathname; // Obtém o caminho da URL (ex: "/es/news-duas-rodas/")
  const language = path.split('/')[1]; // Extrai a primeira parte do caminho (ex: "es")
  console.log("Idioma detectado:", language); // Log para depuração
  return translations[language] ? language : 'pt'; // Retorna o idioma ou 'pt' como padrão
}