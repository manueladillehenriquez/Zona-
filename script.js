/* =========================================================
   ZONA Premiaciones en Metal - script.js
   SPA estática con hash-routing, LocalStorage y sessionStorage.
   ========================================================= */

/* ================= CONFIGURACIÓN ================= */
const CONFIG = {
  whatsappNumero: "56226716459",
  adminEmail: "zonatrofeos@hotmail.cl",
  // Correo al que llegan los formularios vía FormSubmit.co (sin necesidad de cuenta).
  // La primera vez que llegue un mensaje real, FormSubmit enviará un correo de
  // confirmación a esta casilla (revisar bandeja de entrada y spam) para activarlo.
  formsubmitEmail: "zonatrofeos@hotmail.cl"
};

/* ================= DATOS INICIALES ================= */

const PRODUCTOS = [
  { id: 1, nombre: "Copa Fútbol", categoria: "Copas", imagen: "images/productos/producto-1.png",
    descripcion: "Copa deportiva clásica ideal para torneos de fútbol y actividades escolares.",
    especificaciones: { Material: "Metal / resina", Altura: "35 cm aprox.", Personalización: "Grabado de logo y texto" } },
  { id: 2, nombre: "Copa MT080", categoria: "Copas", imagen: "images/productos/producto-2.png",
    descripcion: "Copa de premiación de líneas elegantes, apta para eventos corporativos y deportivos.",
    especificaciones: { Material: "Metal", Altura: "30 cm aprox.", Personalización: "Placa grabada" } },
  { id: 3, nombre: "Copa PC48 con Portalogo", categoria: "Copas", imagen: "images/productos/producto-3.png",
    descripcion: "Copa con espacio especial para portalogo personalizado a color.",
    especificaciones: { Material: "Metal", Altura: "28 cm aprox.", Personalización: "Portalogo full color" } },
  { id: 4, nombre: "Trofeo Cristal con Reloj", categoria: "Galvanos", imagen: "images/productos/producto-4.png",
    descripcion: "Trofeo de cristal con reloj incorporado, ideal para reconocimientos ejecutivos.",
    especificaciones: { Material: "Cristal / metal", Detalle: "Reloj funcional", Personalización: "Grabado láser" } },
  { id: 5, nombre: "Trofeo Cristal Llama", categoria: "Galvanos", imagen: "images/productos/producto-5.png",
    descripcion: "Trofeo de cristal con forma de llama, para premiaciones de alto estándar.",
    especificaciones: { Material: "Cristal", Personalización: "Grabado láser interior/exterior" } },
  { id: 6, nombre: "Medalla Sama Sobre Relieve", categoria: "Medallas", imagen: "images/productos/producto-6.jpg",
    descripcion: "Medalla con diseño en relieve, terminación de alto detalle.",
    especificaciones: { Material: "Metal", Diámetro: "5 cm", Personalización: "Relieve + cinta a color" } },
  { id: 7, nombre: "Medalla 5 cm Logo de Línea", categoria: "Medallas", imagen: "images/productos/producto-7.jpg",
    descripcion: "Medalla de 5 cm con logo grabado en línea fina.",
    especificaciones: { Material: "Metal", Diámetro: "5 cm", Personalización: "Grabado de línea" } },
  { id: 8, nombre: "Medalla Sama Cobre", categoria: "Medallas", imagen: "images/productos/producto-8.jpg",
    descripcion: "Medalla acabado cobre, ideal para tercer lugar o ediciones especiales.",
    especificaciones: { Material: "Metal baño cobre", Personalización: "Logo a color" } },
  { id: 9, nombre: "Medalla Sama Cobre (Alt.)", categoria: "Medallas", imagen: "images/productos/producto-9.jpg",
    descripcion: "Variante de medalla acabado cobre con cinta personalizada.",
    especificaciones: { Material: "Metal baño cobre", Personalización: "Cinta a color" } },
  { id: 10, nombre: "Medalla Sama con Estuche", categoria: "Medallas", imagen: "images/productos/producto-10.jpg",
    descripcion: "Medalla presentada en estuche de lujo, perfecta para premiaciones institucionales.",
    especificaciones: { Material: "Metal", Incluye: "Estuche de presentación", Personalización: "Grabado + estuche" } },
  { id: 11, nombre: "Medalla Especial Bronce Dorada", categoria: "Medallas", imagen: "images/productos/producto-11.jpg",
    descripcion: "Medalla en tono bronce dorado, diseño especial de alta gama.",
    especificaciones: { Material: "Metal baño bronce dorado", Personalización: "Relieve especial" } },
  { id: 12, nombre: "Medalla Logo Color con Dome", categoria: "Medallas", imagen: "images/productos/producto-12.jpg",
    descripcion: "Medalla con logo a color y resina dome de alto brillo.",
    especificaciones: { Material: "Metal", Personalización: "Logo full color + dome resina" } },
  { id: 13, nombre: "Medalla Logo Color con Dome (Alt.)", categoria: "Medallas", imagen: "images/productos/producto-13.jpg",
    descripcion: "Variante de medalla con dome y logo a color.",
    especificaciones: { Material: "Metal", Personalización: "Logo full color + dome resina" } },
  { id: 14, nombre: "Placa 512 Logo Color Grabado Láser", categoria: "Galvanos", imagen: "images/productos/producto-14.jpg",
    descripcion: "Insignia/placa con logo a color grabado con tecnología láser.",
    especificaciones: { Material: "Metal", Personalización: "Grabado láser + color" } },
  { id: 15, nombre: "Galvano Fondo Vidrio y Madera", categoria: "Galvanos", imagen: "images/productos/producto-15.jpg",
    descripcion: "Galvano con fondo de vidrio grabado y base de madera, ideal para reconocimientos institucionales.",
    especificaciones: { Material: "Metal / vidrio / madera", Personalización: "Grabado láser" } },
  { id: 16, nombre: "Retablo Grabado Láser", categoria: "Galvanos", imagen: "images/productos/producto-16.png",
    descripcion: "Retablo conmemorativo con grabado láser de alta precisión.",
    especificaciones: { Material: "Metal / madera", Personalización: "Grabado láser" } },
  { id: 17, nombre: "Atril de Madera", categoria: "Galvanos", imagen: "images/productos/producto-17.png",
    descripcion: "Atril de madera para exhibir medallas, placas o reconocimientos.",
    especificaciones: { Material: "Madera", Uso: "Exhibición de premiaciones" } },
  { id: 18, nombre: "Atril con Reloj Pequeño", categoria: "Galvanos", imagen: "images/productos/producto-18.jpg",
    descripcion: "Atril compacto con reloj incorporado, ideal como regalo corporativo.",
    especificaciones: { Material: "Metal / madera", Detalle: "Reloj funcional" } },
  { id: 19, nombre: "Llavero Sama", categoria: "Llaveros", imagen: "images/productos/producto-19.jpg",
    descripcion: "Llavero metálico personalizado, ideal para identificación corporativa o merchandising.",
    especificaciones: { Material: "Metal", Personalización: "Logo grabado o a color" } },
  { id: 20, nombre: "Llavero Sama (Alt.)", categoria: "Llaveros", imagen: "images/productos/producto-20.jpg",
    descripcion: "Variante de llavero metálico personalizado.",
    especificaciones: { Material: "Metal", Personalización: "Logo grabado o a color" } },
  { id: 21, nombre: "Llavero Metal Logo Color", categoria: "Llaveros", imagen: "images/productos/producto-21.jpg",
    descripcion: "Llavero metálico con logo impreso a color, ideal para regalos corporativos.",
    especificaciones: { Material: "Metal", Personalización: "Logo full color" } },
  { id: 22, nombre: "Cristal 338 Grabado", categoria: "Grabados Láser", imagen: "images/productos/producto-22.jpg",
    descripcion: "Pieza de cristal con grabado láser interior de alta definición.",
    especificaciones: { Material: "Cristal", Personalización: "Grabado láser 3D interior" } },
  { id: 23, nombre: "Cristal 3381", categoria: "Grabados Láser", imagen: "images/productos/producto-23.jpg",
    descripcion: "Bloque de cristal grabado, ideal para reconocimientos ejecutivos.",
    especificaciones: { Material: "Cristal", Personalización: "Grabado láser" } },
  { id: 24, nombre: "Cristal 315 Laserado", categoria: "Grabados Láser", imagen: "images/productos/producto-24.jpg",
    descripcion: "Cristal laserado con diseño personalizado a definir por el cliente.",
    especificaciones: { Material: "Cristal", Personalización: "Grabado láser" } },
  { id: 25, nombre: "Cristal 512 Laserado", categoria: "Grabados Láser", imagen: "images/productos/producto-25.jpg",
    descripcion: "Cristal de formato mayor con grabado láser de precisión.",
    especificaciones: { Material: "Cristal", Personalización: "Grabado láser" } },
  { id: 26, nombre: "Cristal JGA19 Grabado", categoria: "Grabados Láser", imagen: "images/productos/producto-26.jpg",
    descripcion: "Cristal con grabado conmemorativo JGA19, terminación premium.",
    especificaciones: { Material: "Cristal", Personalización: "Grabado láser" } },
  { id: 27, nombre: "Llavero Madera Corte Láser", categoria: "Grabados Láser", imagen: "images/productos/producto-27.jpg",
    descripcion: "Llavero de madera cortado y grabado con tecnología láser.",
    especificaciones: { Material: "Madera", Personalización: "Corte y grabado láser" } },
  { id: 28, nombre: "Llavero Madera Acrílico", categoria: "Grabados Láser", imagen: "images/productos/producto-28.jpg",
    descripcion: "Llavero combinado madera y acrílico con grabado láser.",
    especificaciones: { Material: "Madera / acrílico", Personalización: "Grabado láser" } },
  { id: 29, nombre: "Llavero Madera Redondo", categoria: "Grabados Láser", imagen: "images/productos/producto-29.jpg",
    descripcion: "Llavero redondo de madera con grabado láser personalizado.",
    especificaciones: { Material: "Madera", Personalización: "Grabado láser" } },
  { id: 30, nombre: "Posavasos Grabado", categoria: "Grabados Láser", imagen: "images/productos/producto-30.jpg",
    descripcion: "Set de posavasos personalizados con grabado láser, ideal como regalo corporativo.",
    especificaciones: { Material: "Madera / metal", Personalización: "Grabado láser" } },

  { id: 31, nombre: "Copa TBR", categoria: "Copas", imagen: "images/productos/producto-31.png",
    descripcion: "Copa de premiación con detalle esmaltado y base de mármol, terminación de alta gama.",
    especificaciones: { Material: "Metal", Base: "Mármol", Personalización: "Placa grabada" } },
  { id: 32, nombre: "Copa TBR11147", categoria: "Copas", imagen: "images/productos/producto-32.png",
    descripcion: "Copa clásica con asas y cintas de premiación, ideal para torneos y ceremonias.",
    especificaciones: { Material: "Metal", Incluye: "Cintas de premiación", Personalización: "Grabado de logo y texto" } },
  { id: 33, nombre: "Copa TBR12226", categoria: "Copas", imagen: "images/productos/producto-33.png",
    descripcion: "Copa alta de líneas rectas, apta para eventos corporativos, deportivos y educacionales.",
    especificaciones: { Material: "Metal", Base: "Mármol", Personalización: "Placa grabada" } },
  { id: 34, nombre: "Copa BTR5214", categoria: "Copas", imagen: "images/productos/producto-34.png",
    descripcion: "Copa de premiación con cintas tricolor y corona de laurel, terminación dorada brillante.",
    especificaciones: { Material: "Metal", Incluye: "Cintas de premiación", Personalización: "Medallón grabado" } },

  { id: 35, nombre: "Llavero Metal y Madera", categoria: "Llaveros", imagen: "images/productos/producto-35.png",
    descripcion: "Set de llaveros con opción de acabado metal rectangular o madera circular, ambos personalizables.",
    especificaciones: { Material: "Metal / madera", Personalización: "Grabado de logo o texto" } },
  { id: 36, nombre: "Llavero Madera Laserado", categoria: "Llaveros", imagen: "images/productos/producto-36.jpg",
    descripcion: "Llavero circular de madera con grabado láser de escudo o logo institucional.",
    especificaciones: { Material: "Madera", Personalización: "Grabado láser de escudo o logo" } },
  { id: 37, nombre: "Llavero Logo Color con Dome", categoria: "Llaveros", imagen: "images/productos/producto-37.jpg",
    descripcion: "Llavero metálico circular con logo institucional a color y resina dome.",
    especificaciones: { Material: "Metal", Personalización: "Logo full color + dome resina" } },
  { id: 38, nombre: "Llavero Metal Redondo", categoria: "Llaveros", imagen: "images/productos/producto-38.jpg",
    descripcion: "Llavero metálico redondo de superficie lisa, ideal para grabado de logo corporativo.",
    especificaciones: { Material: "Metal", Personalización: "Grabado de logo o texto" } },
  { id: 39, nombre: "Llavero Logo Color Especial", categoria: "Llaveros", imagen: "images/productos/producto-39.jpg",
    descripcion: "Llavero metálico circular con logo institucional impreso a color.",
    especificaciones: { Material: "Metal", Personalización: "Logo full color" } },

  { id: 40, nombre: "Piocha Bronce con Pintura", categoria: "Piochas", imagen: "images/productos/producto-40.jpg",
    descripcion: "Piocha en bronce con relieve y pintura a color, formato escudo institucional.",
    especificaciones: { Material: "Bronce", Personalización: "Relieve + pintura a color" } },
  { id: 41, nombre: "Piocha Bronce Bajo Relieve", categoria: "Piochas", imagen: "images/productos/producto-41.jpg",
    descripcion: "Piocha rectangular en bajo relieve, ideal para cargos, distinciones o identificación de equipo.",
    especificaciones: { Material: "Bronce / metal", Personalización: "Bajo relieve grabado" } },
  { id: 42, nombre: "Piocha Sama", categoria: "Piochas", imagen: "images/productos/producto-42.jpg",
    descripcion: "Piocha circular en relieve metálico, formato institucional clásico.",
    especificaciones: { Material: "Metal", Personalización: "Relieve grabado" } },
  { id: 43, nombre: "Piocha Base Importada", categoria: "Piochas", imagen: "images/productos/producto-43.jpg",
    descripcion: "Piocha circular con base importada y logo a color en resina, terminación premium.",
    especificaciones: { Material: "Metal", Personalización: "Logo a color + resina" } },
  { id: 44, nombre: "Piocha Bronce Relieve a Color", categoria: "Piochas", imagen: "images/productos/producto-44.jpg",
    descripcion: "Piocha circular en bronce con sobre y bajo relieve combinado con detalles a color.",
    especificaciones: { Material: "Bronce", Personalización: "Sobre y bajo relieve + color" } },
  { id: 45, nombre: "Piocha Insignia sin Resina", categoria: "Piochas", imagen: "images/productos/producto-45.jpg",
    descripcion: "Insignia metálica conmemorativa con acabado dorado y detalle esmaltado, sin resina protectora.",
    especificaciones: { Material: "Metal baño dorado", Personalización: "Relieve + esmaltado a color" } },
  { id: 46, nombre: "Piocha Relieve Niquelada", categoria: "Piochas", imagen: "images/productos/producto-46.jpg",
    descripcion: "Piocha rectangular niquelada con relieve grabado, ideal para cargos y distinciones formales.",
    especificaciones: { Material: "Metal niquelado", Personalización: "Relieve grabado" } },
  { id: 47, nombre: "Piocha Bajo Relieve Calada", categoria: "Piochas", imagen: "images/productos/producto-47.jpg",
    descripcion: "Piocha en forma de estrella con bajo relieve calado, ideal para reconocimientos de trayectoria.",
    especificaciones: { Material: "Metal", Personalización: "Bajo relieve calado" } },
  { id: 48, nombre: "Piocha Insignia Escudo a Color", categoria: "Piochas", imagen: "images/productos/producto-48.jpg",
    descripcion: "Insignia esmaltada en formato escudo, con colores de alta definición y acabado brillante.",
    especificaciones: { Material: "Metal esmaltado", Personalización: "Esmaltado a color por sectores" } },

  { id: 49, nombre: "Cristal Grabado Corporativo", categoria: "Grabados Láser", imagen: "images/productos/producto-49.jpg",
    descripcion: "Cristal rectangular con grabado láser de logo y texto personalizado, ideal para reconocimientos corporativos.",
    especificaciones: { Material: "Cristal", Personalización: "Grabado láser de logo y texto" } },
  { id: 50, nombre: "Cristal Grabado Conmemorativo", categoria: "Grabados Láser", imagen: "images/productos/producto-50.jpg",
    descripcion: "Cristal en forma de gota con grabado láser de aniversario corporativo, terminación facetada.",
    especificaciones: { Material: "Cristal", Personalización: "Grabado láser + base independiente" } },
  { id: 51, nombre: "Cristal Marmoleado Grabado", categoria: "Grabados Láser", imagen: "images/productos/producto-51.jpg",
    descripcion: "Cristal rectangular con fondo marmoleado y grabado láser blanco de alta legibilidad.",
    especificaciones: { Material: "Cristal marmoleado", Personalización: "Grabado láser en blanco" } },
  { id: 52, nombre: "Trofeo Metalizado Básquetbol", categoria: "Trofeos", imagen: "images/productos/producto-52.png",
    descripcion: "Figura de jugador de básquetbol en metal bañado dorado, con base de madera lacada en negro, ideal para premiaciones deportivas.",
    especificaciones: { Material: "Metal bañado en dorado / base de madera", Altura: "28 cm aprox.", Personalización: "Placa grabada con nombre y fecha" } },
  { id: 53, nombre: "Trofeo Metalizado Oscar", categoria: "Trofeos", imagen: "images/productos/producto-53.png",
    descripcion: "Estatuilla estilo Oscar en metal dorado sobre base de mármol blanco, perfecta para premios de reconocimiento y galas.",
    especificaciones: { Material: "Metal bañado en dorado / base de mármol", Altura: "20 cm aprox.", Personalización: "Grabado en la base" } },
  { id: 54, nombre: "Trofeo Metalizado Portalogo PRH-02", categoria: "Trofeos", imagen: "images/productos/producto-54.jpg",
    descripcion: "Trofeo metalizado con espacio circular para portalogo y base de mármol, de líneas clásicas para premiaciones institucionales.",
    especificaciones: { Material: "Metal bañado en dorado / base de mármol", Altura: "22 cm aprox.", Personalización: "Portalogo circular + grabado en la base" } },
  { id: 55, nombre: "Trofeo Resina Arquero", categoria: "Trofeos", imagen: "images/productos/producto-55.png",
    descripcion: "Trofeo de resina con la figura de un arquero atajando el balón, terminación bronce con placa para grabado.",
    especificaciones: { Material: "Resina", Altura: "24 cm aprox.", Personalización: "Placa grabada" } },
  { id: 56, nombre: "Trofeo Resina Balón", categoria: "Trofeos", imagen: "images/productos/producto-56.png",
    descripcion: "Trofeo de resina con forma de balón de fútbol sobre base negra, con placa para grabado de logo y texto.",
    especificaciones: { Material: "Resina", Altura: "18 cm aprox.", Personalización: "Placa grabada" } },
  { id: 57, nombre: "Trofeo Resina Botín Grande", categoria: "Trofeos", imagen: "images/productos/producto-57.png",
    descripcion: "Trofeo de resina con forma de botín de fútbol, terminación dorada y base negra con placa para grabado.",
    especificaciones: { Material: "Resina", Altura: "20 cm aprox.", Personalización: "Placa grabada" } },
  { id: 58, nombre: "Trofeo Resina Fútbol Dama", categoria: "Trofeos", imagen: "images/productos/producto-58.png",
    descripcion: "Trofeo de resina con la figura de una futbolista en acción, con escudo portalogo y base negra.",
    especificaciones: { Material: "Resina", Altura: "26 cm aprox.", Personalización: "Portalogo + grabado en la base" } },
  { id: 59, nombre: "Trofeo Resina Fútbol", categoria: "Trofeos", imagen: "images/productos/producto-59.png",
    descripcion: "Trofeo de resina con la figura de un futbolista celebrando un gol, sobre base de piedra.",
    especificaciones: { Material: "Resina", Altura: "26 cm aprox.", Personalización: "Grabado en la base" } },
  { id: 60, nombre: "Trofeo Resina Golf", categoria: "Trofeos", imagen: "images/productos/producto-60.png",
    descripcion: "Trofeo de resina con la figura de un jugador de golf sobre una cabeza de palo, con placa para grabado.",
    especificaciones: { Material: "Resina", Altura: "24 cm aprox.", Personalización: "Placa grabada" } },
  { id: 61, nombre: "Trofeo Resina Guante de Arquero", categoria: "Trofeos", imagen: "images/productos/producto-61.jpg",
    descripcion: "Trofeo de resina con forma de guante de arquero en dorado y plata, sobre base negra.",
    especificaciones: { Material: "Resina", Altura: "22 cm aprox.", Personalización: "Grabado en la base" } },
  { id: 62, nombre: "Trofeo Resina Karate", categoria: "Trofeos", imagen: "images/productos/producto-62.png",
    descripcion: "Trofeo de resina con la figura de un deportista ejecutando una patada de karate, con portalogo y base negra.",
    especificaciones: { Material: "Resina", Altura: "24 cm aprox.", Personalización: "Portalogo + grabado en la base" } },
  { id: 63, nombre: "Trofeo Resina Llave de Sol", categoria: "Trofeos", imagen: "images/productos/producto-63.png",
    descripcion: "Trofeo de resina con forma de llave de sol, ideal para premiaciones y concursos de música.",
    especificaciones: { Material: "Resina", Altura: "20 cm aprox.", Personalización: "Grabado en la base" } },
  { id: 64, nombre: "Trofeo Resina Tenis Raqueta", categoria: "Trofeos", imagen: "images/productos/producto-64.jpg",
    descripcion: "Trofeo de resina en forma de escudo con raqueta y pelota de tenis en relieve, con espacio para grabado.",
    especificaciones: { Material: "Resina", Altura: "20 cm aprox.", Personalización: "Grabado en el escudo" } },
  { id: 65, nombre: "Trofeo Resina Tenis", categoria: "Trofeos", imagen: "images/productos/producto-65.jpg",
    descripcion: "Trofeo de resina con la figura de un tenista en pleno saque, terminación bronce sobre base negra.",
    especificaciones: { Material: "Resina", Altura: "28 cm aprox.", Personalización: "Grabado en la base" } },
  { id: 66, nombre: "Trofeo Resina Zapato y Balón", categoria: "Trofeos", imagen: "images/productos/producto-66.jpg",
    descripcion: "Trofeo de resina con botín y balón de fútbol sobre base negra, con medallón portalogo.",
    especificaciones: { Material: "Resina", Altura: "18 cm aprox.", Personalización: "Portalogo + grabado en la base" } }
];

