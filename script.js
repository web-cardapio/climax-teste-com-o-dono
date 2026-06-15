// ===== CARROSSEL DE FOTOS =====
document.addEventListener('DOMContentLoaded', function() {
    
    const track = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;
    let autoInterval;
    const totalSlides = slides.length;
    
    // Função para atualizar o carrossel
    function updateSlider() {
        if (track) {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        // Atualizar dots
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Função para ir para o próximo slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
        resetAutoSlide();
    }
    
    // Função para ir para o slide anterior
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
        resetAutoSlide();
    }
    
    // Função para ir para um slide específico
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
        resetAutoSlide();
    }
    
    // Auto slide a cada 4 segundos
    function startAutoSlide() {
        autoInterval = setInterval(() => {
            nextSlide();
        }, 4000);
    }
    
    function stopAutoSlide() {
        if (autoInterval) {
            clearInterval(autoInterval);
        }
    }
    
    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }
    
    // Eventos dos botões
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
        });
    }
    
    // Eventos dos dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            goToSlide(index);
        });
    });
    
    // Pausar auto slide quando o mouse está sobre o carrossel
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', function() {
            stopAutoSlide();
        });
        
        sliderContainer.addEventListener('mouseleave', function() {
            startAutoSlide();
        });
    }
    
    // Iniciar o carrossel
    updateSlider();
    startAutoSlide();
    
    console.log('Carrossel iniciado com sucesso!');
});

// ===== MOBILE MENU =====
document.addEventListener('DOMContentLoaded', function() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileBtn && nav) {
        mobileBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
});

// ===== FECHAR MODAL =====
window.closeModal = function() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.style.display = 'none';
        modal.setAttribute('hidden', 'hidden');
    }
}

function showModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.removeAttribute('hidden');
        modal.style.display = 'flex';
    }
}

// ===== FORMULÁRIO DE AGENDAMENTO =====
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('booking-form');
    const btnText = document.querySelector('.btn-text');
    const btnLoading = document.querySelector('.btn-loading');
    const submitBtn = document.querySelector('#booking-form .btn-primary');
    const WHATSAPP_NUM = '5581999362194';
    
    function formatarMensagem(dados) {
        let msg = "*NOVO AGENDAMENTO - CLIMAX*%0A%0A";
        msg += "Nome: " + dados.nome + "%0A";
        msg += "Telefone: " + dados.telefone + "%0A";
        msg += "E-mail: " + (dados.email || "Nao informado") + "%0A";
        msg += "Endereco: " + dados.endereco + "%0A%0A";
        msg += "Servico: " + dados.servico + "%0A";
        msg += "Data: " + dados.data + "%0A";
        msg += "Periodo: " + dados.periodo + "%0A%0A";
        msg += "Descricao:%0A" + (dados.descricao || "Nenhuma observacao") + "%0A%0A";
        msg += "Enviado em: " + new Date().toLocaleString('pt-BR');
        return msg;
    }
    
    function validarForm() {
        const nome = document.getElementById('nome').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const endereco = document.getElementById('endereco').value.trim();
        const servico = document.getElementById('servico').value;
        const data = document.getElementById('data').value;
        const periodo = document.getElementById('periodo').value;
        
        if(!nome) { alert("Por favor, informe seu nome completo."); return false; }
        if(!telefone) { alert("Informe seu telefone/WhatsApp."); return false; }
        if(!endereco) { alert("Informe seu endereço."); return false; }
        if(!servico) { alert("Selecione o tipo de serviço."); return false; }
        if(!data) { alert("Selecione a data preferida."); return false; }
        if(!periodo) { alert("Selecione o período."); return false; }
        
        const telefoneLimpo = telefone.replace(/\D/g, '');
        if(telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
            alert("Digite um telefone válido (ex: 81999999999)");
            return false;
        }
        return true;
    }
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if(!validarForm()) return;
            
            const dados = {
                nome: document.getElementById('nome').value.trim(),
                telefone: document.getElementById('telefone').value.trim(),
                email: document.getElementById('email').value.trim(),
                endereco: document.getElementById('endereco').value.trim(),
                servico: document.getElementById('servico').options[document.getElementById('servico').selectedIndex]?.text,
                data: document.getElementById('data').value,
                periodo: document.getElementById('periodo').options[document.getElementById('periodo').selectedIndex]?.text,
                descricao: document.getElementById('descricao').value.trim()
            };
            
            if(btnText && btnLoading) {
                btnText.style.display = 'none';
                btnLoading.style.display = 'inline';
            }
            if(submitBtn) submitBtn.disabled = true;
            
            const mensagem = formatarMensagem(dados);
            const url = 'https://wa.me/' + WHATSAPP_NUM + '?text=' + mensagem;
            window.open(url, '_blank');
            
            form.reset();
            showModal();
            
            if(btnText && btnLoading) {
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
            }
            if(submitBtn) submitBtn.disabled = false;
        });
    }
    
    // Máscara para telefone
    const telefoneInput = document.getElementById('telefone');
    if(telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let valor = e.target.value.replace(/\D/g, '');
            if(valor.length === 11) {
                valor = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
            } else if(valor.length === 10) {
                valor = valor.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
            } else if(valor.length > 2 && valor.length < 10) {
                valor = valor.replace(/^(\d{2})(\d)/, '($1) $2');
            }
            e.target.value = valor;
        });
    }
    
    // Data mínima = hoje
    const dataInput = document.getElementById('data');
    if(dataInput) {
        const hoje = new Date().toISOString().split('T')[0];
        dataInput.setAttribute('min', hoje);
    }
});
