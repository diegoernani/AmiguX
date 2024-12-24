# AmiguX - Sistema de Amigo Oculto

Bem-vindo ao **AmiguX**, o sistema que torna o processo de organizar amigos ocultos fácil, eficiente e personalizado. Com recursos como envio automático de e-mails e exportação para PDF, este sistema garante que seu evento seja um sucesso.

---

## Funcionalidades

1. **Cadastro de Participantes**  
   - Nome, e-mail e observações personalizadas (preferências ou restrições).

2. **Instruções Gerais**  
   - Campo dedicado para adicionar informações como valor mínimo dos presentes, local e horário do evento.

3. **Sorteio Automático**  
   - Garante que ninguém tire a si mesmo e permite múltiplas tentativas para combinações válidas.

4. **Envio Automático de E-mails**  
   - Participantes recebem o nome do amigo oculto diretamente no e-mail, incluindo observações e instruções gerais.

5. **Exportação para PDF**  
   - Resultados do sorteio podem ser exportados com um clique.

6. **Design Responsivo e Intuitivo**  
   - Interface que funciona perfeitamente em desktops e dispositivos móveis.

7. **Animação de Carregamento**  
   - Um GIF animado durante o sorteio adiciona um toque especial ao processo.

---

## 📂 **Estrutura do Projeto**

```plaintext
AmiguX/
│
├── index.html          # Estrutura HTML do sistema
├── style.css           # Estilo visual (CSS)
├── script.js           # Lógica do sistema (JavaScript)
├── README.md           # Documentação do projeto
```
---

## Como Usar

### Pré-requisitos
- Navegador atualizado.
- Conexão com a internet para envio de e-mails via EmailJS.

### Configuração Inicial
1. **Configurar o EmailJS**:
   - Crie uma conta no [EmailJS](https://www.emailjs.com/).
   - Configure um **Service ID** e um **Template ID**.
   - Copie sua **Public Key**.

2. **Atualizar o Código**:
   - No arquivo `script.js`, insira suas credenciais:
     ```
     emailjs.init('SUA_PUBLIC_KEY');
     emailjs.send('default_service', 'SEU_TEMPLATE_ID', emailParams);
     ```

### Passo a Passo para Uso
1. Abra o arquivo `index.html` no navegador.
2. Preencha os dados dos participantes (nome, e-mail e observações).
3. Adicione instruções gerais no campo específico (opcional).
4. Clique em "Realizar Sorteio".
5. Resultados serão enviados automaticamente por e-mail.
6. Exporte os resultados para PDF, se necessário.

---

## Estrutura do Projeto

- `index.html`: Estrutura principal do sistema.
- `style.css`: Estilo visual (cores, fontes, layout).
- `script.js`: Lógica de funcionamento (cadastro, sorteio, envio de e-mails, exportação para PDF).

---

## Personalização

- **Design**: Personalize o layout no arquivo `style.css`.
- **Mensagem de E-mail**: Ajuste o modelo no painel do EmailJS para incluir variáveis como:
  - `to_name`: Nome do participante.
  - `friend_name`: Nome do amigo oculto.
  - `friend_notes`: Observações do amigo oculto.
  - `general_instructions`: Instruções gerais do evento.
- **GIF de Carregamento**: Altere o link do GIF no `script.js` para uma animação personalizada.

---

## Problemas Comuns e Soluções

1. **E-mails Não Enviados**  
   - Verifique as credenciais do EmailJS no código.
   - Certifique-se de que o navegador permite solicitações externas (especialmente no `localhost`).

2. **PDF com Informações Incompletas**  
   - Ajuste o espaçamento no método de geração de texto no `jsPDF`.

3. **E-mails Duplicados**  
   - O sistema não permite duplicação de e-mails. Verifique os dados antes de adicionar participantes.

---

## Sobre o Projeto

**Criado por Diego Ernani**  
Visite meu portfólio: [diegoernani.dev](https://diegoernani.dev)  
Acompanhe-me no LinkedIn: [Diego Ernani](https://www.linkedin.com/in/diegoernani)

**Divirta-se organizando seu amigo oculto com o AmiguX!** 🎁

---

## 📄 **Licença**

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para mais informações.

---

**Divirta-se organizando o melhor amigo oculto com o AmiguX!** 🎁
```