const CATEGORIAS = ["Todas", "Copas", "Medallas", "Galvanos", "Piochas", "Llaveros", "Grabados Láser", "Trofeos"];

const TESTIMONIOS = [
  { texto: "El equipo de ZONA entendió perfectamente lo que necesitábamos. La calidad de las piezas y la puntualidad en la entrega superaron nuestras expectativas.", autor: "Encargada de Eventos", empresa: "SEDUCA" },
  { texto: "Trabajar con ZONA fue muy fácil desde el primer contacto. Nos asesoraron en cada detalle del diseño y entregaron un producto de primer nivel.", autor: "Encargado de Premiaciones", empresa: "COPA COPEC" },
  { texto: "Quedamos muy conformes con el trato cercano y la rapidez de respuesta. Las piezas llegaron impecables y a tiempo para nuestra ceremonia.", autor: "Administración", empresa: "Edificio Amapolas" },
  { texto: "La atención personalizada y la calidad de los materiales hacen la diferencia. Sin duda seguiremos trabajando con ZONA en nuestras próximas premiaciones.", autor: "Coordinación General", empresa: "Fábula" }
];

const FAQS = [
  { p: "¿Cuánto tiempo tarda una cotización?", r: "Nos contactamos contigo dentro de las primeras 24 horas hábiles luego de recibir tu solicitud." },
  { p: "¿Cuál es el tiempo de entrega?", r: "Una vez aprobado el presupuesto, la ejecución del trabajo toma menos de una semana. El despacho depende de tu región (ver Zonas de Despacho)." },
  { p: "¿Cómo pago?", r: "Puedes pagar por transferencia bancaria, tarjeta o efectivo de forma presencial. Se solicita un 50% de abono al aprobar el presupuesto y el saldo al recibir el trabajo." },
  { p: "¿Hacen entrega a todo Chile?", r: "Sí, despachamos a todo el país, incluyendo Rapa Nui (Isla de Pascua). Consulta los tiempos estimados por región en la sección Zonas de Despacho." },
  { p: "¿Puedo personalizar los diseños?", r: "Sí, todos nuestros productos admiten personalización de logo, texto y, en varios casos, color y materiales." },
  { p: "¿Ofrecen garantía?", r: "Sí, todos nuestros trabajos cuentan con garantía de calidad. Ante cualquier defecto de fabricación, contáctanos." }
];

