import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, BookOpen, Brain, Code, Users, UserCircle, MessageSquare as MessageSquareText, MessageSquare as MessageSquareHeart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/assessment', label: 'Career Assessment', icon: Compass },
  { href: '/learning-paths', label: 'Learning Paths', icon: BookOpen },
  { href: '/skills', label: 'My Skills', icon: Brain },
  { href: '/projects', label: 'My Projects', icon: Code },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/ai-chat', label: 'AI Chat', icon: MessageSquareText },
  { href: '/feedback', label: 'Feedback & Requests', icon: MessageSquareHeart },
  { href: '/profile', label: 'User Profile', icon: UserCircle },
];

const SidebarLink = ({ item, isOpen }) => {
  const location = useLocation();
  const isActive = location.pathname === item.href;

  return (
    <li key={item.href}>
      <Button
        asChild
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start h-11 text-sm font-medium transition-colors duration-150",
          !isOpen && "justify-center",
          isActive ? "text-secondary-foreground dark:text-secondary-foreground" : "text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground"
        )}
        title={isOpen ? "" : item.label}
      >
        <Link to={item.href} className="flex items-center w-full">
          <item.icon className={cn("h-5 w-5 flex-shrink-0", isOpen && "mr-3")} />
          {isOpen && <span className="truncate">{item.label}</span>}
        </Link>
      </Button>
    </li>
  );
};


const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col bg-card border-r border-border transition-all duration-300 ease-in-out pt-16",
        isOpen ? "w-64" : "w-[4.5rem]"
      )}
    >
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        <ul>
          {navItems.map((item) => (
            <SidebarLink key={item.label} item={item} isOpen={isOpen} />
          ))}
        </ul>
      </nav>
      {/* Help & Support section removed */}
    </aside>
  );
};

export default Sidebar;