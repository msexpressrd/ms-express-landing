'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Boxes,
  Check,
  CheckCheck,
  FileText,
  LayoutDashboard,
  ListChecks,
  Pause,
  Play,
  Plus,
  Search,
  Settings2,
  UserRound,
  Workflow,
  Zap,
} from 'lucide-react';
import type { HeroSceneController } from '@/lib/hero-scene';

const messages = [
  'Una necesidad puede sentirse compleja.',
  'Entendemos cómo funciona tu operación.',
  'Conectamos procesos, información y personas.',
  'Construimos el software que hace avanzar tu empresa.',
];

function Status({ pending, complete }: { pending: string; complete: string }) {
  return (
    <span className="spatial-status">
      <span className="status-before" aria-hidden="true">
        {pending}
      </span>
      <span className="status-after">
        <Check size={12} aria-hidden="true" />
        {complete}
      </span>
    </span>
  );
}

function Workspace() {
  return (
    <figure
      className="spatial-viewport"
      aria-label="Interfaz conceptual: una operación fragmentada se organiza en Cliente, Operación, Automatización y Resultado. Sin datos de clientes."
    >
      <div className="spatial-canvas" aria-hidden="true" />
      <div className="spatial-perspective">
        <div className="spatial-assembly">
          <div className="workspace-shell" aria-hidden="true">
            <header className="workspace-toolbar">
              <p className="workspace-brand">
                <LayoutDashboard size={16} />
                MS / Workspace
              </p>
              <p className="workspace-search">
                <Search size={13} />
                Mi operación
              </p>
              <p className="workspace-live">Conectado</p>
            </header>
            <aside className="workspace-sidebar">
              <LayoutDashboard />
              <UserRound />
              <Workflow />
              <Zap />
              <span />
              <Settings2 />
            </aside>
            <p className="workspace-overview">
              <span>Tu operación, en un solo lugar.</span>
              <span>Vista conceptual</span>
            </p>
          </div>
          <svg
            className="workspace-connections"
            viewBox="0 0 600 480"
            fill="none"
            aria-hidden="true"
          >
            <path
              className="connection-base"
              d="M190 198H442V278H190V384H442"
            />
            <path
              className="connection-draw"
              pathLength="1"
              d="M190 198H442V278H190V384H442"
            />
            <path
              className="connection-pulse"
              pathLength="1"
              d="M190 198H442V278H190V384H442"
            />
          </svg>
          <div className="workspace-grid">
            <div className="spatial-piece" data-piece="0">
              <article className="spatial-card" data-module="0">
                <header>
                  <span className="module-icon">
                    <UserRound />
                  </span>
                  <h2>Cliente</h2>
                  <span className="module-index">01</span>
                </header>
                <p className="interface-label">NUEVA SOLICITUD</p>
                <p className="interface-title">Organizar mi operación</p>
                <dl className="interface-fields">
                  <dt>Necesidad</dt>
                  <dd>Software a la medida</dd>
                </dl>
                <footer>
                  <Status pending="Por revisar" complete="Solicitud recibida" />
                  <ArrowUpRight size={15} aria-hidden="true" />
                </footer>
              </article>
            </div>
            <div className="spatial-piece" data-piece="1">
              <article className="spatial-card" data-module="1">
                <header>
                  <span className="module-icon">
                    <ListChecks />
                  </span>
                  <h2>Operación</h2>
                  <span className="module-index">02</span>
                </header>
                <p className="interface-label">FLUJO DE APROBACIÓN</p>
                <p className="approval-flow">
                  <button type="button">Revisar</button>
                  <ArrowRight aria-hidden="true" />
                  <button type="button">Aprobar</button>
                </p>
                <p className="interface-task">
                  <button type="button" className="task-check" aria-label="Validar documento">
                    <Check size={8} aria-hidden="true" />
                  </button>
                  Validar documento
                </p>
                <footer>
                  <Status
                    pending="Tarea pendiente"
                    complete="Proceso organizado"
                  />
                  <FileText size={15} aria-hidden="true" />
                </footer>
              </article>
            </div>
            <div className="spatial-piece" data-piece="2">
              <article className="spatial-card" data-module="2">
                <header>
                  <span className="module-icon">
                    <Zap />
                  </span>
                  <h2>Automatización</h2>
                  <span className="module-index">03</span>
                </header>
                <p className="interface-label">REGLA DEL PROCESO</p>
                <p className="automation-rule">
                  <span>Al aprobar</span>
                  <ArrowDown aria-hidden="true" />
                  <span>
                    Notificar al equipo <Bell size={12} aria-hidden="true" />
                  </span>
                </p>
                <footer>
                  <Status
                    pending="Acción manual"
                    complete="Flujo automatizado"
                  />
                  <button type="button" className="interface-switch" aria-label="Activar automatización" />
                </footer>
              </article>
            </div>
            <div className="spatial-piece" data-piece="3">
              <article className="spatial-card" data-module="3">
                <header>
                  <span className="module-icon">
                    <CheckCheck />
                  </span>
                  <h2>Resultado</h2>
                  <span className="module-index">04</span>
                </header>
                <p className="interface-label">ESPACIO DE GESTIÓN</p>
                <p className="result-row">
                  <Boxes size={15} aria-hidden="true" />
                  <span>Inventario</span>
                  <span>En orden</span>
                </p>
                <p className="result-row">
                  <FileText size={15} aria-hidden="true" />
                  <span>Documentos</span>
                  <span>Conectados</span>
                </p>
                <footer>
                  <Status
                    pending="Información dispersa"
                    complete="Equipo notificado"
                  />
                  <CheckCheck size={15} aria-hidden="true" />
                </footer>
              </article>
            </div>
          </div>
          <div className="spatial-loose loose-document">
            <FileText />
            <div>
              <span>Documento de venta</span>
              <small>Pendiente de aprobación</small>
            </div>
          </div>
          <div className="spatial-loose loose-notification">
            <Bell />
            <div>
              <span>Notificación</span>
              <small>Esperando seguimiento</small>
            </div>
          </div>
          <div className="spatial-loose loose-connection">
            <Plus />
            <span>Conectar una acción</span>
            <Zap />
          </div>
          <ol className="workspace-flow" aria-label="Cliente, Operación, Automatización, Resultado">
            <li>Cliente</li>
            <li aria-hidden="true"><ArrowRight /></li>
            <li>Operación</li>
            <li aria-hidden="true"><ArrowRight /></li>
            <li>Automatización</li>
            <li aria-hidden="true"><ArrowRight /></li>
            <li>Resultado</li>
          </ol>
        </div>
      </div>
      <figcaption className="spatial-narrative">
        <p className="narrative-label">
          <i aria-hidden="true" />
          LA OPERACIÓN COBRA FORMA
        </p>
        <div className="story-messages">
          {messages.map((message, index) => (
            <p
              key={message}
              data-message={index}
              aria-hidden={index !== messages.length - 1}
            >
              {message}
            </p>
          ))}
        </div>
      </figcaption>
    </figure>
  );
}

