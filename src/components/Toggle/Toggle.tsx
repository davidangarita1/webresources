import './toggle.scss';
import Sun from '@assets/sun.png';
import Moon from '@assets/moon.png';
import { useDarkMode } from '@context';

export const Toggle = () => {
  const { isActive, toggle } = useDarkMode();

  return (
    <button
      className={`toggle ${isActive ? 'toggle--dark' : ''}`}
      onClick={toggle}
      aria-label={isActive ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isActive}
    >
      <img src={Sun} alt="Light mode" className="toggle-icon" />
      <img src={Moon} alt="Dark mode" className="toggle-icon" />
      <span className="toggle-thumb" />
    </button>
  );
};
