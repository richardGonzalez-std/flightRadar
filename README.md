# ✈️ FlightRadar

Aplicación web Django para rastrear vuelos en tiempo real usando la API de FlightRadar24.

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Django](https://img.shields.io/badge/Django-4.2.11-green.svg)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-purple.svg)

🌐 **Demo:** [flightradar-2n0z.onrender.com](https://flightradar-2n0z.onrender.com)

---

## 🚀 Características

- 🔍 Búsqueda de vuelos por número (ej: AA123, BA456)
- 📊 Información en tiempo real: aerolínea, origen/destino, horarios, estado
- 🎨 Interfaz responsive con Bootstrap 5
- ✨ Animaciones suaves con Lottie
- ⚡ Búsqueda asíncrona sin recargar página

---

## 🛠️ Tecnologías

**Backend:** Django 5.2, Python 3.8+, Gunicorn  
**Frontend:** HTML5, CSS3, JavaScript Vanilla, Bootstrap 5  
**API:** FlightRadar24 (RapidAPI)  
**Deployment:** Render + WhiteNoise

---

## 📦 Instalación

### 1. Clonar y configurar entorno

```bash
git clone https://github.com/richardGonzalez-std/flightRadar.git
cd flightRadar
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz:

```env
SECRET_KEY=tu-django-secret-key
DEBUG=True
RAPIDAPI_KEY=tu-rapidapi-key
```

**Obtener RAPIDAPI_KEY:**
1. Regístrate en [RapidAPI FlightRadar24](https://rapidapi.com/apidojo/api/flightradar24)
2. Suscríbete al plan gratuito
3. Copia tu X-RapidAPI-Key

### 3. Iniciar base de datos y servidor

```bash
python manage.py migrate
python manage.py runserver
```

Visita: **http://localhost:8000**

---

## 💻 Uso

1. Ingresa un número de vuelo (ej: `AA123`)
2. Haz clic en **"Track Flight"**
3. Revisa la información en tiempo real

---

## 📁 Estructura

```
flightRadar/
├── flightRadar/          # Configuración Django
├── perflight/            # App principal
│   ├── static/           # CSS y JavaScript
│   ├── templates/        # HTML
│   └── views.py          # Lógica de vistas
├── requirements.txt      # Dependencias
└── build.sh             # Script deployment
```

---

## 🗺️ Roadmap

**Próximas mejoras:**
- [ ] Validación robusta de entrada
- [ ] Manejo de errores completo
- [ ] Tests unitarios
- [ ] Caché de resultados
- [ ] Historial de búsquedas
- [ ] Mapa interactivo de rutas

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Fork el repo, crea una rama, haz commit y abre un Pull Request.

---

## 📄 Licencia

MIT License - Consulta [LICENSE](LICENSE) para más detalles.

---

## 👤 Contacto

**Richard González**

- GitHub: [@richardGonzalez-std](https://github.com/richardGonzalez-std)
- LinkedIn: [riparedesgonzalez](https://www.linkedin.com/in/riparedesgonzalez)

---

⭐ **Si te gusta este proyecto, dale una estrella!** ⭐