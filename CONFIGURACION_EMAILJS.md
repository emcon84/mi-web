# Configuración del Formulario de Contacto con EmailJS

## ✅ Estado Actual

- ✅ EmailJS instalado correctamente
- ✅ Servicio híbrido implementado (EmailJS + mailto como respaldo)
- ✅ Notificaciones elegantes con animaciones
- ✅ Funciona inmediatamente con mailto

## 🚀 Configuración de EmailJS para Envío Automático

### Paso 1: Crear Cuenta en EmailJS

1. Ve a [https://www.emailjs.com](https://www.emailjs.com)
2. Regístrate con tu email `emcon84@gmail.com`
3. Confirma tu email

### Paso 2: Configurar Servicio de Email

1. En el dashboard, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona **Gmail** (recomendado)
4. Autoriza tu cuenta de Gmail `emcon84@gmail.com`
5. Copia el **Service ID** (ej: `service_abc123`)

### Paso 3: Crear Template de Email

1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Configura el template:

**Subject:**

```
Nuevo mensaje de {{from_name}} desde tu portfolio
```

**Content:**

```
Has recibido un nuevo mensaje desde tu portfolio:

Nombre: {{from_name}}
Email: {{from_email}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde tu portfolio web.
```

4. En **Settings**:
   - **To Email:** `emcon84@gmail.com`
   - **Reply To:** `{{from_email}}`
5. Copia el **Template ID** (ej: `template_xyz789`)

### Paso 4: Obtener Public Key

1. Ve a **"Account"** → **"General"**
2. Copia tu **Public Key** (ej: `user_abcdefghijk`)

### Paso 5: Configurar las Credenciales

Edita el archivo `src/services/emailService.js`:

```javascript
const EMAIL_CONFIG = {
  SERVICE_ID: "service_abc123", // Tu Service ID real
  TEMPLATE_ID: "template_xyz789", // Tu Template ID real
  PUBLIC_KEY: "user_abcdefghijk", // Tu Public Key real
};
```

## 🎯 Testing

### Método Actual (mailto)

1. Llena el formulario
2. Haz clic en "Enviar Mensaje"
3. Se abre tu cliente de email
4. ✅ **Funciona inmediatamente**

### Después de Configurar EmailJS

1. Llena el formulario
2. Haz clic en "Enviar Mensaje"
3. El email se envía automáticamente
4. Recibes notificación de éxito
5. El email llega directamente a `emcon84@gmail.com`

## 💡 Ventajas del Sistema Híbrido

✅ **Funciona sin configuración** (usando mailto)
✅ **Se mejora automáticamente** cuando configuras EmailJS
✅ **Tiene respaldo** si EmailJS falla
✅ **Notificaciones elegantes** en ambos casos
✅ **No requiere backend** ni servidor

## 🔧 Configuración Avanzada (Opcional)

### Límites de EmailJS:

- **Plan Gratuito:** 200 emails/mes
- **Plan Básico:** $15/mes - 1000 emails/mes

### Configuración de Gmail (si es necesario):

1. Habilitar "Aplicaciones menos seguras" (no recomendado)
2. O usar "Contraseñas de aplicación" (recomendado)
3. EmailJS maneja esto automáticamente en la mayoría de casos

## 🚀 Próximos Pasos

1. **Inmediato:** El formulario ya funciona con mailto
2. **Opcional:** Configurar EmailJS siguiendo los pasos anteriores
3. **Testing:** Probar el formulario en ambos modos

¿Necesitas ayuda configurando EmailJS o prefieres mantener el sistema actual?
