import { useState, useEffect, useRef } from 'react'
import './App.css'

const sections = [
  { id: 'resumen', label: 'Resumen ejecutivo', icon: '01' },
  { id: 'marco', label: 'Marco normativo', icon: '02' },
  { id: 'delitos', label: 'Tipificación', icon: '03' },
  { id: 'comparacion', label: 'Comparación', icon: '04' },
  { id: 'responsabilidades', label: 'Responsabilidades', icon: '05' },
  { id: 'datos', label: 'Protección de datos', icon: '06' },
  { id: 'conclusiones', label: 'Conclusiones', icon: '07' },
]

const impactStats = [
  { value: '12.000', label: 'Equipos comprometidos' },
  { value: '7 sep', label: 'Fecha del ataque · 2020' },
  { value: 'Ley 21.459', label: 'Norma penal principal' },
  { value: '5 delitos', label: 'Tipificados en la ley' },
]

const normas = [
  {
    codigo: 'Ley 21.459',
    titulo: 'Delitos informáticos',
    alcance: 'Nacional · Penal',
    desc: 'Sanciona acceso ilícito, sabotaje informático y ataques que afecten disponibilidad de sistemas.',
    color: 'accent-blue',
  },
  {
    codigo: 'Ley 19.628',
    titulo: 'Protección de datos',
    alcance: 'Nacional · Civil',
    desc: 'Regula el tratamiento de datos personales y obliga a las instituciones a resguardar información de usuarios.',
    color: 'accent-teal',
  },
  {
    codigo: 'CMF',
    titulo: 'Normativa bancaria',
    alcance: 'Sectorial · Regulatoria',
    desc: 'Exige controles de ciberseguridad, continuidad operacional, monitoreo y respuesta ante incidentes.',
    color: 'accent-gold',
  },
  {
    codigo: 'Budapest',
    titulo: 'Convenio internacional',
    alcance: 'Internacional · Cooperación',
    desc: 'Principal tratado sobre ciberdelincuencia. Facilita cooperación para investigación y persecución penal.',
    color: 'accent-red',
  },
  {
    codigo: 'GDPR',
    titulo: 'Referencia europea',
    alcance: 'Internacional · Referencia',
    desc: 'Estándar internacional de protección de datos. Referencia comparativa para buenas prácticas globales.',
    color: 'accent-purple',
  },
]

const delitos = [
  {
    art: 'Art. 2',
    nombre: 'Acceso ilícito',
    conducta: 'Acceder indebidamente a un sistema informático sin autorización.',
    hecho: 'Ingreso inicial mediante phishing con archivo malicioso que penetró la red corporativa.',
  },
  {
    art: 'Art. 4',
    nombre: 'Ataque a integridad del sistema',
    conducta: 'Obstaculizar, alterar, dañar o interrumpir el funcionamiento de un sistema informático.',
    hecho: 'El ransomware cifró sistemas internos causando interrupción operativa y caída de servicios.',
  },
  {
    art: 'Art. 5',
    nombre: 'Ataque a integridad de datos',
    conducta: 'Alterar, dañar, suprimir o inutilizar datos informáticos.',
    hecho: 'El cifrado malicioso inutilizó archivos y datos operativos internos.',
  },
  {
    art: 'Art. 7',
    nombre: 'Falsificación informática',
    conducta: 'Introducir, alterar o suprimir datos para producir información falsa.',
    hecho: 'Posible alteración de logs o registros de autenticación para ocultar rastros (no confirmado).',
  },
  {
    art: 'Art. 8',
    nombre: 'Abuso de dispositivos',
    conducta: 'Producción, distribución o uso de programas diseñados para cometer delitos informáticos.',
    hecho: 'Uso y despliegue del software ransomware diseñado para cifrar sistemas.',
  },
]