const ZONAS_DESPACHO = [
  { region: "XV - Arica y Parinacota / I - Tarapacá", dias: "5-7 días hábiles", obs: "Despacho vía transporte interregional" },
  { region: "II - Antofagasta", dias: "4-6 días hábiles", obs: "Despacho vía transporte interregional" },
  { region: "III - Atacama / IV - Coquimbo", dias: "3-5 días hábiles", obs: "Despacho vía transporte interregional" },
  { region: "V - Valparaíso", dias: "1-3 días hábiles", obs: "Incluye zona de Valparaíso y Viña del Mar" },
  { region: "Metropolitana", dias: "1-2 días hábiles", obs: "Entrega en Santiago y alrededores" },
  { region: "VI - O'Higgins / VII - Maule", dias: "2-4 días hábiles", obs: "Despacho vía transporte interregional" },
  { region: "VIII - Biobío / XVI - Ñuble", dias: "3-5 días hábiles", obs: "Despacho vía transporte interregional" },
  { region: "IX - La Araucanía / XIV - Los Ríos", dias: "4-6 días hábiles", obs: "Despacho vía transporte interregional" },
  { region: "X - Los Lagos", dias: "5-7 días hábiles", obs: "Despacho vía transporte interregional" },
  { region: "XI - Aysén / XII - Magallanes", dias: "7-10 días hábiles", obs: "Zonas extremas, coordinar con anticipación" },
  { region: "Rapa Nui (Isla de Pascua)", dias: "10-15 días hábiles", obs: "Despacho vía transporte aéreo/marítimo, coordinar con anticipación" }
];

