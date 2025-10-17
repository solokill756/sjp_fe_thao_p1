import MainHeader from '../Header/MainHeader';
import Navigation from '../Header/Navigation';
import TopBar from '../Header/TopBar';

export default function Header() {
  return (
    <header className="w-full">
      {/* Top bar */}
      <TopBar />

      {/* Main header */}
      <MainHeader />

      {/* Navigation */}
      <Navigation />
    </header>
  );
}
