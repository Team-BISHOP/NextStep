import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, BarChart3, CheckCircle, PlusCircle, Upload, Star, Shield, Gem, Medal, Zap, Lightbulb, FolderKanban, Linkedin, ExternalLink } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";


const userSkills = [
  { name: 'JavaScript', level: 80, category: 'Programming Language', points: 200 },
  { name: 'React', level: 75, category: 'Frontend Framework', points: 180 },
  { name: 'Node.js', level: 60, category: 'Backend Runtime', points: 150 },
  { name: 'SQL', level: 50, category: 'Database', points: 120 },
  { name: 'Python', level: 65, category: 'Programming Language', points: 160 },
];

const suggestedProjects = [
  { id: 'proj1', title: 'Interactive Quiz App', description: 'Build a quiz application with multiple choice questions and scoring.', difficulty: 'Medium', skills: ['JavaScript', 'React', 'State Management'] },
  { id: 'proj2', title: 'Weather Dashboard', description: 'Create a dashboard that fetches and displays weather data from an API.', difficulty: 'Easy', skills: ['JavaScript', 'API Integration', 'HTML/CSS'] },
  { id: 'proj3', title: 'Personal Blog Platform', description: 'Develop a simple blogging platform with CRUD functionality for posts.', difficulty: 'Hard', skills: ['Node.js', 'Express', 'Database (SQL/NoSQL)', 'Authentication'] },
];

const totalPoints = userSkills.reduce((sum, skill) => sum + skill.points, 0) + 500; // 500 mock project points

const badges = [
  { name: 'Bronze Coder', icon: Medal, color: 'text-yellow-700 dark:text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-800/30', criteria: '1000+ Points', unlocked: totalPoints >= 1000, achievement: "Achieved Bronze Coder status with over 1000 points on NextStep!" },
  { name: 'Silver Developer', icon: Shield, color: 'text-gray-600 dark:text-gray-400', bgColor: 'bg-gray-200 dark:bg-gray-700/30', criteria: '2500+ Points', unlocked: totalPoints >= 2500, achievement: "Proud Silver Developer on NextStep with 2500+ points!" },
  { name: 'Gold Engineer', icon: Star, color: 'text-amber-500 dark:text-amber-400', bgColor: 'bg-amber-100 dark:bg-amber-700/30', criteria: '5000+ Points', unlocked: totalPoints >= 5000, achievement: "Honored to be a Gold Engineer on NextStep, surpassing 5000 points!" },
  { name: 'Platinum Architect', icon: Gem, color: 'text-sky-600 dark:text-sky-400', bgColor: 'bg-sky-100 dark:bg-sky-700/30', criteria: '10000+ Points', unlocked: totalPoints >= 10000, achievement: "Reached Platinum Architect level on NextStep with over 10,000 points! #TopTier" },
];