/* ================= HELPERS LOCALSTORAGE ================= */
function getLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : (fallback !== undefined ? fallback : null);
  } catch (e) { return fallback !== undefined ? fallback : null; }
}
function setLS(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* almacenamiento lleno o no disponible */ }
}

function seedData() {
  if (!localStorage.getItem("usuarios")) {
    setLS("usuarios", [
      { id: 1, empresa: "ZONA Admin", email: "admin@zona.cl", password: "admin123", telefono: "", fecha_registro: new Date().toISOString(), activo: true, rol: "admin" },
      { id: 2, empresa: "Empresa Demo", email: "demo@empresa.cl", password: "demo123", telefono: "912345678", fecha_registro: new Date().toISOString(), activo: true, rol: "cliente" }
    ]);
  }
  if (!localStorage.getItem("cotizaciones")) {
    setLS("cotizaciones", []);
  }
}

function getUsuarios() { return getLS("usuarios", []); }
function setUsuarios(list) { setLS("usuarios", list); }
function getCotizaciones() { return getLS("cotizaciones", []); }
function setCotizaciones(list) { setLS("cotizaciones", list); }

/* ================= AUTENTICACIÓN ================= */
function getUsuarioActual() {
  try { return JSON.parse(sessionStorage.getItem("usuarioActual")); } catch (e) { return null; }
}
function estaLogueado() { return !!getUsuarioActual(); }
function esAdmin() {
  const u = getUsuarioActual();
  return !!(u && u.rol === "admin");
}
/* ================================================================
   NOTA DE SEGURIDAD IMPORTANTE — LEER ANTES DE CONFIAR EN ESTE LOGIN
   ================================================================
   Esta función y todo el sistema de "usuarios" viven 100% en el
   navegador del visitante (localStorage/sessionStorage). NO hay
   servidor ni base de datos real detrás.
   Esto implica que:
   - Las contraseñas están en texto plano, visibles en el código fuente
     y en localStorage vía las herramientas de desarrollador.
   - Cualquier persona puede editar localStorage o el propio JS para
     iniciar sesión como admin sin conocer la contraseña.
   - No existe límite real de intentos de inicio de sesión, ni hash de
     contraseñas, ni autenticación de servidor: cualquier intento de
     agregar eso aquí sería solo cosmético, no una barrera real.
   Este login sirve para DEMOSTRAR el flujo de la aplicación (cliente
   vs. admin), no para proteger datos sensibles reales. Si en el futuro
   se maneja información sensible de clientes o pagos, esto debe
   reemplazarse por autenticación real de servidor (ej. Firebase Auth,
   ver Fase 2 del proyecto).
   ================================================================ */
function login(email, password) {
  const usuarios = getUsuarios();
  const usuario = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (usuario) {
    sessionStorage.setItem("usuarioActual", JSON.stringify({ id: usuario.id, empresa: usuario.empresa, email: usuario.email, rol: usuario.rol || "cliente" }));
    return { ok: true, rol: usuario.rol || "cliente" };
  }
  return { ok: false };
}
function registrar(datos) {
  const usuarios = getUsuarios();
  if (usuarios.some(u => u.email.toLowerCase() === datos.email.toLowerCase())) {
    return { ok: false, error: "Ese email ya está registrado." };
  }
  const nuevo = {
    id: Date.now(),
    empresa: datos.empresa,
    email: datos.email,
    password: datos.password,
    telefono: datos.telefono || "",
    fecha_registro: new Date().toISOString(),
    activo: true,
    rol: "cliente"
  };
  usuarios.push(nuevo);
  setUsuarios(usuarios);
  sessionStorage.setItem("usuarioActual", JSON.stringify({ id: nuevo.id, empresa: nuevo.empresa, email: nuevo.email, rol: "cliente" }));
  return { ok: true };
}
function logout() {
  sessionStorage.removeItem("usuarioActual");
  navigate("/");
}

/* ================= COTIZACIONES ================= */
function guardarCotizacion(datos) {
  const cotizaciones = getCotizaciones();
  const nueva = {
    id: Date.now(),
    empresa: datos.empresa,
    email: datos.email,
    telefono: datos.telefono,
    producto: datos.producto,
    cantidad: Number(datos.cantidad),
    especificaciones: datos.especificaciones || "",
    fecha_requerida: datos.fecha_requerida,
    fecha_solicitud: new Date().toISOString(),
    estado: "Pendiente",
    presupuesto: null,
    presupuesto_descripcion: "",
    pago: null,
    mensaje_rechazo: ""
  };
  cotizaciones.push(nueva);
  setCotizaciones(cotizaciones);
  sessionStorage.setItem("ultimaCotizacionAnonima", JSON.stringify({ id: nueva.id, email: nueva.email }));
  return nueva;
}
function obtenerCotizacionesUsuario(email) {
  return getCotizaciones().filter(c => c.email.toLowerCase() === email.toLowerCase());
}
function actualizarCotizacion(id, cambios) {
  const cotizaciones = getCotizaciones();
  const idx = cotizaciones.findIndex(c => c.id === id);
  if (idx === -1) return null;
  cotizaciones[idx] = Object.assign({}, cotizaciones[idx], cambios);
  setCotizaciones(cotizaciones);
  return cotizaciones[idx];
}

/* ================= VALIDACIÓN ================= */
function validarEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

/* Escapa HTML antes de insertar datos de usuario en el DOM (previene XSS).
   Usar siempre con datos que vengan de formularios (empresa, email, mensaje,
   especificaciones, etc.) antes de interpolarlos en innerHTML. */
function esc(valor) {
  if (valor === null || valor === undefined) return "";
  return String(valor)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
function validarTelefono(tel) { return /^(\+?56)?\s?9\s?\d{4}\s?\d{4}$/.test(tel.replace(/[-()]/g, "")); }

function mostrarErrorCampo(input, mensaje) {
  input.classList.add("invalid");
  const err = input.parentElement.querySelector(".form-error");
  if (err) err.textContent = mensaje;
}
function limpiarErrorCampo(input) {
  input.classList.remove("invalid");
  const err = input.parentElement.querySelector(".form-error");
  if (err) err.textContent = "";
}

/* ================= INTEGRACIONES: FORMSUBMIT + WHATSAPP ================= */
async function enviarFormulario(datos, asunto) {
  // Honeypot anti-bots: si el campo oculto "_honey" viene con contenido,
  // es casi seguro un bot rellenando el formulario automáticamente.
  if (datos._honey) {
    console.warn("Envío bloqueado por honeypot (probable bot).");
    return false;
  }
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${CONFIG.formsubmitEmail}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(Object.assign({ _subject: asunto, _captcha: "false" }, datos))
    });
    return response.ok;
  } catch (e) {
    console.error("Error enviando formulario a FormSubmit", e);
    return false;
  }
}
function generarLinkWhatsApp(mensaje) {
  return `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(mensaje)}`;
}
function abrirWhatsApp(mensaje) {
  window.open(generarLinkWhatsApp(mensaje), "_blank", "noopener");
}

/* ================= MODAL SYSTEM ================= */
const modalOverlay = () => document.getElementById("modalOverlay");
function abrirModal(id) {
  modalOverlay().classList.add("active");
  document.querySelectorAll(".modal").forEach(m => m.classList.remove("active"));
  const modal = document.getElementById(id);
  if (modal) modal.classList.add("active");
}
function cerrarModales() {
  modalOverlay().classList.remove("active");
  document.querySelectorAll(".modal").forEach(m => m.classList.remove("active"));
}

/* ================= ROUTER ================= */
function navigate(path) {
  if (location.hash.replace("#", "") !== path) {
    location.hash = "#" + path;
  } else {
    renderRoute();
  }
}

