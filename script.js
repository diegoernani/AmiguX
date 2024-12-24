// script.js
emailjs.init('zMZ8sQeII6L-pevvI'); // Use a chave publica

const participantNameInput = document.getElementById("participantName");
const participantEmailInput = document.getElementById("participantEmail");
const participantNotesInput = document.getElementById("participantNotes"); // Novo campo para observações
const generalInstructionsInput = document.getElementById("generalInstructions"); // Novo campo para instruções gerais
const addParticipantButton = document.getElementById("addParticipant");
const participantsList = document.getElementById("participantsList");
const drawButton = document.getElementById("drawButton");
const exportButton = document.getElementById("exportButton");
const resultList = document.getElementById("resultList");
const loadingMessage = document.createElement("div");
loadingMessage.id = "loadingMessage";
loadingMessage.style.display = "none";
loadingMessage.innerHTML = `<div style="display: flex; flex-direction: column; align-items: center;">
  <img src="https://gifmania.com.br/wp-content/uploads/2020/09/sorteio_2_gif.gif" alt="Sorteando..." style="width: 300px; height: 300px;">
  <p style="margin-top: 10px; font-size: 18px; color: #5e2e8e;"></p>
</div>`;
document.body.appendChild(loadingMessage);

let participants = [];
let generalInstructions = "";

// Adicionar participante
addParticipantButton.addEventListener("click", () => {
  const name = participantNameInput.value.trim();
  const email = participantEmailInput.value.trim();
  const notes = participantNotesInput.value.trim();

  if (name && email && !participants.some((p) => p.email === email)) {
    participants.push({ name, email, notes });
    updateParticipantsList();
    participantNameInput.value = "";
    participantEmailInput.value = "";
    participantNotesInput.value = "";
    drawButton.disabled = participants.length < 2;
    exportButton.disabled = true;
  } else {
    alert("Preencha os campos corretamente e evite e-mails duplicados.");
  }
});

// Atualizar lista de participantes
function updateParticipantsList() {
  participantsList.innerHTML = participants
    .map((p) => `<li>${p.name} (${p.email}) - Observações: ${p.notes || "Nenhuma"}</li>`)
    .join("");
}

// Atualizar instruções gerais
generalInstructionsInput.addEventListener("input", () => {
  generalInstructions = generalInstructionsInput.value.trim();
});

// Sorteio de participantes com garantia de pares únicos
function drawParticipants(participants) {
  let shuffled;
  let isValid = false;

  // Loop até encontrar uma combinação válida
  while (!isValid) {
    shuffled = [...participants];
    shuffled.sort(() => Math.random() - 0.5);

    isValid = participants.every((p, i) => p.email !== shuffled[i].email);
  }

  // Criar os pares válidos
  return participants.map((giver, i) => ({
    giver,
    receiver: shuffled[i],
  }));
}


// Realizar sorteio
drawButton.addEventListener("click", () => {
  if (participants.length < 2) {
    alert("É necessário pelo menos 2 participantes.");
    return;
  }

  resultList.innerHTML = ""; // Limpa os resultados visuais
  loadingMessage.style.display = "flex"; // Mostra a mensagem de carregamento

  setTimeout(() => {
    const results = drawParticipants(participants);

    if (results.length === 0) {
      loadingMessage.style.display = "none";
      return;
    }

    results.forEach((r) => {
      console.log(`Preparando envio de e-mail: ${r.giver.name} -> ${r.receiver.name}`);
      sendEmail(r.giver, r.receiver);
    });

    loadingMessage.style.display = "none";
    alert("Sorteio e envio concluídos com sucesso!");

    // Limpar dados após sorteio
    participants = [];
    generalInstructions = "";
    participantNameInput.value = "";
    participantEmailInput.value = "";
    participantNotesInput.value = "";
    generalInstructionsInput.value = "";
    updateParticipantsList();
    drawButton.disabled = true;
    exportButton.disabled = true;

  }, 3000); // Aguarda 3 segundos para simular o processo
});


// Enviar e-mail
function sendEmail(giver, receiver) {
  const emailParams = {
    to_name: giver.name,
    to_email: giver.email,
    friend_name: receiver.name,
    friend_notes: receiver.notes || "Nenhuma",
    general_instructions: generalInstructions || "Nenhuma",
  };

  console.log("Parâmetros enviados para emailjs:", emailParams);

  emailjs
    .send("default_service", "template_01zgzxu", emailParams)
    .then(() => {
      console.log(`E-mail enviado com sucesso para ${giver.email}`);
    })
    .catch((error) => {
      console.error(`Erro ao enviar e-mail para ${giver.email}:`, error);
    });
}

// Exportar para PDF
exportButton.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("Resultados do Amigo Oculto", 10, 10);
  participants.forEach((participant, i) => {
    doc.text(
      `${participant.name} -> ${participants[(i + 1) % participants.length].name} - Observações: ${participant.notes || "Nenhuma"}`,
      10,
      20 + i * 10
    );
  });

  if (generalInstructions) {
    doc.text("Instruções Gerais:", 10, 40 + participants.length * 10);
    doc.text(generalInstructions, 10, 50 + participants.length * 10);
  }

  doc.save("amigo_oculto_resultados.pdf");
});
