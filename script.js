function criarTimer(id, anos, mensagemMotivacional) {
  const elemento = document.getElementById(id);
  const progressBar = document.getElementById(`progress-${id}`);
  const msgElement = document.getElementById(`msg-${id}`);
  
  if (!elemento) return;

  const agora = new Date();
  const futuro = new Date();
  futuro.setFullYear(agora.getFullYear() + anos);

  function atualizar() {
    const atual = new Date();
    const diff = futuro - atual;

    if (diff <= 0) {
      elemento.innerHTML = "🎉🎊 OBJETIVO ALCANÇADO! 🎊🎉";
      if (progressBar) progressBar.style.width = "100%";
      if (msgElement) msgElement.innerHTML = "🌟 Parabéns! Você transformou um sonho em realidade! 🌟";
      return;
    }

    const segundos = Math.floor(diff / 1000) % 60;
    const minutos = Math.floor(diff / 1000 / 60) % 60;
    const horas = Math.floor(diff / 1000 / 60 / 60) % 24;
    const dias = Math.floor(diff / 1000 / 60 / 60 / 24);
    const anosRestantes = Math.floor(dias / 365.25);
    const diasRestantes = Math.floor(dias % 365.25);
    
    // Timer formatado
    elemento.innerHTML = `⏱️ ${anosRestantes} ano${anosRestantes !== 1 ? 's' : ''}, ${diasRestantes} dia${diasRestantes !== 1 ? 's' : ''}, ${String(horas).padStart(2, '0')}h ${String(minutos).padStart(2, '0')}m ${String(segundos).padStart(2, '0')}s`;
    
    // Barra de progresso
    if (progressBar) {
      const totalDias = anos * 365.25;
      const progresso = (dias / totalDias) * 100;
      progressBar.style.width = `${Math.min(100, Math.max(0, progresso))}%`;
    }
    
    // Mensagens motivacionais baseadas no progresso
    if (msgElement && anosRestantes === 0 && diasRestantes <= 30) {
      msgElement.innerHTML = "⚡ ÚLTIMO MÊS! O fim está próximo — dê tudo de si! ⚡";
    } else if (msgElement && progresso > 50) {
      const mensagens = [
        "🚀 Você já passou da metade! Continue firme!",
        "💪 Cada dia é um passo mais perto do seu sonho!",
        "🌟 A consistência está te transformando!",
        "📈 O progresso é invisível até se tornar inegável!",
        "🎯 Foco na jornada, o resultado vem!"
      ];
      msgElement.innerHTML = mensagens[Math.floor(Math.random() * mensagens.length)];
    } else if (msgElement) {
      const mensagens = [
        "🌱 Pequenos passos todos os dias constroem grandes realizações.",
        "✨ Amanhã começa hoje. O que você fez hoje pelo seu futuro?",
        "🎯 Sonhos sem ação são apenas ilusões. Aja!",
        "💎 Disciplina é liberdade disfarçada de esforço.",
        "📚 O único lugar onde sucesso vem antes do trabalho é no dicionário."
      ];
      msgElement.innerHTML = mensagens[Math.floor(Math.random() * mensagens.length)];
    }
  }

  atualizar();
  setInterval(atualizar, 1000);
}

// Inicializar todos os timers
criarTimer("faculdade", 6);
criarTimer("cnh", 1);
criarTimer("casa", 7);
criarTimer("filho", 10);

// Smooth scroll para o indicador
document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
});

// Adicionar efeito de entrada nos cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(50px)';
  card.style.transition = 'all 0.6s ease-out';
  observer.observe(card);
});

console.log('🚀 Planejamento de vida carregado! A jornada começa agora.');
