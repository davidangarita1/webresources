import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../../test/utils';
import { Navbar } from '../Navbar/Navbar';
import type { NavItem } from '../Navbar/Navbar';

const mockNavItems: NavItem[] = [
  { title: 'Inicio', path: '/', icon: null, cName: 'nav-text' },
  { title: 'Recursos', path: '/resources', icon: null, cName: 'nav-text' },
];

const openSidebar = () =>
  fireEvent.click(screen.getByLabelText('Open menu').querySelector('svg')!);

describe('Navbar', () => {
  it('renders the open menu button', () => {
    render(<Navbar data={mockNavItems} />);
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('nav-menu is not visible by default', () => {
    render(<Navbar data={mockNavItems} />);
    const nav = screen.getByRole('navigation', { hidden: true });
    expect(nav).not.toHaveClass('active');
  });

  it('nav-menu becomes active when hamburger is clicked', () => {
    render(<Navbar data={mockNavItems} />);
    openSidebar();
    expect(screen.getByRole('navigation')).toHaveClass('active');
  });

  it('nav-menu closes when close button is clicked', () => {
    render(<Navbar data={mockNavItems} />);
    openSidebar();
    fireEvent.click(document.querySelector('.nav-menu-items')!);
    expect(screen.getByRole('navigation', { hidden: true })).not.toHaveClass('active');
  });

  it('renders all nav items', () => {
    render(<Navbar data={mockNavItems} />);
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Recursos')).toBeInTheDocument();
  });

  it('renders nav items with correct links', () => {
    render(<Navbar data={mockNavItems} />);
    const links = screen.getAllByRole('link', { hidden: true });
    const paths = links.map((l) => l.getAttribute('href'));
    expect(paths).toContain('/');
    expect(paths).toContain('/resources');
  });

  it('nav is aria-hidden when sidebar is closed', () => {
    render(<Navbar data={mockNavItems} />);
    expect(screen.getByRole('navigation', { hidden: true })).toHaveAttribute('aria-hidden', 'true');
  });

  it('nav is not aria-hidden when sidebar is open', () => {
    render(<Navbar data={mockNavItems} />);
    openSidebar();
    expect(screen.getByRole('navigation')).not.toHaveAttribute('aria-hidden', 'true');
  });

  it('renders empty nav items when data is empty', () => {
    render(<Navbar data={[]} />);
    const listItems = document.querySelectorAll('.nav-menu-items li');
    expect(listItems).toHaveLength(1);
  });
});
