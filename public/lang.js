// Definir la variable global para el idioma actual
var currentLang = 'es';

// Definir las traducciones
var translations = {
  es: {
    email: "Email",
    password: "Contraseña",
    loginBtn: "Entrar",
    amount: "Monto",
    amountCLP: "Monto en CLP",
    amountUSD: "Monto en USD",
    name: "Nombre",
    clientEmail: "Email",
    phone: "Teléfono",
    cpf: "CPF",
    generateBtn: "Generar QR",
    generateLinkBtn: "Generar Enlace",
    logout: "Cerrar sesión",
    currency: "Moneda",
    paymentMethod: "Método de pago",
    description: "Descripción",
    qrTitle: "Detalles del pago con PIX",
    linkTitle: "Enlace de pago PIX",
    amountLabel: "Monto:",
    exchangeRate: "Tasa de cambio:",
    brazilianTax: "Tasa USD → BRL (vet):",
    clientWillPay: "Valor que pagará el cliente en BRL:",
    paymentLink: "Enlace de pago:",
    countdown: "Tiempo restante:",
    qrExpired: "⚠️ El código QR ha expirado.",
    paymentReceived: "✅ Pago recibido",
    amountPaid: "Monto pagado:",
    client: "Cliente:",
    date: "Fecha:",
    linkInstructions: "El cliente recibirá un enlace por correo electrónico para realizar el pago.",
    linkSuccess: "✅ Enlace de pago generado correctamente"
  },
  en: {
    email: "Email",
    password: "Password",
    loginBtn: "Login",
    amount: "Amount",
    amountCLP: "Amount in CLP",
    amountUSD: "Amount in USD",
    name: "Name",
    clientEmail: "Email",
    phone: "Phone",
    cpf: "CPF",
    generateBtn: "Generate QR",
    generateLinkBtn: "Generate Link",
    logout: "Logout",
    currency: "Currency",
    paymentMethod: "Payment Method",
    description: "Description",
    qrTitle: "PIX Payment Details",
    linkTitle: "PIX Payment Link",
    amountLabel: "Amount:",
    exchangeRate: "Exchange rate:",
    brazilianTax: "USD → BRL rate (vet):",
    clientWillPay: "Amount to be paid in BRL:",
    paymentLink: "Payment link:",
    countdown: "Time remaining:",
    qrExpired: "⚠️ QR code has expired.",
    paymentReceived: "✅ Payment received",
    amountPaid: "Amount paid:",
    client: "Client:",
    date: "Date:",
    linkInstructions: "The client will receive a payment link via email.",
    linkSuccess: "✅ Payment link generated successfully"
  },
  pt: {
    email: "Email",
    password: "Senha",
    loginBtn: "Entrar",
    amount: "Valor",
    amountCLP: "Valor em CLP",
    amountUSD: "Valor em USD",
    name: "Nome",
    clientEmail: "Email",
    phone: "Telefone",
    cpf: "CPF",
    generateBtn: "Gerar QR",
    generateLinkBtn: "Gerar Link",
    logout: "Sair",
    currency: "Moeda",
    paymentMethod: "Método de pagamento",
    description: "Descrição",
    qrTitle: "Detalhes do pagamento PIX",
    linkTitle: "Link de pagamento PIX",
    amountLabel: "Valor:",
    exchangeRate: "Taxa de câmbio:",
    brazilianTax: "Taxa USD → BRL (vet):",
    clientWillPay: "Valor a ser pago em BRL:",
    paymentLink: "Link de pagamento:",
    countdown: "Tempo restante:",
    qrExpired: "⚠️ O código QR expirou.",
    paymentReceived: "✅ Pagamento recebido",
    amountPaid: "Valor pago:",
    client: "Cliente:",
    date: "Data:",
    linkInstructions: "O cliente receberá um link de pagamento por e-mail.",
    linkSuccess: "✅ Link de pagamento gerado com sucesso"
  }
};

// Función para cambiar el idioma
function setLang(lang) {
  if (!translations[lang]) {
    console.error('Idioma no disponible:', lang);
    return;
  }
  
  currentLang = lang;
  console.log('🌐 Cambiando idioma a:', lang);
  
  // Actualizar todos los elementos con clase lang-*
  document.querySelectorAll('[class*="lang-"]').forEach(el => {
    const classes = Array.from(el.classList);
    const langClass = classes.find(c => c.startsWith('lang-'));
    if (langClass) {
      const key = langClass.replace('lang-', '');
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    }
  });
  
  // Actualizar el texto del botón generar según el método de pago seleccionado
  updateGenerateButtonText();
  
  // Verificar si hay un QR para actualizar su contenido
  const qrResult = document.getElementById('qrResult');
  if (qrResult && qrResult.dataset.qrData) {
    try {
      renderQRContent(JSON.parse(qrResult.dataset.qrData));
    } catch (e) {
      console.error('Error al renderizar QR con nuevo idioma:', e);
    }
  }
  
  // Verificar si hay resultado de enlace para actualizar su contenido
  if (qrResult && qrResult.dataset.linkData) {
    try {
      renderLinkContent(JSON.parse(qrResult.dataset.linkData));
    } catch (e) {
      console.error('Error al renderizar enlace con nuevo idioma:', e);
    }
  }
}

// Función para actualizar el texto del botón de generar según el método seleccionado
function updateGenerateButtonText() {
  const generateButton = document.getElementById('generateButton');
  if (!generateButton) return;
  
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'qr';
  const t = translations[currentLang || 'es'];
  
  if (paymentMethod === 'link') {
    generateButton.textContent = t.generateLinkBtn;
  } else {
    generateButton.textContent = t.generateBtn;
  }
}

