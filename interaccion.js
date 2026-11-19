/* =========================================================
   Bit a Bit · interacciones de la página
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  /* ---------- 1. Barra de progreso, nav y botón "arriba" ---------- */
  const progreso = document.getElementById("progreso");
  const nav = document.getElementById("nav");
  const arriba = document.getElementById("arriba");

  function alHacerScroll() {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progreso.style.width = (window.scrollY / total) * 100 + "%";
    nav.classList.toggle("scrolled", window.scrollY > 20);
    arriba.classList.toggle("visible", window.scrollY > 800);
  }
  window.addEventListener("scroll", alHacerScroll, { passive: true });
  alHacerScroll();
  arriba.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- 2. Menú en celular ---------- */
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("abierto");
    navLinks.classList.toggle("abierto");
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      menuBtn.classList.remove("abierto");
      navLinks.classList.remove("abierto");
    })
  );

  /* ---------- 3. Resaltar la sección actual en el menú ---------- */
  const enlaces = navLinks.querySelectorAll("a");
  const observadorSecciones = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          enlaces.forEach((a) => a.classList.toggle("activo", a.getAttribute("href") === "#" + e.target.id));
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  document.querySelectorAll("section[id]").forEach((s) => observadorSecciones.observe(s));

  /* ---------- 4. Efecto máquina de escribir ---------- */
  const palabras = ["el ábaco", "la ENIAC", "el transistor", "el microchip", "el PC", "el smartphone", "los qubits"];
  const maquina = document.getElementById("maquina");
  let iPalabra = 0, iLetra = 0, borrando = false;

  function escribir() {
    const palabra = palabras[iPalabra];
    maquina.textContent = palabra.slice(0, iLetra);
    if (!borrando && iLetra < palabra.length) { iLetra++; setTimeout(escribir, 90); }
    else if (!borrando) { borrando = true; setTimeout(escribir, 1500); }
    else if (iLetra > 0) { iLetra--; setTimeout(escribir, 45); }
    else { borrando = false; iPalabra = (iPalabra + 1) % palabras.length; setTimeout(escribir, 300); }
  }
  escribir();

  /* ---------- 5. Aparición al hacer scroll ---------- */
  const observadorRevelar = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observadorRevelar.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".revelar, .hito").forEach((el) => {
    el.classList.add("revelar");
    observadorRevelar.observe(el);
  });

  /* ---------- 6. Generaciones (pestañas) ---------- */
  const generaciones = [
    {
      anios: "1940 – 1956",
      titulo: "Tubos de vacío",
      img: "https://upload.wikimedia.org/wikipedia/commons/1/16/Classic_shot_of_the_ENIAC.jpg",
      texto: "Enormes máquinas que llenaban salas enteras. Se calentaban muchísimo, consumían mucha energía y los tubos se quemaban seguido.",
      datos: [["Tecnología", "Tubos de vacío"], ["Ejemplos", "ENIAC, UNIVAC I"], ["Programación", "Lenguaje máquina y cables"]],
    },
    {
      anios: "1956 – 1963",
      titulo: "Transistores",
      img: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Transbauformen.jpg",
      texto: "El transistor reemplazó al tubo de vacío: computadores más pequeños, rápidos, baratos y confiables. Aparecen los primeros lenguajes como FORTRAN y COBOL.",
      datos: [["Tecnología", "Transistores"], ["Ejemplos", "IBM 1401, IBM 7090"], ["Programación", "FORTRAN, COBOL"]],
    },
    {
      anios: "1964 – 1971",
      titulo: "Circuitos integrados",
      img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/IBM_System_360_model_30_profile.agr.jpg/960px-IBM_System_360_model_30_profile.agr.jpg",
      texto: "Muchos transistores en un solo chip de silicio. Llegan los teclados, los monitores y los sistemas operativos que permiten usar varios programas.",
      datos: [["Tecnología", "Circuitos integrados"], ["Ejemplos", "IBM System/360"], ["Novedad", "Sistemas operativos"]],
    },
    {
      anios: "1971 – 1990",
      titulo: "Microprocesadores",
      img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/Intel_C4004.jpg/960px-Intel_C4004.jpg",
      texto: "Toda la CPU en un chip. Nace el computador personal: el computador llega a las casas, las oficinas y los colegios.",
      datos: [["Tecnología", "Microprocesador"], ["Ejemplos", "Apple II, IBM PC, Macintosh"], ["Novedad", "Interfaz gráfica y ratón"]],
    },
    {
      anios: "1990 – hoy",
      titulo: "Inteligencia artificial",
      img: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/IBM_Quantum_Computer_Demo_at_ITUWTSA_2024%2C_Delhi_2.jpg/960px-IBM_Quantum_Computer_Demo_at_ITUWTSA_2024%2C_Delhi_2.jpg",
      texto: "Internet, celulares, la nube, la inteligencia artificial y los primeros computadores cuánticos. Las máquinas ya entienden voz, imágenes y lenguaje.",
      datos: [["Tecnología", "Chips multinúcleo, qubits"], ["Ejemplos", "Smartphones, IA, computación cuántica"], ["Novedad", "Conexión global"]],
    },
  ];

  const genPanel = document.getElementById("genPanel");
  const genTabs = document.querySelectorAll(".gen-tab");

  function mostrarGeneracion(i) {
    const g = generaciones[i];
    genPanel.classList.add("cambiando");
    setTimeout(() => {
      document.getElementById("genAnios").textContent = g.anios;
      document.getElementById("genTitulo").textContent = g.titulo;
      document.getElementById("genTexto").textContent = g.texto;
      const img = document.getElementById("genImg");
      img.src = g.img;
      img.alt = g.titulo;
      document.getElementById("genDatos").innerHTML = g.datos
        .map(([k, v]) => `<li><b>${k}</b><span>${v}</span></li>`)
        .join("");
      genPanel.classList.remove("cambiando");
    }, 250);
    genTabs.forEach((t, j) => t.classList.toggle("activo", j === i));
  }
  genTabs.forEach((t) => t.addEventListener("click", () => mostrarGeneracion(Number(t.dataset.gen))));
  mostrarGeneracion(0);

  /* ---------- 7. Filtro de la línea de tiempo ---------- */
  const filtros = document.querySelectorAll(".filtro");
  const hitos = document.querySelectorAll(".hito");
  filtros.forEach((f) =>
    f.addEventListener("click", () => {
      filtros.forEach((x) => x.classList.remove("activo"));
      f.classList.add("activo");
      const era = f.dataset.era;
      hitos.forEach((h) => {
        const mostrar = era === "todas" || h.dataset.era === era;
        h.classList.toggle("oculto", !mostrar);
        if (mostrar) h.classList.add("visible");
      });
    })
  );

  /* ---------- 8. Tarjetas de pioneros que giran ---------- */
  document.querySelectorAll(".tarjeta").forEach((t) =>
    t.addEventListener("click", () => t.classList.toggle("girada"))
  );

  /* ---------- 9. Contadores animados ---------- */
  const formato = new Intl.NumberFormat("es-CO");
  const observadorCifras = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const objetivo = Number(el.dataset.objetivo);
        const inicio = performance.now();
        const duracion = 1800;
        function paso(ahora) {
          const t = Math.min((ahora - inicio) / duracion, 1);
          const suave = 1 - Math.pow(1 - t, 3);
          el.textContent = formato.format(Math.round(objetivo * suave));
          if (t < 1) requestAnimationFrame(paso);
        }
        requestAnimationFrame(paso);
        observadorCifras.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll(".cifra-num").forEach((c) => observadorCifras.observe(c));

  /* ---------- 10. Visor de imágenes (lightbox) ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxTexto = document.getElementById("lightboxTexto");

  document.querySelectorAll(".zoomable").forEach((fig) =>
    fig.addEventListener("click", () => {
      const img = fig.querySelector("img");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxTexto.textContent = img.alt;
      lightbox.classList.add("abierto");
    })
  );
  function cerrarLightbox() { lightbox.classList.remove("abierto"); }
  lightbox.addEventListener("click", (e) => { if (e.target !== lightboxImg) cerrarLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") cerrarLightbox(); });

  /* ---------- 11. Si una imagen online no carga ---------- */
  document.querySelectorAll("img").forEach((img) =>
    img.addEventListener("error", () => img.classList.add("sin-imagen"))
  );

  /* ---------- 12. Quiz ---------- */
  const preguntas = [
    { p: "¿Cuál es considerada la primera calculadora de la humanidad?", o: ["La Pascalina", "El ábaco", "La ENIAC", "El telar de Jacquard"], c: 1, e: "El ábaco se usa desde hace unos 4.500 años." },
    { p: "¿Quién es considerada la primera programadora de la historia?", o: ["Grace Hopper", "Marie Curie", "Ada Lovelace", "Hedy Lamarr"], c: 2, e: "Ada Lovelace escribió el primer algoritmo para la máquina de Babbage." },
    { p: "¿Cuántas toneladas pesaba la ENIAC?", o: ["2", "10", "27", "100"], c: 2, e: "¡27 toneladas! Y ocupaba 167 m²." },
    { p: "¿Qué invento reemplazó a los tubos de vacío?", o: ["El transistor", "El ratón", "El disco duro", "La pantalla"], c: 0, e: "El transistor, inventado en 1947 en los Laboratorios Bell." },
    { p: "¿Cuál fue el primer microprocesador?", o: ["Pentium", "Intel 4004", "Apple M1", "Z80"], c: 1, e: "El Intel 4004 de 1971, con 2.300 transistores." },
  ];

  let actual = 0, puntaje = 0;
  const quizBox = document.getElementById("quizBox");
  const qPregunta = document.getElementById("quizPregunta");
  const qOpciones = document.getElementById("quizOpciones");
  const qFeedback = document.getElementById("quizFeedback");
  const qSiguiente = document.getElementById("quizSiguiente");
  const qContador = document.getElementById("quizContador");
  const qBarra = document.getElementById("quizBarra");

  function pintarPregunta() {
    const q = preguntas[actual];
    qContador.textContent = `Pregunta ${actual + 1} de ${preguntas.length}`;
    qBarra.style.width = (actual / preguntas.length) * 100 + "%";
    qPregunta.textContent = q.p;
    qFeedback.textContent = "";
    qSiguiente.disabled = true;
    qSiguiente.textContent = actual === preguntas.length - 1 ? "Ver resultado" : "Siguiente";
    qOpciones.innerHTML = "";
    q.o.forEach((texto, i) => {
      const b = document.createElement("button");
      b.className = "opcion";
      b.innerHTML = `<span class="letra">${"ABCD"[i]}</span>${texto}`;
      b.addEventListener("click", () => responder(i, b));
      qOpciones.appendChild(b);
    });
  }

  function responder(i, boton) {
    const q = preguntas[actual];
    const botones = qOpciones.querySelectorAll(".opcion");
    botones.forEach((b) => (b.disabled = true));
    botones[q.c].classList.add("correcta");
    if (i === q.c) { puntaje++; qFeedback.textContent = "¡Correcto! " + q.e; }
    else { boton.classList.add("incorrecta"); qFeedback.textContent = "Casi. " + q.e; }
    qSiguiente.disabled = false;
  }

  function mostrarResultado() {
    const mensajes = ["¡A repasar la línea de tiempo!", "Vas bien, pero puedes más.", "Vas bien, pero puedes más.", "¡Muy bien!", "¡Excelente!", "¡Perfecto, eres un experto en computadores!"];
    quizBox.innerHTML = `
      <div class="quiz-final">
        <p class="etiqueta">Resultado</p>
        <div class="nota">${puntaje}<em>/${preguntas.length}</em></div>
        <p>${mensajes[puntaje]}</p>
        <button class="btn btn-primario" id="quizReiniciar">Intentar de nuevo</button>
      </div>`;
    document.getElementById("quizReiniciar").addEventListener("click", () => location.reload());
  }

  qSiguiente.addEventListener("click", () => {
    actual++;
    if (actual < preguntas.length) pintarPregunta();
    else mostrarResultado();
  });
  pintarPregunta();
});