const responsabilidades = [
  {
    actor: 'Atacantes / grupo cibercriminal',
    penal: 'Delitos informáticos: acceso ilícito, ataque a integridad del sistema y datos.',
    civil: 'Indemnización por daños patrimoniales causados.',
    admin: 'No aplica directamente.',
    nivel: 'alto',
  },
  {
    actor: 'BancoEstado como institución',
    penal: 'Eventual responsabilidad si existiera negligencia grave dolosa (no acreditado).',
    civil: 'Responsabilidad por fallas de servicio o daño a clientes afectados.',
    admin: 'Fiscalización y posibles sanciones regulatorias por incumplimiento de controles.',
    nivel: 'medio',
  },
  {
    actor: 'Directivos / responsables de ciberseguridad',
    penal: 'Eventual responsabilidad por omisión dolosa o incumplimiento deliberado.',
    civil: 'Responsabilidad contractual o profesional.',
    admin: 'Observaciones, sanciones internas, sumarios administrativos.',
    nivel: 'medio',
  },
  {
    actor: 'Funcionarios afectados por phishing',
    penal: 'Solo si mediara dolo o colaboración consciente (normalmente no existe).',
    civil: 'Eventual responsabilidad laboral interna.',
    admin: 'Procedimientos disciplinarios institucionales.',
    nivel: 'bajo',
  },
]

const recomendaciones = [
  {
    num: '01',
    titulo: 'Capacitación anti-phishing',
    desc: 'Programas permanentes de concientización, simulaciones periódicas y protocolos para reportar correos sospechosos.',
  },
  {
    num: '02',
    titulo: 'Autenticación multifactor (MFA)',
    desc: 'Tokens de seguridad, aplicaciones autenticadoras y validación biométrica para acceso a sistemas críticos.',
  },
  {
    num: '03',
    titulo: 'Segmentación de red',
    desc: 'Aislamiento de sistemas críticos, microsegmentación y redes separadas para funciones administrativas y financieras.',
  },
  {
    num: '04',
    titulo: 'Gestión de vulnerabilidades',
    desc: 'Actualización y parchado oportuno, escaneos periódicos, auditorías técnicas y pruebas de penetración.',
  },
  {
    num: '05',
    titulo: 'Planes de respuesta a incidentes',
    desc: 'Equipos especializados, procedimientos de aislamiento inmediato, respaldos offline y simulacros de recuperación.',
  },
  {
    num: '06',
    titulo: 'Cumplimiento normativo',
    desc: 'Alineación con Ley 21.459, Ley 19.628, normativa CMF y estándares PCI DSS e ISO.',
  },
]

export default function App() {
  const [activeSection, setActiveSection] = useState('resumen')
  const [menuOpen, setMenuOpen] = useState(false)
  const sectionRefs = useRef({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.25, rootMargin: '-80px 0px -40% 0px' }
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-tag">Análisis jurídico</span>
          <h2 className="brand-title">Caso BancoEstado</h2>
          <p className="brand-sub">Ciberataque ransomware · 2020</p>
        </div>
        <nav className="sidebar-nav">
          {sections.map(({ id, label, icon }) => (
            <button
              key={id}
              className={`nav-item ${activeSection === id ? 'active' : ''}`}
              onClick={() => scrollTo(id)}
            >
              <span className="nav-num">{icon}</span>
              <span className="nav-label">{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span>Ley 21.459 · Ley 19.628 · CMF</span>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="mobile-header">
        <div className="mobile-brand">
          <span className="brand-tag">Análisis jurídico</span>
          <span className="mobile-title">Caso BancoEstado</span>
        </div>
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
          <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
        </button>
        {menuOpen && (
          <nav className="mobile-nav">
            {sections.map(({ id, label, icon }) => (
              <button key={id} className={`nav-item ${activeSection === id ? 'active' : ''}`} onClick={() => scrollTo(id)}>
                <span className="nav-num">{icon}</span>
                <span className="nav-label">{label}</span>
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="main">

        {/* Hero */}
        <div className="hero-section">
          <div className="hero-eyebrow">Ciberseguridad · Chile · 2020</div>
          <h1 className="hero-title">
            Ataque ransomware<br />
            <em>a BancoEstado</em>
          </h1>
          <p className="hero-desc">
            Análisis jurídico integral del incidente de ciberseguridad más relevante
            en la historia financiera chilena — tipificación penal, marco normativo,
            responsabilidades y recomendaciones.
          </p>
          <div className="stats-row">
            {impactStats.map((s) => (
              <div className="stat-card" key={s.label}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 01 Resumen */}
        <section id="resumen" className="content-section">
          <div className="section-header">
            <span className="section-num">01</span>
            <h2 className="section-title">Resumen ejecutivo</h2>
          </div>

          <div className="prose-block">
            <p>
              El <strong>7 de septiembre de 2020</strong>, BancoEstado detectó un masivo ciberataque
              mediante ransomware que comprometió su infraestructura tecnológica interna,
              afectando aproximadamente <strong>12.000 equipos</strong> y obligando a suspender
              parte importante de sus operaciones presenciales a nivel nacional.
            </p>
          </div>

          <div className="card-grid two-col">
            <div className="info-card">
              <h3 className="card-title">¿Cómo ocurrió?</h3>
              <p className="card-body">
                La hipótesis principal indica que el ataque comenzó mediante un
                <strong> correo de phishing</strong> con un archivo malicioso adjunto. Al abrirlo,
                el malware se propagó por la red corporativa cifrando sistemas internos.
              </p>
            </div>
            <div className="info-card">
              <h3 className="card-title">¿Quiénes participaron?</h3>
              <p className="card-body">
                Cibercriminales internacionales utilizaron variantes de ransomware asociadas a
                grupos organizados. La respuesta involucró equipos internos, especialistas en
                ciberseguridad, la CMF y la policía especializada en delitos informáticos.
              </p>
            </div>
          </div>

          <div className="highlight-box">
            <span className="highlight-icon">↗</span>
            <div>
              <strong>Dato clave:</strong> Aunque el ataque paralizó operaciones, no se reportó
              robo masivo de fondos de clientes, ya que los sistemas financieros críticos
              estaban aislados de la red comprometida.
            </div>
          </div>

          <div className="impact-list">
            {[
              '~12.000 equipos comprometidos',
              'Cierre temporal de sucursales a nivel nacional',
              'Interrupción de servicios administrativos internos',
              'Alto impacto reputacional para la institución',
              'Costos asociados a recuperación y fortalecimiento de infraestructura',
            ].map((item) => (
              <div className="impact-item" key={item}>
                <span className="impact-dot" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 02 Marco normativo */}
        <section id="marco" className="content-section">
          <div className="section-header">
            <span className="section-num">02</span>
            <h2 className="section-title">Marco normativo</h2>
          </div>
          <p className="section-intro">
            El caso activa múltiples capas regulatorias: normas penales nacionales,
            regulación sectorial financiera y marcos internacionales de referencia.
          </p>
          <div className="normas-grid">
            {normas.map((n) => (
              <div className={`norma-card ${n.color}`} key={n.codigo}>
                <div className="norma-header">
                  <span className="norma-codigo">{n.codigo}</span>
                  <span className="norma-alcance">{n.alcance}</span>
                </div>
                <h3 className="norma-titulo">{n.titulo}</h3>
                <p className="norma-desc">{n.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 03 Delitos */}
        <section id="delitos" className="content-section">
          <div className="section-header">
            <span className="section-num">03</span>
            <h2 className="section-title">Tipificación de delitos</h2>
          </div>
          <p className="section-intro">
            Las acciones de los atacantes se mapean a cinco delitos tipificados en la
            Ley N.º 21.459.
          </p>
          <div className="delitos-list">
            {delitos.map((d) => (
              <div className="delito-row" key={d.art}>
                <div className="delito-art">{d.art}</div>
                <div className="delito-content">
                  <h3 className="delito-nombre">{d.nombre}</h3>
                  <p className="delito-conducta"><em>Conducta sancionada:</em> {d.conducta}</p>
                  <p className="delito-hecho"><em>Hecho del caso:</em> {d.hecho}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 04 Comparación */}
        <section id="comparacion" className="content-section">
          <div className="section-header">
            <span className="section-num">04</span>
            <h2 className="section-title">Comparación regulatoria</h2>
          </div>
          <p className="section-intro">
            Análisis comparativo de los principales marcos por tres ejes: protección
            de datos, gestión de incidentes y sanciones.
          </p>

          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Marco</th>
                  <th>Industria</th>
                  <th>Protección de datos</th>
                  <th>Gestión de incidentes</th>
                  <th>Sanciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Ley 21.459</strong></td>
                  <td>Transversal</td>
                  <td>Integridad, disponibilidad y confidencialidad de sistemas</td>
                  <td>Permite investigar y perseguir ataques</td>
                  <td>Multas y penas privativas de libertad</td>
                </tr>
                <tr>
                  <td><strong>CMF</strong></td>
                  <td>Financiera / Bancaria</td>
                  <td>Resguardo de información financiera</td>
                  <td>Reportar incidentes, continuidad operacional</td>
                  <td>Sanciones administrativas</td>
                </tr>
                <tr>
                  <td><strong>GDPR</strong></td>
                  <td>Tecnología / Digital</td>
                  <td>Altos estándares de tratamiento de datos personales</td>
                  <td>Notificación obligatoria en plazos establecidos</td>
                  <td>Hasta 4% de facturación global anual</td>
                </tr>
                <tr>
                  <td><strong>HIPAA</strong></td>
                  <td>Salud</td>
                  <td>Protección estricta de datos clínicos</td>
                  <td>Protocolos obligatorios ante brechas</td>
                  <td>Sanciones económicas y auditorías federales</td>
                </tr>
                <tr>
                  <td><strong>PCI DSS</strong></td>
                  <td>Medios de pago</td>
                  <td>Protección de datos de tarjetas</td>
                  <td>Monitoreo continuo y respuesta técnica</td>
                  <td>Multas contractuales, pérdida de certificación</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 05 Responsabilidades */}
        <section id="responsabilidades" className="content-section">
          <div className="section-header">
            <span className="section-num">05</span>
            <h2 className="section-title">Responsabilidades</h2>
          </div>
          <p className="section-intro">
            El incidente activa distintos tipos de responsabilidad según el actor
            involucrado y la norma aplicable.
          </p>
          <div className="resp-cards">
            {responsabilidades.map((r) => (
              <div className={`resp-card nivel-${r.nivel}`} key={r.actor}>
                <div className="resp-actor-header">
                  <h3 className="resp-actor">{r.actor}</h3>
                  <span className={`resp-badge nivel-${r.nivel}`}>
                    {r.nivel === 'alto' ? 'Responsabilidad alta' : r.nivel === 'medio' ? 'Responsabilidad media' : 'Responsabilidad baja'}
                  </span>
                </div>
                <div className="resp-grid">
                  <div className="resp-item">
                    <span className="resp-type">Penal</span>
                    <p>{r.penal}</p>
                  </div>
                  <div className="resp-item">
                    <span className="resp-type">Civil</span>
                    <p>{r.civil}</p>
                  </div>
                  <div className="resp-item">
                    <span className="resp-type">Administrativa</span>
                    <p>{r.admin}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 06 Datos */}
        <section id="datos" className="content-section">
          <div className="section-header">
            <span className="section-num">06</span>
            <h2 className="section-title">Protección de datos</h2>
          </div>
          <p className="section-intro">
            La Ley N.º 19.628 regula el tratamiento de datos personales y resulta
            directamente relevante dado que los sistemas comprometidos contenían
            información de clientes.
          </p>

          <div className="card-grid two-col">
            <div className="info-card">
              <h3 className="card-title">Datos personales</h3>
              <p className="card-body">Nombre completo, RUT, dirección, teléfono, correo, número de cuenta, historial de transacciones e información financiera. Sujetos a protección general.</p>
            </div>
            <div className="info-card">
              <h3 className="card-title">Datos sensibles</h3>
              <p className="card-body">Estado de salud, ideología, convicciones religiosas, vida sexual, origen racial. Requieren protección reforzada y mayores restricciones legales.</p>
            </div>
          </div>

          <h3 className="subsection-title">Derechos ARCO reconocidos por la ley</h3>
          <div className="arco-grid">
            {[
              { letra: 'A', nombre: 'Acceso', desc: 'Conocer qué datos posee la institución, para qué son utilizados y su origen.' },
              { letra: 'R', nombre: 'Rectificación', desc: 'Corregir datos erróneos, incompletos o desactualizados.' },
              { letra: 'C', nombre: 'Cancelación', desc: 'Solicitar eliminación de datos cuando su tratamiento carezca de fundamento legal.' },
              { letra: 'O', nombre: 'Oposición', desc: 'Oponerse al tratamiento de datos en determinadas circunstancias, como fines comerciales no autorizados.' },
            ].map((d) => (
              <div className="arco-card" key={d.letra}>
                <span className="arco-letra">{d.letra}</span>
                <h4 className="arco-nombre">{d.nombre}</h4>
                <p className="arco-desc">{d.desc}</p>
              </div>
            ))}
          </div>

          <div className="highlight-box">
            <span className="highlight-icon">⚖</span>
            <div>
              <strong>Obligaciones del banco:</strong> Como responsable del tratamiento, BancoEstado debe
              proteger la seguridad de los datos, implementar medidas técnicas y organizativas,
              evitar accesos no autorizados y garantizar confidencialidad.
            </div>
          </div>
        </section>

        {/* 07 Conclusiones */}
        <section id="conclusiones" className="content-section">
          <div className="section-header">
            <span className="section-num">07</span>
            <h2 className="section-title">Conclusiones y recomendaciones</h2>
          </div>

          <div className="conclusion-quote">
            <blockquote>
              "La mejor defensa no es reaccionar después del ataque, sino construir
              capacidades preventivas robustas antes de que ocurra."
            </blockquote>
          </div>

          <p className="section-intro">
            El ataque a BancoEstado demostró que la ciberseguridad no es únicamente
            un problema tecnológico, sino también jurídico, organizacional y estratégico.
          </p>

          <div className="rec-grid">
            {recomendaciones.map((r) => (
              <div className="rec-card" key={r.num}>
                <span className="rec-num">{r.num}</span>
                <h3 className="rec-titulo">{r.titulo}</h3>
                <p className="rec-desc">{r.desc}</p>
              </div>
            ))}
          </div>

          <div className="final-block">
            <h3>Enseñanzas del caso</h3>
            <div className="ensenanzas-grid">
              {[
                { icono: '⚡', texto: 'Una sola vulnerabilidad puede comprometer operaciones críticas' },
                { icono: '👤', texto: 'El error humano sigue siendo la principal puerta de entrada' },
                { icono: '📋', texto: 'La regulación debe complementarse con prevención efectiva' },
                { icono: '🛡', texto: 'La continuidad operacional depende de preparación previa' },
              ].map((e) => (
                <div className="ensenanza" key={e.texto}>
                  <span className="ensenanza-icono">{e.icono}</span>
                  <span>{e.texto}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="page-footer">
          <p>Análisis jurídico · Caso BancoEstado · Ciberataque ransomware 2020</p>
          <p>Ley N.º 21.459 · Ley N.º 19.628 · Normativa CMF · Convenio de Budapest</p>
        </footer>
      </main>
    </div>
  )
}