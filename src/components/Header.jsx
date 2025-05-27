import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, UserCircle, Settings, LogOut, Sun, Moon, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(true); // Default to dark mode

  React.useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);
  
  React.useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
    } else {
       setIsDarkMode(true); // Default to dark if no theme saved
       localStorage.setItem('theme', 'dark');
       window.document.documentElement.classList.add('dark');
    }
  }, []);


  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 bg-card text-card-foreground shadow-lg border-b border-border">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2 text-foreground hover:bg-accent">
          <Menu className="h-6 w-6" />
        </Button>
        <Link to="/" className="flex items-center text-xl font-bold hover:opacity-80 transition-opacity text-primary">
          <Rocket className="h-6 w-6 mr-2 text-primary"/>
          NextStep
        </Link>
      </div>
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" onClick={handleThemeToggle} className="text-foreground hover:bg-accent">
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-accent">
              <UserCircle className="h-7 w-7 text-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-foreground">Guest User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  guest@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="flex items-center cursor-pointer">
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center cursor-pointer text-destructive hover:!text-destructive-foreground hover:!bg-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;