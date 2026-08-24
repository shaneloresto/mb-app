import Link from 'next/link';

const Header = () => (
  <header className="w-full border-b border-base-300/40 bg-base-100/80 backdrop-blur-md sticky top-0 z-50 shadow-xs">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3 font-bold text-lg tracking-tight hover:opacity-90 transition-opacity">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-primary-content shadow-sm shadow-primary/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <span className="text-xl font-semibold bg-gradient-to-r from-base-content to-base-content/70 bg-clip-text text-transparent">
          Message Board
        </span>
      </Link>
    </div>
  </header>
);

export default Header;