import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type HeroSceneController = { setPaused: (paused: boolean) => void; dispose: () => void };

export function createHeroScene(section: HTMLElement): HeroSceneController {
  gsap.registerPlugin(ScrollTrigger);
  const stage = section.querySelector<HTMLElement>(".story-stage")!;
  const visual = section.querySelector<HTMLElement>(".spatial-viewport")!;
  const assembly = section.querySelector<HTMLElement>(".spatial-assembly")!;
  const pieces = gsap.utils.toArray<HTMLElement>(".spatial-piece", section);
  const messages = gsap.utils.toArray<HTMLElement>("[data-message]", section);
  const loose = gsap.utils.toArray<HTMLElement>(".spatial-loose", section);
  const media = gsap.matchMedia();
  let paused = false;
  let disposed = false;
  let stopRender: (() => void) | undefined;
  let updateRender: (() => void) | undefined;
  let entry: gsap.core.Timeline | undefined;
  const visibility = new IntersectionObserver(([event]) => { section.dataset.visible = String(event.isIntersecting); });
  visibility.observe(stage);

  media.add({ desktop: "(min-width: 1251px)", reduce: "(prefers-reduced-motion: reduce)", short: "(max-height: 899px)", other: "(max-width: 1250px)" }, (context) => {
    const desktop = Boolean(context.conditions?.desktop);
    const reduced = Boolean(context.conditions?.reduce);
    section.dataset.motion = reduced ? "static" : "animated";
    const pose = { progress: 1 };
    let lastPhase = -1;
    const applyProgress = () => {
      const p = pose.progress;
      section.style.setProperty("--assembly", String(gsap.utils.clamp(0, 1, (p - .3) / .45)));
      section.style.setProperty("--connected", String(gsap.utils.clamp(0, 1, (p - .45) / .27)));
      section.style.setProperty("--manual", String(1 - gsap.utils.clamp(0, 1, (p - .45) / .27)));
      const phase = Math.min(3, Math.floor(p * 4));
      if (phase !== lastPhase) {
        lastPhase = phase;
        messages.forEach((message, index) => message.setAttribute("aria-hidden", String(index !== phase)));
        section.querySelectorAll(".status-before").forEach(el => el.setAttribute("aria-hidden", String(phase >= 2)));
        section.querySelectorAll(".status-after").forEach(el => el.setAttribute("aria-hidden", String(phase < 2)));
      }
      updateRender?.();
    };

    if (reduced) {
      gsap.set(assembly, { rotateX: 0, rotateY: 0, rotateZ: 0 });
      applyProgress();
      return () => { delete section.dataset.motion; };
    }

    // The HTML story is independent of WebGL and its deferred loading.
    entry = gsap.timeline({ defaults: { ease: "power2.out" } });
    entry.from(section.querySelector(".story-eyebrow"), { opacity: 0, y: 12, duration: .35 }, 0)
      .from(section.querySelectorAll(".headline-line>span"), { yPercent: 105, duration: .6, stagger: .065 }, .08)
      .from(section.querySelector(".story-description"), { opacity: 0, y: 12, duration: .4 }, .42)
      .from(pieces, { opacity: 0, duration: .7, stagger: .1 }, .65)
      .from(loose, { y: 24, duration: .6, stagger: .08 }, .7);
    // CTA elements are deliberately excluded from all visibility animations.
    if (desktop) {
      const scattered = [
        { x: -14, y: 8, z: 40, rotationX: 3, rotationY: 6, rotationZ: -5 },
        { x: 28, y: 12, z: -24, rotationX: -3, rotationY: -6, rotationZ: 4 },
        { x: -20, y: 36, z: 24, rotationX: 2, rotationY: 4, rotationZ: -3 },
        { x: 32, y: 40, z: -28, rotationX: -2, rotationY: -4, rotationZ: 5 },
      ];
      pieces.forEach((piece, i) => gsap.set(piece, scattered[i]));
      gsap.set(messages, { opacity: 0, y: 10 });
      gsap.set(messages[0], { opacity: 1, y: 0 });
      pose.progress = 0;
      applyProgress();
      const story = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: {
        trigger: stage, pin: !context.conditions?.short, start: "top top", end: () => `+=${window.innerHeight * (context.conditions?.short ? .45 : 2)}`,
        scrub: 1.2, anticipatePin: 1, invalidateOnRefresh: true,
      } });
      story.to(pose, { progress: 1, duration: 1, onUpdate: applyProgress }, 0)
        .to(pieces, { x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0, stagger: .035, duration: .53, ease: "power1.inOut" }, .2)
        .to(loose, { x: 0, y: 0, z: 0, scale: .94, duration: .3 }, .35);
      for (let i = 1; i < messages.length; i++) {
        story.to(messages[i - 1], { opacity: 0, y: -10, duration: .045 }, i * .25 - .045)
          .to(messages[i], { opacity: 1, y: 0, duration: .05 }, i * .25);
      }
    } else {
      // Smaller screens keep native flow and assemble without a pinned presentation.
      pose.progress = 1;
      applyProgress();
      gsap.set(assembly, { rotateX: 0, rotateY: 0, rotateZ: 0 });
      gsap.from(pieces, { y: 20, duration: .55, stagger: .08, ease: "power2.out", scrollTrigger: { trigger: visual, start: "top 85%", once: true } });
    }
    if (paused) entry.pause();

    const tilt = gsap.quickTo(assembly, "rotationY", { duration: .7, ease: "power2.out" });
    const lift = gsap.quickTo(assembly, "rotationX", { duration: .7, ease: "power2.out" });
    const pointer = (event: PointerEvent) => {
      if (paused || event.pointerType === "touch") return;
      const rect = visual.getBoundingClientRect();
      if (desktop) {
        tilt(-8 + gsap.utils.clamp(-1, 1, (event.clientX - rect.left) / rect.width * 2 - 1) * 6);
        lift(2 - gsap.utils.clamp(-1, 1, (event.clientY - rect.top) / rect.height * 2 - 1) * 4);
      }
    };
    const leave = () => {
      if (desktop) { tilt(-8); lift(2); }
      section.dataset.hover = "false";
    };
    const hover = (event: PointerEvent) => { section.dataset.hover = String(event.target instanceof Element && Boolean(event.target.closest(".spatial-card, .spatial-loose"))); };
    visual.addEventListener("pointermove", pointer);
    visual.addEventListener("pointerover", hover);
    visual.addEventListener("pointerleave", leave);
    return () => {
      visual.removeEventListener("pointermove", pointer);
      visual.removeEventListener("pointerover", hover);
      visual.removeEventListener("pointerleave", leave);
      delete section.dataset.motion;
      ["--assembly", "--connected", "--manual"].forEach(key => section.style.removeProperty(key));
    };
  });

  // Structural light uses lines only, never a central decorative model.
  if (!window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 1250px)").matches) {
    import("three").then(THREE => {
      if (disposed) return;
      const host = section.querySelector<HTMLElement>(".spatial-canvas")!;
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2", { alpha: true, antialias: false, powerPreference: "low-power" });
      if (!gl) return;
      const renderer = new THREE.WebGLRenderer({ canvas, context: gl, alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      canvas.setAttribute("aria-hidden", "true");
      host.appendChild(canvas);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, .1, 100);
      camera.position.set(0, 0, 10);
      const group = new THREE.Group();
      const vertices: number[] = [];
      for (let i = -4; i <= 4; i++) vertices.push(i, -3, -1, i, 3, -1, -4, i * .75, -1, 4, i * .75, -1);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
      const material = new THREE.LineBasicMaterial({ color: 0x5a9cd6, transparent: true, opacity: .04 });
      group.add(new THREE.LineSegments(geometry, material));
      group.rotation.set(.18, -.24, 0);
      scene.add(group);
      let frame = 0;
      let visible = true;
      let last = 0;
      let elapsed = 0;
      let lost = false;
      const draw = () => { if (!lost && visible && !document.hidden) renderer.render(scene, camera); };
      const tick = (time: number) => {
        frame = 0;
        if (disposed || paused || !visible || document.hidden || lost) return;
        if (time - last > 32) { elapsed += Math.min(time - last, 40); last = time; group.position.y = Math.sin(elapsed * .00025) * .025; draw(); }
        frame = requestAnimationFrame(tick);
      };
      const wake = () => { if (frame) cancelAnimationFrame(frame); frame = 0; draw(); if (!paused && visible && !document.hidden && !lost) frame = requestAnimationFrame(tick); };
      const resize = () => {
        const { width, height } = host.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setPixelRatio(window.innerWidth <= 1250 ? 1 : Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix(); draw();
      };
      const sizes = new ResizeObserver(resize); sizes.observe(host);
      const visibility = new IntersectionObserver(([event]) => { visible = event.isIntersecting; wake(); }); visibility.observe(stage);
      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const preference = () => { lost = motionQuery.matches; canvas.hidden = lost; wake(); };
      const contextLost = (event: Event) => { event.preventDefault(); lost = true; canvas.hidden = true; wake(); };
      canvas.addEventListener("webglcontextlost", contextLost);
      motionQuery.addEventListener("change", preference);
      document.addEventListener("visibilitychange", wake);
      updateRender = wake;
      stopRender = () => {
        cancelAnimationFrame(frame); sizes.disconnect(); visibility.disconnect();
        document.removeEventListener("visibilitychange", wake); motionQuery.removeEventListener("change", preference);
        canvas.removeEventListener("webglcontextlost", contextLost);
        geometry.dispose(); material.dispose(); renderer.dispose(); canvas.remove();
      };
      resize(); wake();
    }).catch(() => { /* The complete HTML workspace remains available without WebGL. */ });
  }

  return {
    setPaused(value) { paused = value; section.dataset.paused = String(value); if (value) entry?.pause(); else entry?.resume(); updateRender?.(); },
    dispose() { disposed = true; stopRender?.(); visibility.disconnect(); media.revert(); delete section.dataset.paused; delete section.dataset.hover; delete section.dataset.visible; },
  };
}
