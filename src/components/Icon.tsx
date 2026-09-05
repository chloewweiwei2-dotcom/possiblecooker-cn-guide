export default function Icon({ name, className = '' }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    home: <><path d="m3 11 9-8 9 8M5 10v11h5v-7h4v7h5V10" /></>,
    book: <><path d="M12 5v16M12 5C8 2 4 3 2 4v15c3-1 6-1 10 2 4-3 7-3 10-2V4c-2-1-6-2-10 1Z" /></>,
    utensils: <><path d="M5 2v7m4-7v7M3 2v6a4 4 0 0 0 8 0V2M7 12v10M20 22V2c-5 3-5 10 0 10" /></>,
    chart: <><path d="M3 21h19"/><rect x="4" y="13" width="3" height="5" rx="1"/><rect x="11" y="8" width="3" height="10" rx="1"/><rect x="18" y="2" width="3" height="16" rx="1"/></>,
    help: <><circle cx="12" cy="12" r="9"/><path d="M9 8a3 3 0 0 1 6 0c0 3-3 2-3 5M12 17h.01"/></>,
    search: <><circle cx="10.5" cy="10.5" r="7.5"/><path d="m16 16 6 6"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>,
    settings: <><path d="m9 3 .7-2h4.6l.7 2 2 .9 2.1-.3 2.3 4-1.3 1.7v2.4l1.3 1.7-2.3 4-2.1-.3-2 .9-.7 2H9l-.7-2-2-.9-2.1.3-2.3-4 1.3-1.7V9.3L1.9 7.6l2.3-4 2.1.3L9 3Z" transform="translate(0 1)"/><circle cx="11.7" cy="12" r="3"/></>,
    back: <path d="m14 5-7 7 7 7"/>,
    next: <path d="m9 5 7 7-7 7"/>,
    pot: <><path d="M4 8h16v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V8ZM2 8h20M9 4h6M12 4v4M1 12h3m16 0h3"/></>,
    shield: <><path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z"/><path d="M12 7v6m0 4h.01"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
  };
  return <svg className={`icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.book}</svg>;
}
