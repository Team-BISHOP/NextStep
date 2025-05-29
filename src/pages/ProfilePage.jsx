import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCircle, Edit3, Shield, Bell, LogOut, Linkedin, ExternalLink, Briefcase, Award } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast";


const ProfilePage = () => {
  const { toast } = useToast();
  // Mock user data - replace with actual data or retrieve from localStorage/context
  const [user, setUser] = React.useState(() => {
    const savedUser = localStorage.getItem('userProfileData');
    return savedUser ? JSON.parse(savedUser) : {
        name: 'Guest User',
        email: 'guest@example.com',
        joinDate: '2025-05-28',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=50&q=50',
        bio: 'Aspiring Software Engineer exploring new technologies and building cool projects. Enthusiastic about AI and Web Development!',
        chosenPath: 'Software Engineer Path',
        points: 1250,
        linkedinProfile: '',
      };
  });
  
  const handleShareToLinkedIn = () => {
    const text = `Excited to share my progress on NextStep! I've earned ${user.points} points and I'm on the ${user.chosenPath}. Check out my journey! #NextStep #CareerDevelopment #SoftwareEngineering`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}&summary=${encodeURIComponent(text)}`;
    window.open(linkedInUrl, '_blank');
    toast({
      title: "Sharing to LinkedIn",
      description: "Your LinkedIn share dialog should have opened. Customize your post and share!",
      className: "bg-primary text-primary-foreground"
    });
  };

  return (
    <motion.div 
      className="space-y-6 sm:space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg dark:bg-card">
        <CardHeader className="page-header-gradient p-4 sm:p-6 rounded-t-lg">
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-primary-foreground dark:border-background">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback className="text-3xl bg-primary-foreground text-primary dark:bg-background dark:text-primary">{user.name.substring(0,1).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                    <CardTitle className="page-header-title">{user.name}</CardTitle>
                    <CardDescription className="page-header-description">{user.email}</CardDescription>
                    <p className="text-xs text-primary-foreground/70 dark:text-primary-foreground/70 mt-1">Joined: {new Date(user.joinDate).toLocaleDateString()}</p>
                </div>
                <Button onClick={handleShareToLinkedIn} variant="outline" size="sm" className="ml-auto mt-3 sm:mt-0 bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 border-primary-foreground/50 dark:bg-background/20 dark:text-background dark:hover:bg-background/30 dark:border-background/50">
                  <Linkedin className="mr-2 h-4 w-4" /> Share Profile
                </Button>
            </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card className="dark:bg-card/80">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center"><UserCircle className="mr-2 h-5 w-5"/>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">FULL NAME</label>
                  <p className="text-foreground text-sm sm:text-base">{user.name}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">BIO</label>
                  <p className="text-foreground italic text-sm sm:text-base">{user.bio || "No bio set. Tell us about yourself!"}</p>
                </div>
                 {user.linkedinProfile && (
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">LINKEDIN</label>
                    <a href={user.linkedinProfile} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center text-sm sm:text-base">
                      {user.linkedinProfile} <ExternalLink className="ml-1 h-3 w-3"/>
                    </a>
                  </div>
                 )}
                <Button variant="outline" className="w-full sm:w-auto mt-2">
                  <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </CardContent>
            </Card>

            <Card className="dark:bg-card/80">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center"><Briefcase className="mr-2 h-5 w-5"/>Career Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">CHOSEN LEARNING PATH</label>
                  <p className="text-foreground font-semibold text-sm sm:text-base">{user.chosenPath || "No active path. Complete the assessment!"}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">SKILL POINTS</label>
                  <p className="text-2xl font-bold text-primary">{user.points}</p>
                </div>
                <div className="mt-2">
                  <label className="text-xs font-medium text-muted-foreground">ACHIEVEMENTS</label>
                  <div className="flex space-x-2 mt-1">
                     <Award className="h-6 w-6 text-yellow-500" title="Bronze Badge"/>
                     <Award className="h-6 w-6 text-gray-400" title="Silver Badge (Locked)"/>
                  </div>
                </div>
                 <img  class="w-full h-auto rounded-md mt-4 border border-border" alt="Placeholder graph showing user's skill progress points over time, with an upward trend." src="https://images.unsplash.com/photo-1611900690103-cfbbbbf05933?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2dyZXNzJTIwZ3JhcGh8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60" />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="dark:bg-card/80">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-muted">
                  <Shield className="mr-2 h-4 w-4 text-primary" /> Security & Password
                </Button>
                <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-muted">
                  <Bell className="mr-2 h-4 w-4 text-primary" /> Notification Preferences
                </Button>
                <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-muted">
                  <UserCircle className="mr-2 h-4 w-4 text-primary" /> Public Profile Visibility
                </Button>
                 <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-muted">
                  <Linkedin className="mr-2 h-4 w-4 text-primary" /> Connect LinkedIn (Coming Soon)
                </Button>
              </CardContent>
            </Card>
            <Card className="dark:bg-card/80 border-destructive/50">
              <CardHeader>
                <CardTitle className="text-xl text-destructive">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" className="w-full">
                  <LogOut className="mr-2 h-4 w-4" /> Log Out
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">Logging out will end your current session.</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfilePage;