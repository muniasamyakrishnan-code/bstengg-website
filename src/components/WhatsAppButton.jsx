export default function WhatsAppButton() {
  return (
    <>
      <style>{`
        .wa-fab {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #25D366;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 28px rgba(37,211,102,0.5);
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          animation: wa-pulse 2.5s ease-in-out infinite;
        }
        .wa-fab:hover {
          transform: scale(1.1);
          box-shadow: 0 10px 40px rgba(37,211,102,0.65);
          animation: none;
        }
        .wa-fab svg {
          width: 32px;
          height: 32px;
          fill: #fff;
        }
        .wa-tooltip {
          position: fixed;
          bottom: 40px;
          right: 98px;
          z-index: 9998;
          background: #fff;
          color: #222;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 8px 14px;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.14);
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transform: translateX(6px);
          transition: opacity 0.2s, transform 0.2s;
        }
        .wa-tooltip::after {
          content: '';
          position: absolute;
          right: -7px;
          top: 50%;
          transform: translateY(-50%);
          border: 7px solid transparent;
          border-right: none;
          border-left-color: #fff;
        }
        .wa-fab:hover + .wa-tooltip,
        .wa-wrap:hover .wa-tooltip {
          opacity: 1;
          transform: translateX(0);
        }
        @keyframes wa-pulse {
          0%, 100% { box-shadow: 0 6px 28px rgba(37,211,102,0.5); }
          50% { box-shadow: 0 6px 28px rgba(37,211,102,0.5), 0 0 0 10px rgba(37,211,102,0.12); }
        }
        @media (max-width: 480px) {
          .wa-fab { bottom: 20px; right: 20px; width: 54px; height: 54px; }
          .wa-tooltip { display: none; }
        }
      `}</style>

      <div className="wa-wrap" style={{ position: 'fixed', bottom: 0, right: 0, zIndex: 9999 }}>
        <a
          href="https://wa.me/60192829180"
          target="_blank"
          rel="noopener noreferrer"
          className="wa-fab"
          aria-label="Chat on WhatsApp"
        >
          {/* WhatsApp SVG icon */}
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.492.658 4.832 1.806 6.856L2 30l7.344-1.782A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.55 11.55 0 0 1-5.894-1.612l-.422-.25-4.36 1.058 1.094-4.252-.276-.436A11.556 11.556 0 0 1 4.4 16C4.4 9.59 9.59 4.4 16 4.4S27.6 9.59 27.6 16 22.41 27.6 16 27.6zm6.344-8.668c-.348-.174-2.06-1.016-2.38-1.132-.32-.116-.552-.174-.784.174-.232.348-.9 1.132-1.102 1.364-.202.232-.404.26-.752.086-.348-.174-1.468-.54-2.796-1.724-1.034-.92-1.73-2.056-1.932-2.404-.202-.348-.022-.536.152-.708.156-.156.348-.406.522-.61.174-.202.232-.348.348-.58.116-.232.058-.436-.028-.61-.086-.174-.784-1.888-1.074-2.586-.282-.68-.57-.588-.784-.598l-.668-.012c-.232 0-.61.086-.928.436-.318.348-1.218 1.19-1.218 2.902s1.246 3.366 1.42 3.598c.174.232 2.452 3.742 5.942 5.248.832.358 1.48.572 1.986.732.834.264 1.594.226 2.194.138.668-.1 2.06-.842 2.35-1.656.29-.814.29-1.512.204-1.656-.086-.144-.318-.232-.668-.406z"/>
          </svg>
        </a>
        <div className="wa-tooltip">Chat with us on WhatsApp</div>
      </div>
    </>
  )
}