// Función para renderizar el contenido del QR con traducción
function renderQRContent(data) {
  const qrResult = document.getElementById('qrResult');
  if (!qrResult) {
    console.error('❌ Elemento qrResult no encontrado');
    return;
  }
  
  const t = translations[currentLang || 'es'];
  
  // Guardar datos para futura traducción
  qrResult.dataset.qrData = JSON.stringify(data);
  // Limpiar dataset de enlace si existiera
  delete qrResult.dataset.linkData;
  
  // Construir HTML basado en el idioma actual
  let html = `<h5 class="mt-3 mb-3">${t.qrTitle}</h5>`;
  
  // Información de pago
  if (data.currency === 'USD') {
    html += `<p><strong>${t.amountLabel}</strong> $${data.amountUSD} USD</p>`;
  } else {
    html += `<p><strong>${t.amountLabel}</strong> $${data.amountCLP} CLP</p>`;
    html += `<p><strong>${t.exchangeRate}</strong> ${data.rateCLPperUSD}</p>`;
    html += `<p><strong>${t.amountLabel} USD:</strong> $${data.amountUSD} USD</p>`;
  }
  
  // Comprobar que vetTax existe y es un valor válido
  let vetTaxValue = data.vetTax || "5.3";
  
  // Eliminar el símbolo % si existe para mostrarlo como número decimal
  if (typeof vetTaxValue === 'string' && vetTaxValue.includes('%')) {
    vetTaxValue = vetTaxValue.replace('%', '');
  }
  
  html += `<p><strong>${t.brazilianTax}</strong> ${vetTaxValue}</p>`;
  
  // Comprobar que amountBRL existe y es un valor válido
  const amountBRL = data.amountBRL || "0.00";
  html += `<p><strong>${t.clientWillPay}</strong> R$ ${amountBRL}</p>`;
  
  // Enlace de pago si existe
  if (data.qrData && data.qrData.pixCopyPast) {
    html += `<p><strong>${t.paymentLink}</strong><br>
      <a href="${data.qrData.pixCopyPast}" target="_blank">${data.qrData.pixCopyPast}</a></p>`;
  }
  
  // Imagen QR si existe
  if (data.qrData && data.qrData.qrCodeBase64) {
    // Asegurarse de que la cadena base64 es completa
    console.log('🖼️ Datos QR Base64 recibidos, longitud:', data.qrData.qrCodeBase64.length);
    
    html += `<div class="d-flex justify-content-center">
              <img src="data:image/png;base64,${data.qrData.qrCodeBase64}" 
                  alt="QR PIX" class="img-fluid mt-3" 
                  style="max-width: 250px; border: 1px solid #ddd; padding: 10px; background: white;" />
            </div>`;
  } else {
    html += `<p class="text-warning">QR no disponible</p>`;
  }
  
  // Elemento para countdown
  html += `<p id="countdown" class="text-danger fw-bold mt-3"></p>`;
  
  qrResult.innerHTML = html;
  
  // Verificar si la imagen se cargó correctamente
  setTimeout(() => {
    const qrImage = qrResult.querySelector('img');
    if (qrImage) {
      qrImage.onerror = () => {
        console.error('❌ Error al cargar la imagen QR');
        qrImage.style.display = 'none';
        qrResult.insertAdjacentHTML('beforeend', '<p class="text-danger">Error al mostrar la imagen QR</p>');
      };
    }
  }, 100);
}

// Función para renderizar el contenido de enlace de pago
function renderLinkContent(data) {
  const qrResult = document.getElementById('qrResult');
  if (!qrResult) {
    console.error('❌ Elemento qrResult no encontrado');
    return;
  }
  
  const t = translations[currentLang || 'es'];
  
  // Guardar datos para futura traducción
  qrResult.dataset.linkData = JSON.stringify(data);
  // Limpiar dataset de QR si existiera
  delete qrResult.dataset.qrData;
  
  // Construir HTML basado en el idioma actual
  let html = `<div class="alert alert-success">
                <h5 class="mt-2 mb-2">${t.linkSuccess}</h5>
                <p class="mb-0">${t.linkInstructions}</p>
              </div>`;
  
  // Información de pago
  html += `<div class="card mt-3">
             <div class="card-body">
               <h5 class="card-title">${t.linkTitle}</h5>
               <p><strong>${t.client}</strong> ${data.name}</p>
               <p><strong>${t.clientEmail}</strong> ${data.email}</p>`;
  
  if (data.description) {
    html += `<p><strong>${t.description}</strong> ${data.description}</p>`;
  }
  
  if (data.currency === 'USD') {
    html += `<p><strong>${t.amountLabel}</strong> $${data.amountUSD} USD</p>`;
  } else {
    html += `<p><strong>${t.amountLabel}</strong> $${data.amountCLP} CLP</p>`;
    html += `<p><strong>${t.amountLabel} USD:</strong> $${data.amountUSD} USD</p>`;
  }
  
  // Comprobar que amountBRL existe y es un valor válido
  if (data.amountBRL) {
    html += `<p><strong>${t.clientWillPay}</strong> R$ ${data.amountBRL}</p>`;
  }
  
  html += `   <p><strong>${t.date}</strong> ${new Date().toLocaleString()}</p>
               <p class="mb-0"><strong>ID:</strong> ${data.transactionId || data.id}</p>
             </div>
           </div>`;
  
  qrResult.innerHTML = html;
}
