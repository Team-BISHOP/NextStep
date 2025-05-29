import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, UserCircle, LogOut, Sun, Moon, Rocket, MessageSquare as MessageSquareHeart, LifeBuoy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [userData, setUserData] = React.useState({
    name: 'Guest User',
    email: 'guest@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=50&q=50', // Default placeholder
  });

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
       setIsDarkMode(true); 
       localStorage.setItem('theme', 'dark');
       window.document.documentElement.classList.add('dark');
    }

    const savedUser = localStorage.getItem('userProfileData');
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }
  }, []);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getInitials = (name) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
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
            <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-accent p-0">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userData.avatarUrl || undefined} alt={userData.name} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials(userData.name)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-foreground">{userData.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userData.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/feedback" className="flex items-center cursor-pointer">
                <MessageSquareHeart className="mr-2 h-4 w-4" />
                <span>Feedback & Requests</span>
              </Link>
            </DropdownMenuItem>
             <DropdownMenuItem className="flex items-center cursor-pointer" onClick={() => window.open('https://github.com/your-repo/issues', '_blank')}>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Support / Report Issue</span>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/profile" className="flex items-center cursor-pointer">
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
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