import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

test("MS Express metadata and Spanish document replace starter content", () => {
  const layout = fs.readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.ok(layout.includes("MS Express RD"));
  assert.ok(layout.includes('lang="es"'));
  assert.ok(!layout.includes("codex-preview"));
  assert.ok(layout.includes("index: false"));
});

test("hero keeps a clipped safe area under the navbar and later sections keep connection marks", () => {
  const scene = fs.readFileSync(new URL("../lib/hero-scene.ts", import.meta.url), "utf8");
  const hero = fs.readFileSync(new URL("../components/hero-3d.tsx", import.meta.url), "utf8");
  const css = fs.readFileSync(new URL("../app/globals.css", import.meta.url), "utf8") + fs.readFileSync(new URL("../app/hero-3d.css", import.meta.url), "utf8");
  const landing = fs.readFileSync(new URL("../components/landing.tsx", import.meta.url), "utf8");
  assert.ok(scene.includes('start: "top top"'));
  assert.ok(hero.includes("story-safe"));
  assert.ok(css.includes("margin-top:var(--nav-h)"));
  assert.ok(!css.includes("feTurbulence"));
  assert.ok(css.includes("signal-merge"));
  assert.ok(css.includes("node-absorb"));
  assert.ok(css.includes("animation-delay:2s"));
  assert.ok(css.includes("border-radius:50%"));
  assert.ok(landing.includes("logo_msexpress.png"));
  assert.ok(css.includes(".spatial-card :is(.interface-switch"));
  assert.ok(!scene.includes("card.z("));
  assert.ok(!css.includes("bridge-fall"));
  assert.ok(landing.includes("device-link"));
  assert.ok(landing.includes("difference-bridge"));
});

test("landing has a single H1 and all navigation destinations", () => {
  const source = ["../components/landing.tsx", "../components/hero-3d.tsx"].map(path => fs.readFileSync(new URL(path, import.meta.url), "utf8")).join("\n");
  assert.equal((source.match(/<h1(?:\s|>)/g) || []).length, 1);
  for (const id of ["inicio", "soluciones", "proceso", "proyectos", "nosotros", "preguntas", "contacto"]) {
    assert.ok(source.includes('id="' + id + '"'));
  }
});
