// Armazenar data de início no localStorage para consistência
let startDate = localStorage.getItem('startDate');
if (!startDate) {
  startDate = new Date().toISOString();
  localStorage.setItem('startDate', startDate);
}
const globalStartDate = new Date(startDate);

function criarTimer(id, anos, objetivoNome) {
  const elemento = document.getElementById(id);
  const progressBar = document.getElementById(`progress-${id}`);
  
  if (!elemento) return;

  // Data futura baseada na data de início global
  const futuro = new Date(globalStartDate);
  futuro.setFullYear(globalStartDate.getFullYear() + anos);
  
  // Data final real (para eventos fixos, não usar a data global)
  const dataInicioReal = new Date(); // Data atual real
  const futuroReal = new Date();
  futuroReal.setFullYear(dataInicioReal.getFullYear() + anos);
  
  function atualizar() {
    const agora = new Date();
    
    // Usar futuroReal para contagem precisa baseada na data atual
    const diff = futuroReal - agora;
    
    if (diff <= 0) {
      // Se o prazo já passou
      elemento.innerHTML = "🎉 Objetivo alcançado! 🎉";
      if (progressBar) progressBar.style.width = "100%";
      return;
    }
    
    // Cálculos precisos
    const segundosTotal = Math.floor(diff / 1000);
    const minutosTotal = Math.floor(segundosTotal / 60);
    const horasTotal = Math.floor(minutosTotal / 60);
    const diasTotal = Math.floor(horasTotal / 24);
    
    const anosRestantes = Math.floor(diasTotal / 365.25); // Considerando anos bissextos
    const diasRestantes = Math.floor(diasTotal % 365.25);
    const horas = horasTotal % 24;
    const minutos = minutosTotal % 60;
    const segundos = segundosTotal % 60;
    
    // Formatação bonita
    let texto = "";
    if (anosRestantes > 0) texto += `${anosRestantes} ${anosRestantes === 1 ? 'ano' : 'anos'}, `;
    if (diasRestantes > 0 || anosRestantes === 0) texto += `${diasRestantes} ${diasRestantes === 1 ? 'dia' : 'dias'}, `;
    texto += `${String(horas).padStart(2, '0')}h ${String(minutos).padStart(2, '0')}m ${String(segundos).padStart(2, '0')}s`;
    
    elemento.innerHTML = `⏱️ ${texto}`;
    
    // Atualizar barra de progresso
    if (progressBar) {
      const totalSegundos = anos * 365.25 * 24 * 60 * 60;
      const segundosPassados = totalSegundos - segundosTotal;
      let percentual = (segundosPassados / totalSegundos) * 100;
      percentual = Math.min(100, Math.max(0, percentual));
      progressBar.style.width = `${percentual}%`;
    }
  }
  
  atualizar();
  setInterval(atualizar, 1000);
}

// Inicializar todos os timers
criarTimer("faculdade", 6, "Faculdade");
criarTimer("cnh", 1, "CNH");
criarTimer("casa", 7, "Casa própria");
criarTimer("filho", 10, "Filho");

// Adicionar efeito de carregamento suave
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Planejamento de vida carregado!');
  
  // Animação de entrada para os cards
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
});
