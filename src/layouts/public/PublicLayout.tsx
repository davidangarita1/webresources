import './PublicLayout.scss';
import { Outlet } from 'react-router-dom';
import { Footer, Toggle } from '@components';
import { useDarkMode } from '@context';

const PublicLayout = () => {
  const { isActive } = useDarkMode();

  return (
    <div className={`layout ${isActive ? 'dark-mode' : ''}`}>
      <Toggle />
      <main className="scroll">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
