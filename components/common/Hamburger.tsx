
interface HamburgerProps {
  isOpen?: boolean;
  onClick?: () => void;
}

const Hamburger = ({ isOpen, onClick }: HamburgerProps) => {
  return (
    <button 
      className="hamburger-button"
      onClick={onClick}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <div className={`hamburger ${isOpen ? 'open' : ''}`}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>
    </button>
  );
};

export default Hamburger;