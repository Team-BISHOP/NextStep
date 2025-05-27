import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCircle, Edit3, Shield, Bell, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const ProfilePage = () => {
  // Mock user data - replace with actual data
  const user = {
    name: 'Guest User',
    email: 'guest@example.com',
    joinDate: '2025-05-26',
    avatarUrl: 'https://github.com/shadcn.png', // Placeholder
    bio: 'Aspiring Software Engineer exploring new technologies and building cool projects.',
    currentPath: 'Software Engineer Path',
    points: 1250,
  };

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg dark:bg-brand-gray-dark/50">
        <CardHeader className="bg-gradient-to-r from-brand-blue-default to-brand-blue-dark p-6 rounded-t-lg">
            <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20 border-4 border-white dark:border-brand-blue-light">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback className="text-3xl bg-brand-blue-light text-brand-blue-dark">{user.name.substring(0,1).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-3xl font-bold text-white">{user.name}</CardTitle>
                    <CardDescription className="text-blue-100 text-md">{user.email}</CardDescription>
                    <p className="text-xs text-blue-200 mt-1">Joined: {new Date(user.joinDate).toLocaleDateString()}</p>
                </div>
            </div>
        </CardHeader>
        <CardContent className="p-6 grid md:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="text-foreground">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                  <p className="text-foreground">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Bio</label>
                  <p className="text-foreground italic">{user.bio || "No bio set."}</p>
                </div>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Career Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Current Learning Path</label>
                  <p className="text-foreground">{user.currentPath || "No active path."}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Skill Points</label>
                  <p className="text-2xl font-bold text-primary">{user.points}</p>
                </div>
                 <img  class="w-full h-auto rounded-md" alt="Graph showing user's skill progress over time" src="https://images.unsplash.com/photo-1543286386-2e659306cd6c" />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Settings & Actions */}
          <div className="space-y-6">
            <Card>
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
              </CardContent>
            </Card>
            <Card>
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