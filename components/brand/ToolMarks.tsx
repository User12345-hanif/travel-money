/**
 * Small line marks for the homepage tool cards.
 * Same green tile as the rest of the UI — not a separate illustration style.
 */

function Mark({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function ToolMark({ title }: { title: string }) {
  if (title === "Currency Converter") {
    return (
      <Mark>
        <path d="M8 7h8M14 5l2 2-2 2" />
        <path d="M16 17H8M10 15l-2 2 2 2" />
        <circle cx="6.5" cy="7" r="1.15" fill="currentColor" stroke="none" />
        <circle cx="17.5" cy="17" r="1.15" fill="currentColor" stroke="none" />
      </Mark>
    );
  }

  if (title === "Travel Money") {
    return (
      <Mark>
        <path d="M4 9.5h16v8.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18V9.5Z" />
        <path d="M4 12.5h16" />
        <path d="M8 9.5V8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5" />
      </Mark>
    );
  }

  if (title === "Plan Your Travel Money") {
    return (
      <Mark>
        <path d="M7 4.5h7l3.5 3.5V19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1Z" />
        <path d="M13.5 4.5V8H17" />
        <path d="M8.5 12.5h5M8.5 15.5h3.5" />
        <rect x="14.5" y="13.5" width="3.5" height="3.5" rx="0.4" />
      </Mark>
    );
  }

  return (
    <Mark>
      <path d="M6 4.5h12v15H6z" />
      <path d="M8.5 8.5h7" />
      <path d="M9 12.5h6v2.2H9z" />
      <path d="M10.5 16.5h3" />
    </Mark>
  );
}