const SkillBar = ({ name, level, category }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-foreground">{name} <span className="text-xs text-muted-foreground">({category})</span></span>
      <span className="text-sm font-medium text-primary">{level}%</span>
    </div>
    <div className="w-full bg-muted rounded-full h-2.5 dark:bg-muted/50">
      <motion.div 
        className="bg-gradient-to-r from-primary/70 to-primary h-2.5 rounded-full" 
        style={{ width: `${level}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  </div>
);

const BadgeCard = ({ name, icon: Icon, color, bgColor, criteria, unlocked, achievement }) => {
  const { toast } = useToast();
  const handleShareBadge = () => {
    const text = `I've unlocked the ${name} badge on NextStep! ${achievement} #NextStepBadge #CareerGoals`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}&summary=${encodeURIComponent(text)}`;
    window.open(linkedInUrl, '_blank');
     toast({
      title: `Sharing ${name} Badge!`,
      description: "Your LinkedIn share dialog should have opened. Flaunt that badge!",
      className: "bg-primary text-primary-foreground"
    });
  };

  return (
  <motion.div 
    className={`p-3 rounded-lg flex flex-col items-center text-center shadow-sm transition-all ${unlocked ? bgColor + ' hover:shadow-md' : 'bg-muted/30 dark:bg-muted/10 opacity-60'}`}
    whileHover={unlocked ? { scale: 1.03 } : {}}
  >
    <Icon className={`h-10 w-10 mb-2 ${unlocked ? color : 'text-muted-foreground'}`} />
    <h4 className={`font-semibold text-sm ${unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>{name}</h4>
    <p className={`text-xs ${unlocked ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>{criteria}</p>
    {unlocked ? (
      <Button variant="link" size="sm" className="mt-1 text-xs text-primary p-0 h-auto" onClick={handleShareBadge}>
        <Linkedin className="h-3 w-3 mr-1" /> Share
      </Button>
    ) : (
      <p className="text-xs text-destructive mt-1">Locked</p>
    )}
  </motion.div>
  );
};

const SkillsPage = () => {
  return (
    <motion.div 
      className="space-y-6 sm:space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg dark:bg-card">
        <CardHeader className="page-header-gradient p-4 sm:p-6 rounded-t-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <Award className="h-8 w-8 sm:h-10 sm:w-10 text-primary-foreground" />
                <div>
                    <CardTitle className="page-header-title">My Skills & Badges</CardTitle>
                    <CardDescription className="page-header-description">Track your expertise, earn points, and unlock badges.</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <section className="md:col-span-2">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 pb-2 border-b border-border text-foreground">My Skills</h2>
              {userSkills.length > 0 ? (
                userSkills.map(skill => <SkillBar key={skill.name} {...skill} />)
              ) : (
                <p className="text-muted-foreground">No skills added yet. Start learning to populate your skills!</p>
              )}
              <Button variant="outline" className="mt-4 w-full hover:bg-primary/10 dark:hover:bg-primary/20">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Detailed Skill Report (Coming Soon)
              </Button>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 pb-2 border-b border-border text-foreground">Achievements</h2>
              <div className="p-4 bg-muted/40 dark:bg-muted/20 rounded-lg mb-4 text-center shadow-inner">
                <p className="text-sm text-muted-foreground">Total Skill Points</p>
                <p className="text-3xl font-bold text-primary">{totalPoints}</p>
              </div>
              <h3 className="text-lg font-medium mb-3 text-foreground">Badges Unlocked</h3>
              <div className="grid grid-cols-2 gap-3">
                {badges.map(badge => <BadgeCard key={badge.name} {...badge} />)}
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">Complete learning modules and projects to earn more points and unlock new badges!</p>
            </section>
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-card shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <FolderKanban className="h-7 w-7 text-primary" />
            <div>
              <CardTitle className="text-xl sm:text-2xl text-primary">Hands-on Projects Practice</CardTitle>
              <CardDescription>Apply your skills by building these suggested projects.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {suggestedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {suggestedProjects.map(project => (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -5, boxShadow: "0px 8px 15px rgba(0,0,0,0.08)" }}
                  className="h-full"
                >
                <Card className="flex flex-col h-full dark:bg-muted/20 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">{project.title}</CardTitle>
                    <CardDescription className="text-xs">Difficulty: {project.difficulty}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.skills.map(skill => (
                        <span key={skill} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{skill}</span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="default" size="sm" className="w-full">
                      <Zap className="mr-2 h-4 w-4" /> Start Project
                    </Button>
                  </CardFooter>
                </Card>
                </motion.div>
              ))}
            </div>
          ) : (
             <p className="text-muted-foreground text-center py-5">More hands-on project suggestions coming soon!</p>
          )}
        </CardContent>
      </Card>
      <p className="text-xs text-center text-muted-foreground">
        Remember: The best way to learn is by doing. Tackle these projects to solidify your knowledge.
      </p>
    </motion.div>
  );
};

export default SkillsPage;