const RUTAS_PROTEGIDAS_CLIENTE = ["/dashboard/cliente"];
const RUTAS_PROTEGIDAS_ADMIN = ["/dashboard/admin"];

function renderRoute() {
  let path = location.hash.replace("#", "") || "/";
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);

  if (RUTAS_PROTEGIDAS_ADMIN.includes(path)) {
    if (!estaLogueado() || !esAdmin()) { navigate("/auth"); return; }
  } else if (RUTAS_PROTEGIDAS_CLIENTE.includes(path)) {
    if (!estaLogueado()) { navigate("/auth"); return; }
    if (esAdmin()) { navigate("/dashboard/admin"); return; }
  }

  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  let target = document.querySelector(`.page[data-route="${path}"]`);
  if (!target) target = document.getElementById("page-home");
  target.classList.add("active");

  document.querySelectorAll(".main-nav a[data-link]").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + path);
  });

  closeMobileNav();
  cerrarModales();
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

  if (path === "/catalogo") renderCatalogo();
  if (path === "/zonas") renderZonas();
  if (path === "/dashboard/cliente") renderDashboardCliente();
  if (path === "/dashboard/admin") renderDashboardAdmin();
  if (path === "/cotizar") prellenarCotizarSiCorresponde();

  updateAuthNav();
}

function updateAuthNav() {
  const link = document.getElementById("navAuthLink");
  if (!link) return;
  if (estaLogueado()) {
    const u = getUsuarioActual();
    link.textContent = esAdmin() ? "Panel Admin" : `Mi Panel (${u.empresa})`;
    link.setAttribute("href", esAdmin() ? "#/dashboard/admin" : "#/dashboard/cliente");
    link.style.display = "";
  } else {
    // El acceso público de "Ingresar" se oculta del header: el foco
    // de conversión es "Solicitar Cotización". Clientes ya logueados
    // siguen viendo su acceso al panel normalmente.
    link.style.display = "none";
  }
}

/* ================= NAV MOBILE ================= */
function closeMobileNav() {
  document.getElementById("mainNav").classList.remove("open");
  document.getElementById("hamburgerBtn").setAttribute("aria-expanded", "false");
}

/* ================= CARRUSEL ================= */
class CarouselRow {
  constructor() {
    this.wrapper = document.querySelector(".carousel-wrapper");
    if (!this.wrapper) return;
    this.slides = document.querySelectorAll(".carousel-slide");
    this.dots = document.querySelectorAll(".carousel-dot");
    this.prevBtn = document.querySelector(".carousel-prev");
    this.nextBtn = document.querySelector(".carousel-next");
    this.currentSlide = 0;
    this.slideCount = this.slides.length;
    this.autoRotateInterval = 6000;
    this.rotationTimer = null;
    this.init();
  }
  init() {
    if (this.prevBtn) this.prevBtn.addEventListener("click", () => this.prev());
    if (this.nextBtn) this.nextBtn.addEventListener("click", () => this.next());
    this.dots.forEach((dot, index) => dot.addEventListener("click", () => this.goToSlide(index)));
    this.wrapper.addEventListener("mouseenter", () => this.pauseRotation());
    this.wrapper.addEventListener("mouseleave", () => this.startRotation());
    this.startRotation();
  }
  showSlide(index) {
    this.slides.forEach(s => s.classList.remove("carousel-slide-active"));
    this.dots.forEach(d => d.classList.remove("carousel-dot-active"));
    this.slides[index].classList.add("carousel-slide-active");
    this.dots[index].classList.add("carousel-dot-active");
    this.currentSlide = index;
  }
  next() { this.showSlide((this.currentSlide + 1) % this.slideCount); this.resetRotationTimer(); }
  prev() { this.showSlide((this.currentSlide - 1 + this.slideCount) % this.slideCount); this.resetRotationTimer(); }
  goToSlide(index) { this.showSlide(index); this.resetRotationTimer(); }
  startRotation() { this.rotationTimer = setInterval(() => this.next(), this.autoRotateInterval); }
  pauseRotation() { if (this.rotationTimer) { clearInterval(this.rotationTimer); this.rotationTimer = null; } }
  resetRotationTimer() { this.pauseRotation(); this.startRotation(); }
}

/* ================= RENDER: HOME ================= */
function renderHome() {
  const destacadosGrid = document.getElementById("destacadosGrid");
  const destacados = PRODUCTOS.slice(0, 8);
  destacadosGrid.innerHTML = destacados.map(productoCardHTML).join("");

  const testimoniosGrid = document.getElementById("testimoniosGrid");
  testimoniosGrid.innerHTML = TESTIMONIOS.map(t => `
    <div class="testimonio-card">
      <p class="testimonio-texto">"${t.texto}"</p>
      <div class="testimonio-meta">
        <span class="testimonio-mark" aria-hidden="true"></span>
        <div>
          <p class="testimonio-autor">${t.autor}</p>
          <p class="testimonio-empresa">${t.empresa}</p>
        </div>
      </div>
    </div>
  `).join("");

  const faqList = document.getElementById("faqList");
  faqList.innerHTML = FAQS.map((f, i) => `
    <div class="faq-item" data-faq="${i}">
      <button class="faq-question">${f.p} <span class="faq-icon">+</span></button>
      <div class="faq-answer"><p>${f.r}</p></div>
    </div>
  `).join("");
  faqList.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => btn.closest(".faq-item").classList.toggle("open"));
  });

  document.querySelectorAll("#destacadosGrid .producto-card").forEach(bindProductoCardClick);
}

function productoCardHTML(p) {
  const whatsappHref = generarLinkWhatsApp(`Hola ZONA, quiero cotizar: ${p.nombre}`);
  return `
    <div class="producto-card" data-id="${p.id}">
      <div class="producto-img-wrap">
        <img src="${p.imagen}" alt="${p.nombre}" loading="lazy">
        <div class="producto-overlay">Ver Detalles</div>
      </div>
      <div class="producto-info">
        <span class="badge">${p.categoria}</span>
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <a class="btn-cotizar-producto" href="${whatsappHref}" target="_blank" rel="noopener" onclick="event.stopPropagation()">💬 Cotizar por WhatsApp</a>
      </div>
    </div>
  `;
}
function bindProductoCardClick(card) {
  card.addEventListener("click", () => abrirModalProducto(Number(card.dataset.id)));
}

/* ================= RENDER: CATÁLOGO ================= */
let catalogoEstado = { categoria: "Todas", busqueda: "" };

function renderFiltrosCategorias() {
  const cont = document.getElementById("filtroCategorias");
  cont.innerHTML = CATEGORIAS.map(c => `<button class="filtro-btn ${c === catalogoEstado.categoria ? "active" : ""}" data-cat="${c}">${c}</button>`).join("");
  cont.querySelectorAll(".filtro-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      catalogoEstado.categoria = btn.dataset.cat;
      renderFiltrosCategorias();
      renderCatalogoGrid();
    });
  });
}

function filtrarProductos(categoria) {
  if (categoria === "Todas") return PRODUCTOS;
  return PRODUCTOS.filter(p => p.categoria === categoria);
}
function buscarProductos(lista, query) {
  const q = query.toLowerCase().trim();
  if (!q) return lista;
  return lista.filter(p => p.nombre.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q));
}

function renderCatalogoGrid() {
  let lista = filtrarProductos(catalogoEstado.categoria);
  lista = buscarProductos(lista, catalogoEstado.busqueda);
  const grid = document.getElementById("catalogoGrid");
  const sinResultados = document.getElementById("catalogoSinResultados");
  grid.innerHTML = lista.map(productoCardHTML).join("");
  sinResultados.hidden = lista.length > 0;
  grid.querySelectorAll(".producto-card").forEach(bindProductoCardClick);
}

function renderCatalogo() {
  renderFiltrosCategorias();
  renderCatalogoGrid();
  const buscador = document.getElementById("buscarProducto");
  buscador.value = catalogoEstado.busqueda;
  buscador.oninput = () => { catalogoEstado.busqueda = buscador.value; renderCatalogoGrid(); };
}