export default function Hero3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const controller = useRef<HeroSceneController | null>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const section = sectionRef.current;
    if (!section) return;
    import('@/lib/hero-scene')
      .then(({ createHeroScene }) => {
        if (cancelled) return;
        controller.current = createHeroScene(section);
        controller.current.setPaused(pausedRef.current);
        setReady(true);
      })
      .catch(() => {
        section.dataset.motion = 'static';
      });
    return () => {
      cancelled = true;
      controller.current?.dispose();
      controller.current = null;
    };
  }, []);

  function toggleMotion() {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
    controller.current?.setPaused(pausedRef.current);
  }

  return (
    <section
      id="inicio"
      className="story-hero"
      ref={sectionRef}
      aria-labelledby="hero-title"
    >
      <div className="story-stage">
        <div className="story-atmosphere" aria-hidden="true" />
        <div className="story-safe">
        <div className="story-layout">
          <div className="story-intro-copy">
            <p className="eyebrow story-eyebrow">
              MS EXPRESS / SOFTWARE A LA MEDIDA
            </p>
            <h1 id="hero-title">
              <span className="headline-line">
                <span>Convertimos</span>
              </span>{' '}
              <span className="headline-line">
                <span>operaciones</span>
              </span>{' '}
              <span className="headline-line">
                <span>complejas en</span>
              </span>{' '}
              <span className="headline-line">
                <span>
                  <em>software</em> que
                </span>
              </span>{' '}
              <span className="headline-line">
                <span>mueve tu empresa.</span>
              </span>
            </h1>
            <p className="story-description">
              Diseñamos herramientas digitales, automatizaciones y plataformas a
              la medida para que tu equipo trabaje con más control y menos
              fricción.
            </p>
            <div className="story-actions">
              <a href="#contacto" className="btn btn-primary">
                Cuéntanos tu proyecto <ArrowUpRight aria-hidden="true" />
              </a>
              <a href="#soluciones" className="text-link">
                Explorar soluciones <ArrowRight aria-hidden="true" />
              </a>
            </div>
            <p className="story-trust">
              Enfoque a medida <span>·</span> Acompañamiento cercano
            </p>
          </div>
          <Workspace />
        </div>
        <div className="story-bottom">
          <a
            href="#soluciones"
            className="story-scroll"
            aria-label="Saltar presentación y explorar soluciones"
          >
            <ArrowDown size={15} aria-hidden="true" />
            SCROLL PARA EXPLORAR
          </a>
          <div className="story-progress" aria-hidden="true">
            <span>NECESIDAD</span>
            <i>
              <b />
            </i>
            <span>SOLUCIÓN</span>
          </div>
          <button
            className="story-pause"
            type="button"
            onClick={toggleMotion}
            disabled={!ready}
            aria-pressed={paused}
            aria-label={paused ? 'Reanudar movimiento' : 'Pausar movimiento'}
          >
            {paused ? (
              <Play size={14} aria-hidden="true" />
            ) : (
              <Pause size={14} aria-hidden="true" />
            )}
            <span>{paused ? 'Reanudar' : 'Pausar'}</span>
          </button>
        </div>
        </div>
      </div>
    </section>
  );
}
