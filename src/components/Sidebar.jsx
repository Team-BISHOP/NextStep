import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, Compass, Users, Award, Bot, Settings, Zap, Code } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/assessment', label: 'Career Assessment', icon: Compass },
  { href: '/learning-paths', label: 'Learning Paths', icon: Briefcase },
  { href: '/skills', label: 'My Skills', icon: Award },
  { href: '/projects', label: 'My Projects', icon: Code }, // Added new Projects link
  { href: '/community', label: 'Community', icon: Users },
  { type: 'divider', key: 'div1' },
  { href: '/ai-chat', label: 'AI Assistant', icon: Bot },
  { href: '/quick-tools', label: 'Quick Tools', icon: Zap }, // Example new item
];

const bottomNavItems = [
    { href: '/profile', label: 'Profile & Settings', icon: Settings },
];

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const renderNavItem = (item) => {
    if (item.type === 'divider') {
      return <hr key={item.key} className="my-3 border-border/50" />;
    }
    const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
    return (
      <Link
        key={item.href}
        to={item.href}
        className={cn(
          'flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-150 group',
          isActive 
            ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary' 
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 dark:hover:bg-muted/10'
        )}
      >
        <item.icon className={cn(
          'h-5 w-5 mr-3 transition-colors',
           isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
          )} />
        {isOpen && <span className="animate-fade-in">{item.label}</span>}
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 flex flex-col pt-16 bg-card border-r border-border shadow-md transition-all duration-300 ease-in-out',
        isOpen ? 'w-64' : 'w-[4.5rem]' // Adjusted width for icons only
      )}
    >
      <nav className="flex-1 px-2 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map(renderNavItem)}
      </nav>
      {isOpen && <div className="mt-auto px-2 py-4 space-y-1.5 border-t border-border/50">
        {bottomNavItems.map(renderNavItem)}
      </div>}
       {!isOpen && <div className="mt-auto px-2 py-4 space-y-1.5 border-t border-border/50">
        {bottomNavItems.map(item => (
           <Link
            key={item.href}
            to={item.href}
            title={item.label}
            className={cn(
              'flex items-center justify-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-150 group',
              location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
                ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 dark:hover:bg-muted/10'
            )}
          >
            <item.icon className={cn(
              'h-5 w-5 transition-colors',
              location.pathname === item.href ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
              )} />
          </Link>
        ))}
      </div>}
    </aside>
  );
};

export default Sidebar;