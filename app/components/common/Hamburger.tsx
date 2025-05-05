
interface HamburgerProps {
  isOpen?: boolean;
  onClick?: () => void;
  color?: string;
}

const Hamburger = ({ isOpen, onClick, color = "black" }: HamburgerProps) => {
  return (
    <button 
      id="hamburger-button"
      className="hamburger-button"
      onClick={onClick}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <div className={`hamburger ${isOpen ? 'open' : ''}`}>
        <span className={`line bg-${color}`}></span>
        <span className={`line bg-${color}`}></span>
        <span className={`line bg-${color}`}></span>
      </div>
    </button>
  );
};

export default Hamburger;