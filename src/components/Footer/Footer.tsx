import './Footer.scss';
import { useDarkMode } from '@context';

const DEFAULT_URL = 'https://www.dangwebs.com';

export const Footer = () => {
  const { isActive } = useDarkMode();

  return (
    <footer className={`footerPage ${isActive ? 'dark-mode' : ''}`}>
      <span>
        &copy; {new Date().getFullYear()} Copyright{' '}
        <a href={DEFAULT_URL} target="_blank" rel="noopener noreferrer">
          DangWebs.com
        </a>
      </span>
    </footer>
  );
};
