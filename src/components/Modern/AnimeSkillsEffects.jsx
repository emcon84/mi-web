import { useEffect, useRef } from "react";
import anime from "animejs";

export const AnimeSkillsRadar = ({ skills, theme }) => {
  const radarRef = useRef(null);

  useEffect(() => {
    const container = radarRef.current;
    if (!container || !skills) return;

    // Limpiar contenido previo
    container.innerHTML = "";

    // Crear SVG para el radar
    const svgSize = 300;
    const center = svgSize / 2;
    const maxRadius = 120;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", svgSize);
    svg.setAttribute("height", svgSize);
    svg.setAttribute("viewBox", `0 0 ${svgSize} ${svgSize}`);

    // Crear círculos concéntricos del radar
    for (let i = 1; i <= 4; i++) {
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle.setAttribute("cx", center);
      circle.setAttribute("cy", center);
      circle.setAttribute("r", (maxRadius / 4) * i);
      circle.setAttribute("fill", "none");
      circle.setAttribute(
        "stroke",
        theme === "dark" ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.3)"
      );
      circle.setAttribute("stroke-width", "1");
      svg.appendChild(circle);
    }

    // Crear líneas radiales
    for (let i = 0; i < 8; i++) {
      const angle = i * 45 * (Math.PI / 180);
      const x1 = center;
      const y1 = center;
      const x2 = center + Math.cos(angle) * maxRadius;
      const y2 = center + Math.sin(angle) * maxRadius;

      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      line.setAttribute(
        "stroke",
        theme === "dark" ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.3)"
      );
      line.setAttribute("stroke-width", "1");
      svg.appendChild(line);
    }

    // Agregar puntos de habilidades
    const skillPoints = [];
    skills.slice(0, 8).forEach((skill, index) => {
      const angle = index * 45 * (Math.PI / 180);
      const radius = (skill.level || 80) * (maxRadius / 100);
      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;

      // Crear punto
      const point = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      point.setAttribute("cx", x);
      point.setAttribute("cy", y);
      point.setAttribute("r", "4");
      point.setAttribute("fill", theme === "dark" ? "#3B82F6" : "#1D4ED8");
      point.setAttribute("class", `skill-point-${index}`);
      svg.appendChild(point);

      skillPoints.push(point);

      // Crear etiqueta
      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      const textX = center + Math.cos(angle) * (radius + 20);
      const textY = center + Math.sin(angle) * (radius + 20);
      text.setAttribute("x", textX);
      text.setAttribute("y", textY);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("dominant-baseline", "middle");
      text.setAttribute("fill", theme === "dark" ? "#ffffff" : "#1f2937");
      text.setAttribute("font-size", "12");
      text.setAttribute("font-weight", "500");
      text.setAttribute("class", `skill-label-${index}`);
      text.textContent = skill.name || skill.text || `Skill ${index + 1}`;
      svg.appendChild(text);
    });

    container.appendChild(svg);

    // Animar la aparición del radar
    anime({
      targets: svg.querySelectorAll("circle, line"),
      strokeDasharray: [0, 1000],
      strokeDashoffset: [1000, 0],
      duration: 2000,
      easing: "easeInOutQuart",
      delay: (el, i) => i * 100,
    });

    // Animar los puntos de habilidades
    anime({
      targets: skillPoints,
      scale: [0, 1],
      opacity: [0, 1],
      duration: 800,
      delay: (el, i) => 1000 + i * 150,
      easing: "easeOutElastic(1, .8)",
    });

    // Animar las etiquetas
    anime({
      targets: svg.querySelectorAll('[class*="skill-label"]'),
      opacity: [0, 1],
      scale: [0.5, 1],
      duration: 600,
      delay: (el, i) => 1500 + i * 100,
      easing: "easeOutQuart",
    });

    // Animación continua de pulso en los puntos
    anime({
      targets: skillPoints,
      scale: [1, 1.2, 1],
      duration: 2000,
      easing: "easeInOutSine",
      loop: true,
      delay: (el, i) => i * 200,
    });

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [skills, theme]);

  return (
    <div ref={radarRef} className="flex items-center justify-center p-4" />
  );
};

export const AnimeFloatingIcons = ({ icons, theme }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !icons) return;

    // Limpiar contenido previo
    container.innerHTML = "";

    // Crear iconos flotantes
    icons.forEach((iconData, index) => {
      const iconElement = document.createElement("div");
      iconElement.className = `floating-icon floating-icon-${index}`;

      // Crear un contenedor para el icono React
      const iconContainer = document.createElement("div");
      iconContainer.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: ${theme === "dark" ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)"};
        border-radius: 50%;
        border: 2px solid ${theme === "dark" ? "#3B82F6" : "#1D4ED8"};
      `;

      // Usar el nombre del skill o un fallback
      const skillName = iconData?.name || iconData || `S${index + 1}`;
      iconContainer.textContent =
        skillName.length > 4 ? skillName.substring(0, 3) : skillName;
      iconContainer.style.fontSize = "12px";
      iconContainer.style.fontWeight = "bold";
      iconContainer.style.color = theme === "dark" ? "#3B82F6" : "#1D4ED8";

      iconElement.appendChild(iconContainer);
      iconElement.style.cssText = `
        position: absolute;
        opacity: 0;
        left: ${Math.random() * 80 + 10}%;
        top: ${Math.random() * 80 + 10}%;
        pointer-events: none;
      `;
      container.appendChild(iconElement);
    });

    // Animar iconos flotantes
    anime({
      targets: ".floating-icon",
      opacity: [0, 0.7, 0],
      translateY: [0, -50],
      rotate: [0, 360],
      scale: [0.5, 1, 0.5],
      duration: () => anime.random(4000, 8000),
      delay: (el, i) => i * 500,
      easing: "easeInOutSine",
      loop: true,
    });

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [icons, theme]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none" />
  );
};
