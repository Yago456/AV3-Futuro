function criarTimer(id, anos){
  const elemento = document.getElementById(id);
  const progressBar = document.getElementById(`progress-${id}`);
  
  if (!elemento) return;

  const agora = new Date();
  const futuro = new Date();
  futuro.setFullYear(agora.getFullYear() + anos);

  function atualizar(){
    const atual = new Date();
    const diff = futuro - atual;

    if(diff <= 0){
      elemento.innerHTML = "🎉 Objetivo alcançado! 🎉";
      if(progressBar) progressBar.style.width = "100%";
      return;
    }

    const segundos = Math.floor(diff / 1000) % 60;
    const minutos = Math.floor(diff / 1000 / 60) % 60;
    const horas = Math.floor(diff / 1000 / 60 / 60) % 24;
    const dias = Math.floor(diff / 1000 / 60 / 60 / 24);
    const anosRestantes = Math.floor(dias / 365.25); // Considera anos bissextos

    elemento.innerHTML = `⏱️ ${anosRestantes} anos, ${Math.floor(dias % 365.25)} dias, ${String(horas).padStart(2, '0')}h ${String(minutos).padStart(2, '0')}m ${String(segundos).padStart(2, '0')}s`;
    
    // Atualizar barra de progresso
    if(progressBar){
      const totalDias = anos * 365.25;
      const progresso = (dias / totalDias) * 100;
      progressBar.style.width = `${Math.min(100, progresso)}%`;
    }
  }

  atualizar();
  setInterval(atualizar, 1000);
}

criarTimer("faculdade", 6);
criarTimer("cnh", 1);
criarTimer("casa", 7);
criarTimer("filho", 10);
