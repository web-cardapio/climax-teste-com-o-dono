// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('booking-form');
    const submitBtn = document.querySelector('#booking-form .btn-primary');
    const btnText = document.querySelector('#booking-form .btn-text');
    const btnLoading = document.querySelector('#booking-form .btn-loading');
    const modal = document.getElementById('success-modal');
    
    // Número do WhatsApp para envio
    const WHATSAPP_NUM = '5581999362194';
    
    // Função para fechar modal (global)
    window.closeModal = function() {
        if(modal) {
            modal.style.display = 'none';
            modal.setAttribute('hidden', 'hidden');
            document.body.style.overflow = '';
        }
    };
    
    // Função para mostrar modal
    function showModal() {
        if(modal) {
            modal.removeAttribute('hidden');
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Função para formatar a mensagem do WhatsApp (SEM EMOJIS PROBLEMATICOS)
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
    
    // Função para validar o formulário
    function validarFormulario() {
        const nome = document.getElementById('nome').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const endereco = document.getElementById('endereco').value.trim();
        const servico = document.getElementById('servico').value;
        const data = document.getElementById('data').value;
        const periodo = document.getElementById('periodo').value;
        
        if(!nome) {
            alert('Por favor, informe seu nome completo.');
            return false;
        }
        if(!telefone) {
            alert('Informe seu telefone/WhatsApp.');
            return false;
        }
        if(!endereco) {
            alert('Informe seu endereco.');
            return false;
        }
        if(!servico) {
            alert('Selecione o tipo de servico.');
            return false;
        }
        if(!data) {
            alert('Selecione a data preferida.');
            return false;
        }
        if(!periodo) {
            alert('Selecione o periodo.');
            return false;
        }
        
        // Validar telefone (mínimo 10 dígitos)
        const telefoneLimpo = telefone.replace(/\D/g, '');
        if(telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
            alert('Digite um telefone valido com DDD (ex: 81999999999)');
            return false;
        }
        
        return true;
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
    
    // Definir data mínima como hoje
    const dataInput = document.getElementById('data');
    if(dataInput) {
        const hoje = new Date().toISOString().split('T')[0];
        dataInput.setAttribute('min', hoje);
    }
    
    // Evento de submit do formulário
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if(!validarFormulario()) return;
            
            // Coletar os dados do formulário
            const dados = {
                nome: document.getElementById('nome').value.trim(),
                telefone: document.getElementById('telefone').value.trim(),
                email: document.getElementById('email').value.trim(),
                endereco: document.getElementById('endereco').value.trim(),
                servico: document.getElementById('servico').options[document.getElementById('servico').selectedIndex]?.text || document.getElementById('servico').value,
                data: document.getElementById('data').value,
                periodo: document.getElementById('periodo').options[document.getElementById('periodo').selectedIndex]?.text || document.getElementById('periodo').value,
                descricao: document.getElementById('descricao').value.trim()
            };
            
            // Mostrar loading
            if(btnText && btnLoading) {
                btnText.style.display = 'none';
                btnLoading.style.display = 'inline';
            }
            if(submitBtn) submitBtn.disabled = true;
            
            // Formatar e enviar para WhatsApp
            const mensagem = formatarMensagem(dados);
            const url = 'https://wa.me/' + WHATSAPP_NUM + '?text=' + mensagem;
            
            // Abrir WhatsApp em nova aba
            window.open(url, '_blank');
            
            // Limpar formulário
            form.reset();
            
            // Mostrar modal de sucesso
            showModal();
            
            // Esconder loading
            if(btnText && btnLoading) {
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
            }
            if(submitBtn) submitBtn.disabled = false;
        });
    }
    
    // Fechar modal ao clicar fora
    window.onclick = function(event) {
        if(modal && event.target === modal) {
            closeModal();
        }
    };
});