/* ================= MODAL PRODUCTO ================= */
let productoSeleccionadoId = null;
function abrirModalProducto(id) {
  const p = PRODUCTOS.find(pr => pr.id === id);
  if (!p) return;
  productoSeleccionadoId = id;
  document.getElementById("modalProductoImg").src = p.imagen;
  document.getElementById("modalProductoImg").alt = p.nombre;
  document.getElementById("modalProductoCategoria").textContent = p.categoria;
  document.getElementById("modalProductoNombre").textContent = p.nombre;
  document.getElementById("modalProductoDescripcion").textContent = p.descripcion;
  const specsList = document.getElementById("modalProductoSpecs");
  specsList.innerHTML = Object.entries(p.especificaciones).map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`).join("");
  abrirModal("modalProducto");
}

/* ================= RENDER: ZONAS ================= */
function renderZonas() {
  const body = document.getElementById("tablaZonasBody");
  body.innerHTML = ZONAS_DESPACHO.map(z => `<tr><td>${z.region}</td><td>${z.dias}</td><td>${z.obs}</td></tr>`).join("");
}

/* ================= FORMULARIO CONTACTO ================= */
function initFormContacto() {
  const form = document.getElementById("formContacto");
  document.getElementById("contactoWhatsapp").href = generarLinkWhatsApp("Hola ZONA, quisiera hacer una consulta.");
  document.getElementById("footerWhatsapp").href = generarLinkWhatsApp("Hola ZONA, quisiera hacer una consulta.");
  const footerWhatsappSocial = document.getElementById("footerWhatsappSocial");
  if (footerWhatsappSocial) footerWhatsappSocial.href = generarLinkWhatsApp("Hola ZONA, quisiera hacer una consulta.");
  const qrCard = document.getElementById("whatsappQrCard");
  if (qrCard) qrCard.href = generarLinkWhatsApp("Hola ZONA, quisiera hacer una consulta.");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = form.nombre, email = form.email, asunto = form.asunto, mensaje = form.mensaje;
    let valido = true;
    [nombre, email, asunto, mensaje].forEach(limpiarErrorCampo);
    if (!nombre.value.trim()) { mostrarErrorCampo(nombre, "El nombre es obligatorio."); valido = false; }
    if (!validarEmail(email.value)) { mostrarErrorCampo(email, "Ingresa un email válido."); valido = false; }
    if (!asunto.value.trim()) { mostrarErrorCampo(asunto, "El asunto es obligatorio."); valido = false; }
    if (!mensaje.value.trim()) { mostrarErrorCampo(mensaje, "El mensaje es obligatorio."); valido = false; }
    if (!valido) return;

    const datos = { nombre: nombre.value, email: email.value, telefono: form.telefono.value, asunto: asunto.value, mensaje: mensaje.value, _honey: form._honey ? form._honey.value : "" };
    await enviarFormulario(datos, `Nuevo mensaje de contacto de ${datos.nombre}`);
    abrirWhatsApp(`Nuevo mensaje de contacto:\nNombre: ${datos.nombre}\nEmail: ${datos.email}\nAsunto: ${datos.asunto}`);
    form.reset();
    alert("Mensaje enviado. Nos contactaremos contigo pronto.");
  });
}

/* ================= FORMULARIO COTIZACIÓN ================= */
function poblarSelectProductos(select) {
  select.innerHTML = `<option value="">Selecciona un producto</option>` + PRODUCTOS.map(p => `<option value="${p.nombre}">${p.nombre} (${p.categoria})</option>`).join("");
}

function prellenarCotizarSiCorresponde() {
  const select = document.getElementById("cotProducto");
  poblarSelectProductos(select);
  if (productoSeleccionadoId) {
    const p = PRODUCTOS.find(pr => pr.id === productoSeleccionadoId);
    if (p) select.value = p.nombre;
  }
  const u = getUsuarioActual();
  if (u && !esAdmin()) {
    document.getElementById("cotEmpresa").value = u.empresa;
    document.getElementById("cotEmail").value = u.email;
  }
}

function initFormCotizacion() {
  const form = document.getElementById("formCotizacion");
  const especTextarea = document.getElementById("cotEspecificaciones");
  const charCount = document.getElementById("cotCharCount");
  especTextarea.addEventListener("input", () => { charCount.textContent = especTextarea.value.length; });

  document.getElementById("btnCotizarEsteProducto").addEventListener("click", () => {
    cerrarModales();
    navigate("/cotizar");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const campos = {
      empresa: document.getElementById("cotEmpresa"),
      email: document.getElementById("cotEmail"),
      telefono: document.getElementById("cotTelefono"),
      producto: document.getElementById("cotProducto"),
      cantidad: document.getElementById("cotCantidad"),
      fecha: document.getElementById("cotFecha"),
      terminos: document.getElementById("cotTerminos")
    };
    Object.values(campos).forEach(limpiarErrorCampo);
    let valido = true;
    if (!campos.empresa.value.trim()) { mostrarErrorCampo(campos.empresa, "Campo obligatorio."); valido = false; }
    if (!validarEmail(campos.email.value)) { mostrarErrorCampo(campos.email, "Ingresa un email válido."); valido = false; }
    if (!validarTelefono(campos.telefono.value)) { mostrarErrorCampo(campos.telefono, "Ingresa un teléfono chileno válido (+56 9 XXXX XXXX)."); valido = false; }
    if (!campos.producto.value) { mostrarErrorCampo(campos.producto, "Selecciona un producto."); valido = false; }
    if (!campos.cantidad.value || Number(campos.cantidad.value) <= 0) { mostrarErrorCampo(campos.cantidad, "La cantidad debe ser mayor a 0."); valido = false; }
    if (!campos.fecha.value) { mostrarErrorCampo(campos.fecha, "Selecciona una fecha."); valido = false; }
    if (!campos.terminos.checked) { mostrarErrorCampo(campos.terminos, "Debes aceptar los términos y condiciones."); valido = false; }
    if (!valido) return;

    const honeyEl = document.getElementById("cotHoney");
    if (honeyEl && honeyEl.value) { console.warn("Envío bloqueado por honeypot (probable bot)."); return; }

    const datos = {
      empresa: campos.empresa.value,
      email: campos.email.value,
      telefono: campos.telefono.value,
      producto: campos.producto.value,
      cantidad: campos.cantidad.value,
      especificaciones: especTextarea.value,
      fecha_requerida: campos.fecha.value
    };
    const nueva = guardarCotizacion(datos);

    await enviarFormulario(nueva, `Nueva cotización de ${nueva.empresa}`);
    abrirWhatsApp(`Nueva cotización de ${nueva.empresa} - Producto: ${nueva.producto} - Cantidad: ${nueva.cantidad}`);

    form.reset();
    charCount.textContent = "0";
    productoSeleccionadoId = null;
    abrirModal("modalConfirmacion");
  });
}

/* ================= AUTH ================= */
function initAuth() {
  document.querySelectorAll(".toggle-password").forEach(btn => {
    btn.addEventListener("click", () => {
      const input = document.getElementById(btn.dataset.target);
      input.type = input.type === "password" ? "text" : "password";
    });
  });

  const formLogin = document.getElementById("formLogin");
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");
    limpiarErrorCampo(email); limpiarErrorCampo(password);
    const msg = document.getElementById("loginMsg");
    msg.textContent = ""; msg.className = "auth-msg";

    let valido = true;
    if (!validarEmail(email.value)) { mostrarErrorCampo(email, "Ingresa un email válido."); valido = false; }
    if (!password.value) { mostrarErrorCampo(password, "Ingresa tu contraseña."); valido = false; }
    if (!valido) return;

    const res = login(email.value, password.value);
    if (res.ok) {
      formLogin.reset();
      navigate(res.rol === "admin" ? "/dashboard/admin" : "/dashboard/cliente");
    } else {
      msg.textContent = "Email o contraseña incorrectos.";
      msg.className = "auth-msg error";
    }
  });

  document.getElementById("linkOlvide").addEventListener("click", (e) => {
    e.preventDefault();
    alert("Por seguridad, la recuperación de contraseña se hace de forma manual. Escríbenos por WhatsApp y te ayudamos a recuperar el acceso.");
  });
}

/* ================= DASHBOARD CLIENTE ================= */
function estadoTagHTML(estado) {
  const clase = "estado-" + estado.replace(/\s/g, "");
  return `<span class="estado-tag ${clase}">${estado}</span>`;
}
function fmtFecha(iso) {
  try { return new Date(iso).toLocaleDateString("es-CL"); } catch (e) { return iso; }
}

function renderDashboardCliente() {
  const u = getUsuarioActual();
  if (!u) return;
  document.getElementById("dashClienteTitulo").textContent = `Panel de ${u.empresa}`;
  document.getElementById("dashClienteSaludo").textContent = `Bienvenido, ${u.empresa}`;

  const todas = obtenerCotizacionesUsuario(u.email).sort((a, b) => new Date(b.fecha_solicitud) - new Date(a.fecha_solicitud));
  const pendientes = todas.filter(c => c.estado === "Pendiente" || c.estado === "Presupuesto Enviado");

  document.getElementById("tablaPendientesCliente").innerHTML = pendientes.map(c => `
    <tr>
      <td>${fmtFecha(c.fecha_solicitud)}</td>
      <td>${esc(c.producto)}</td>
      <td>${esc(c.cantidad)}</td>
      <td>${estadoTagHTML(c.estado)}</td>
      <td><button class="btn btn-outline btn-sm" data-ver="${c.id}">Ver Detalles</button></td>
    </tr>
  `).join("") || `<tr><td colspan="5">No tienes cotizaciones pendientes.</td></tr>`;

  const filtroEstado = document.getElementById("filtroEstadoHistorial");
  const buscador = document.getElementById("buscarHistorialCliente");
  function renderHistorial() {
    let lista = todas.slice(0, 10);
    if (filtroEstado.value) lista = lista.filter(c => c.estado === filtroEstado.value);
    if (buscador.value.trim()) lista = lista.filter(c => c.producto.toLowerCase().includes(buscador.value.toLowerCase()));
    document.getElementById("tablaHistorialCliente").innerHTML = lista.map(c => `
      <tr>
        <td>${fmtFecha(c.fecha_solicitud)}</td>
        <td>${esc(c.producto)}</td>
        <td>${esc(c.cantidad)}</td>
        <td>${estadoTagHTML(c.estado)}</td>
        <td><button class="btn btn-outline btn-sm" data-ver="${c.id}">Ver Detalles</button></td>
      </tr>
    `).join("") || `<tr><td colspan="5">Sin resultados.</td></tr>`;
    document.querySelectorAll("#tablaHistorialCliente [data-ver]").forEach(bindVerDetalleCotizacion);
  }
  filtroEstado.onchange = renderHistorial;
  buscador.oninput = renderHistorial;
  renderHistorial();

  document.querySelectorAll("#tablaPendientesCliente [data-ver]").forEach(bindVerDetalleCotizacion);

  document.getElementById("btnLogoutCliente").onclick = logout;
  document.getElementById("btnNuevaCotizacionCliente").onclick = () => {
    poblarSelectProductos(document.getElementById("dashCotProducto"));
    document.getElementById("formNuevaCotizacionDash").reset();
    abrirModal("modalNuevaCotizacion");
  };
}

function bindVerDetalleCotizacion(btn) {
  btn.addEventListener("click", () => abrirDetalleCotizacion(Number(btn.dataset.ver)));
}

function abrirDetalleCotizacion(id) {
  const c = getCotizaciones().find(c => c.id === id);
  if (!c) return;
  const body = document.getElementById("detalleCotizacionBody");
  body.innerHTML = `
    <dl>
      <dt>Empresa</dt><dd>${esc(c.empresa)}</dd>
      <dt>Email</dt><dd>${esc(c.email)}</dd>
      <dt>Teléfono</dt><dd>${esc(c.telefono)}</dd>
      <dt>Producto</dt><dd>${esc(c.producto)}</dd>
      <dt>Cantidad</dt><dd>${esc(c.cantidad)}</dd>
      <dt>Especificaciones</dt><dd>${esc(c.especificaciones) || "-"}</dd>
      <dt>Fecha Requerida</dt><dd>${esc(c.fecha_requerida)}</dd>
      <dt>Fecha Solicitud</dt><dd>${fmtFecha(c.fecha_solicitud)}</dd>
      <dt>Estado</dt><dd>${estadoTagHTML(c.estado)}</dd>
      ${c.presupuesto !== null && c.presupuesto !== undefined ? `<dt>Presupuesto</dt><dd>$${Number(c.presupuesto).toLocaleString("es-CL")} CLP</dd>` : ""}
      ${c.presupuesto_descripcion ? `<dt>Detalle Presupuesto</dt><dd>${esc(c.presupuesto_descripcion)}</dd>` : ""}
      ${c.pago ? `<dt>Pago</dt><dd>${esc(c.pago)}</dd>` : ""}
      ${c.mensaje_rechazo ? `<dt>Motivo Rechazo</dt><dd>${esc(c.mensaje_rechazo)}</dd>` : ""}
    </dl>
  `;
  abrirModal("modalDetalleCotizacion");
}

function initFormNuevaCotizacionDash() {
  document.getElementById("formNuevaCotizacionDash").addEventListener("submit", async (e) => {
    e.preventDefault();
    const u = getUsuarioActual();
    const producto = document.getElementById("dashCotProducto");
    const cantidad = document.getElementById("dashCotCantidad");
    const fecha = document.getElementById("dashCotFecha");
    const especificaciones = document.getElementById("dashCotEspecificaciones");
    [producto, cantidad, fecha].forEach(limpiarErrorCampo);
    let valido = true;
    if (!producto.value) { mostrarErrorCampo(producto, "Selecciona un producto."); valido = false; }
    if (!cantidad.value || Number(cantidad.value) <= 0) { mostrarErrorCampo(cantidad, "Cantidad inválida."); valido = false; }
    if (!fecha.value) { mostrarErrorCampo(fecha, "Selecciona una fecha."); valido = false; }
    if (!valido) return;

    const nueva = guardarCotizacion({
      empresa: u.empresa,
      email: u.email,
      telefono: (getUsuarios().find(x => x.email === u.email) || {}).telefono || "",
      producto: producto.value,
      cantidad: cantidad.value,
      especificaciones: especificaciones.value,
      fecha_requerida: fecha.value
    });
    await enviarFormulario(nueva, `Nueva cotización de ${nueva.empresa}`);
    abrirWhatsApp(`Nueva cotización de ${nueva.empresa} - Producto: ${nueva.producto} - Cantidad: ${nueva.cantidad}`);
    cerrarModales();
    renderDashboardCliente();
  });
}

/* ================= DASHBOARD ADMIN ================= */
let adminTabActual = "pendientes";
let adminBusquedaGlobal = "";

function initAdminTabs() {
  document.querySelectorAll(".admin-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      adminTabActual = tab.dataset.tab;
      document.querySelectorAll(".admin-tab").forEach(t => t.classList.toggle("active", t === tab));
      document.querySelectorAll(".admin-panel").forEach(p => p.classList.toggle("active", p.id === "adminPanel-" + adminTabActual));
    });
  });
  document.getElementById("adminBusquedaGlobal").oninput = (e) => { adminBusquedaGlobal = e.target.value; renderDashboardAdmin(); };
  document.getElementById("btnExportarJson").onclick = exportarCotizacionesJSON;
  document.getElementById("btnLogoutAdmin").onclick = logout;
}

function filtrarPorBusquedaGlobal(lista) {
  const q = adminBusquedaGlobal.toLowerCase().trim();
  if (!q) return lista;
  return lista.filter(c => c.empresa.toLowerCase().includes(q) || c.producto.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
}

function renderDashboardAdmin() {
  const cotizaciones = filtrarPorBusquedaGlobal(getCotizaciones()).sort((a, b) => new Date(b.fecha_solicitud) - new Date(a.fecha_solicitud));

  const pendientes = cotizaciones.filter(c => c.estado === "Pendiente");
  const enviadas = cotizaciones.filter(c => c.estado === "Presupuesto Enviado");
  const aprobadas = cotizaciones.filter(c => c.estado === "Aprobado");
  const proceso = cotizaciones.filter(c => c.estado === "En Proceso");
  const completadas = cotizaciones.filter(c => c.estado === "Completado");

  document.getElementById("adminContador").textContent = `${pendientes.length} cotizaciones pendientes`;

  document.getElementById("tablaAdminPendientes").innerHTML = pendientes.map(c => `
    <tr>
      <td>${esc(c.empresa)}</td><td>${esc(c.email)}</td><td>${esc(c.telefono)}</td><td>${esc(c.producto)}</td><td>${esc(c.cantidad)}</td>
      <td>${fmtFecha(c.fecha_solicitud)}</td><td>${esc((c.especificaciones || "-").slice(0, 40))}</td>
      <td class="acciones-cell">
        <button class="btn btn-outline btn-sm" data-ver="${c.id}">Ver</button>
        <button class="btn btn-primary btn-sm" data-presupuestar="${c.id}">Enviar Presupuesto</button>
        <button class="btn btn-outline btn-sm" data-rechazar="${c.id}">Rechazar</button>
      </td>
    </tr>
  `).join("") || `<tr><td colspan="8">No hay cotizaciones pendientes.</td></tr>`;

  document.getElementById("tablaAdminEnviadas").innerHTML = enviadas.map(c => `
    <tr>
      <td>${esc(c.empresa)}</td><td>${esc(c.producto)}</td><td>$${Number(c.presupuesto || 0).toLocaleString("es-CL")}</td>
      <td>${fmtFecha(c.fecha_solicitud)}</td>
      <td class="acciones-cell">
        <button class="btn btn-outline btn-sm" data-ver="${c.id}">Ver</button>
        <button class="btn btn-primary btn-sm" data-aprobar="${c.id}">Marcar Aprobada</button>
      </td>
    </tr>
  `).join("") || `<tr><td colspan="5">No hay presupuestos enviados.</td></tr>`;

  document.getElementById("tablaAdminAprobadas").innerHTML = aprobadas.map(c => `
    <tr>
      <td>${esc(c.empresa)}</td><td>${esc(c.producto)}</td><td>$${Number(c.presupuesto || 0).toLocaleString("es-CL")}</td>
      <td>${esc(c.pago) || "Pendiente"}</td><td>${fmtFecha(c.fecha_solicitud)}</td>
      <td class="acciones-cell">
        <button class="btn btn-outline btn-sm" data-ver="${c.id}">Ver</button>
        <button class="btn btn-secondary btn-sm" data-pago50="${c.id}">Marcar Pagado 50%</button>
        <button class="btn btn-primary btn-sm" data-proceso="${c.id}">Iniciar Trabajo</button>
      </td>
    </tr>
  `).join("") || `<tr><td colspan="6">No hay cotizaciones aprobadas.</td></tr>`;

  document.getElementById("tablaAdminProceso").innerHTML = proceso.map(c => `
    <tr>
      <td>${esc(c.empresa)}</td><td>${esc(c.producto)}</td><td>${fmtFecha(c.fecha_solicitud)}</td><td>${esc(c.fecha_requerida) || "-"}</td>
      <td class="acciones-cell">
        <button class="btn btn-outline btn-sm" data-ver="${c.id}">Ver</button>
        <button class="btn btn-primary btn-sm" data-completar="${c.id}">Marcar Completado</button>
      </td>
    </tr>
  `).join("") || `<tr><td colspan="5">No hay trabajos en proceso.</td></tr>`;

  document.getElementById("tablaAdminCompletadas").innerHTML = completadas.map(c => `
    <tr>
      <td>${esc(c.empresa)}</td><td>${esc(c.producto)}</td><td>$${Number(c.presupuesto || 0).toLocaleString("es-CL")}</td>
      <td>${fmtFecha(c.fecha_solicitud)}</td>
      <td class="acciones-cell"><button class="btn btn-outline btn-sm" data-ver="${c.id}">Ver</button></td>
    </tr>
  `).join("") || `<tr><td colspan="5">Aún no hay trabajos completados.</td></tr>`;

  document.getElementById("tablaAdminTodas").innerHTML = cotizaciones.map(c => `
    <tr>
      <td>${esc(c.empresa)}</td><td>${esc(c.producto)}</td><td>${estadoTagHTML(c.estado)}</td><td>${fmtFecha(c.fecha_solicitud)}</td>
      <td class="acciones-cell"><button class="btn btn-outline btn-sm" data-ver="${c.id}">Ver</button></td>
    </tr>
  `).join("") || `<tr><td colspan="5">No hay cotizaciones registradas.</td></tr>`;

  bindAdminAcciones();
}

function bindAdminAcciones() {
  document.querySelectorAll("[data-ver]").forEach(btn => btn.onclick = () => abrirDetalleCotizacion(Number(btn.dataset.ver)));
  document.querySelectorAll("[data-presupuestar]").forEach(btn => btn.onclick = () => {
    document.getElementById("presupuestoCotizacionId").value = btn.dataset.presupuestar;
    document.getElementById("formEnviarPresupuesto").reset();
    document.getElementById("presupuestoNotificar").checked = true;
    abrirModal("modalEnviarPresupuesto");
  });
  document.querySelectorAll("[data-rechazar]").forEach(btn => btn.onclick = () => {
    document.getElementById("rechazarCotizacionId").value = btn.dataset.rechazar;
    document.getElementById("formRechazar").reset();
    abrirModal("modalRechazar");
  });
  document.querySelectorAll("[data-aprobar]").forEach(btn => btn.onclick = () => {
    actualizarCotizacion(Number(btn.dataset.aprobar), { estado: "Aprobado", pago: "Pendiente" });
    renderDashboardAdmin();
  });
  document.querySelectorAll("[data-pago50]").forEach(btn => btn.onclick = () => {
    actualizarCotizacion(Number(btn.dataset.pago50), { pago: "Parcial 50%" });
    renderDashboardAdmin();
  });
  document.querySelectorAll("[data-proceso]").forEach(btn => btn.onclick = () => {
    actualizarCotizacion(Number(btn.dataset.proceso), { estado: "En Proceso" });
    renderDashboardAdmin();
  });
  document.querySelectorAll("[data-completar]").forEach(btn => btn.onclick = () => {
    actualizarCotizacion(Number(btn.dataset.completar), { estado: "Completado", pago: "Pagado" });
    renderDashboardAdmin();
  });
}

function initFormEnviarPresupuesto() {
  document.getElementById("formEnviarPresupuesto").addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = Number(document.getElementById("presupuestoCotizacionId").value);
    const monto = document.getElementById("presupuestoMonto");
    const descripcion = document.getElementById("presupuestoDescripcion");
    [monto, descripcion].forEach(limpiarErrorCampo);
    let valido = true;
    if (!monto.value || Number(monto.value) <= 0) { mostrarErrorCampo(monto, "Ingresa un monto válido."); valido = false; }
    if (!descripcion.value.trim()) { mostrarErrorCampo(descripcion, "Describe el presupuesto."); valido = false; }
    if (!valido) return;

    const notificar = document.getElementById("presupuestoNotificar").checked;
    const actualizada = actualizarCotizacion(id, {
      estado: "Presupuesto Enviado",
      presupuesto: Number(monto.value),
      presupuesto_descripcion: descripcion.value
    });
    if (notificar && actualizada) {
      await enviarFormulario(actualizada, `Presupuesto enviado a ${actualizada.empresa}`);
    }
    abrirWhatsApp(`Presupuesto enviado a ${actualizada.empresa} - Producto: ${actualizada.producto} - Monto: $${Number(actualizada.presupuesto).toLocaleString("es-CL")}`);
    cerrarModales();
    renderDashboardAdmin();
  });
}

function initFormRechazar() {
  document.getElementById("formRechazar").addEventListener("submit", (e) => {
    e.preventDefault();
    const id = Number(document.getElementById("rechazarCotizacionId").value);
    const mensaje = document.getElementById("rechazarMensaje").value;
    actualizarCotizacion(id, { estado: "Rechazado", mensaje_rechazo: mensaje });
    cerrarModales();
    renderDashboardAdmin();
  });
}

function exportarCotizacionesJSON() {
  const data = JSON.stringify(getCotizaciones(), null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `zona-cotizaciones-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* ================= INIT GENERAL ================= */
function initHeaderNav() {
  const hamburger = document.getElementById("hamburgerBtn");
  const nav = document.getElementById("mainNav");
  hamburger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll("[data-link]").forEach(link => {
    link.addEventListener("click", () => closeMobileNav());
  });
  document.querySelectorAll("[data-todo]").forEach(link => {
    link.addEventListener("click", (e) => { e.preventDefault(); alert("Estamos preparando esta sección. Si tienes dudas, contáctanos por WhatsApp."); });
  });
  initNavCatalogoMenu();
}

function initNavCatalogoMenu() {
  const menu = document.getElementById("navCatalogoMenu");
  if (!menu) return;
  menu.innerHTML = CATEGORIAS.map(c => `<a href="#/catalogo" data-link data-cat="${c}">${c}</a>`).join("");
  menu.querySelectorAll("a[data-cat]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      catalogoEstado.categoria = link.dataset.cat;
      catalogoEstado.busqueda = "";
      closeMobileNav();
      navigate("/catalogo");
    });
  });
}

function initModalCloseHandlers() {
  document.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", cerrarModales));
  modalOverlay().addEventListener("click", (e) => { if (e.target === modalOverlay()) cerrarModales(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") cerrarModales(); });
}

/* ================= EFECTOS VISUALES ================= */
function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !targets.length) {
    targets.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
  targets.forEach(el => observer.observe(el));
}

function initHeaderScrollShadow() {
  const header = document.getElementById("siteHeader");
  if (!header) return;
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 12);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function init() {
  seedData();
  document.getElementById("footerYear").textContent = new Date().getFullYear();

  new CarouselRow();
  renderHome();
  initHeaderNav();
  initHeaderScrollShadow();
  initModalCloseHandlers();
  initFormContacto();
  initFormCotizacion();
  initAuth();
  initFormNuevaCotizacionDash();
  initAdminTabs();
  initFormEnviarPresupuesto();
  initFormRechazar();
  initScrollReveal();

  window.addEventListener("hashchange", renderRoute);
  renderRoute();
}

document.addEventListener("DOMContentLoaded", init);

