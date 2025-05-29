import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Briefcase, Compass, Users, BarChart3, Activity, LineChart, TrendingUp, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon, description, linkTo, linkText }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="h-full"
  >
    <Card className="hover:shadow-xl transition-shadow duration-300 dark:bg-card flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-primary">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        {value && <div className="text-3xl font-bold text-foreground">{value}</div>}
        <p className="text-xs text-muted-foreground pt-1 flex-grow">{description}</p>
        {linkTo && (
          <Button asChild variant="link" className="px-0 pt-2 text-primary mt-auto">
            <Link to={linkTo}>
              {linkText} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

const EnhancedPlaceholderGraphCard = ({ title, description, icon, type = "bar" }) => {
    const MockChart = () => {
        if (type === "line") {
            return (
                <svg viewBox="0 0 100 50" className="w-full h-full">
                    <polyline fill="none" stroke="hsl(var(--primary))" strokeWidth="2" points="5,45 20,20 35,35 50,10 65,30 80,5 95,25" />
                    <line x1="0" y1="48" x2="100" y2="48" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
                    <line x1="2" y1="0" x2="2" y2="50" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
                </svg>
            );
        }
         if (type === "pie") {
            return (
                <svg viewBox="-5 -5 40 40" className="w-3/4 h-3/4 max-h-[100px]">
                    <circle r="15.9" fill="none" stroke="hsl(var(--secondary))" strokeWidth="5" cx="15" cy="15"/>
                    <circle r="15.9" fill="none" stroke="hsl(var(--primary))" strokeWidth="5" cx="15" cy="15" strokeDasharray="75 100" transform="rotate(-90 15 15)"/>
                    <circle r="15.9" fill="none" stroke="hsl(var(--accent))" strokeWidth="5" cx="15" cy="15" strokeDasharray="30 100" transform="rotate(117 15 15)"/>
                </svg>
            );
        }
        // Default Bar Chart
        return (
            <svg viewBox="0 0 100 50" className="w-full h-full">
                <rect x="10" y="20" width="15" height="30" fill="hsl(var(--primary))" />
                <rect x="30" y="10" width="15" height="40" fill="hsl(var(--primary)/0.7)" />
                <rect x="50" y="25" width="15" height="25" fill="hsl(var(--secondary))" />
                <rect x="70" y="5" width="15" height="45" fill="hsl(var(--accent))" />
                <line x1="0" y1="48" x2="100" y2="48" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
                <line x1="2" y1="0" x2="2" y2="50" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
            </svg>
        );
    }


    return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="h-full"
    >
        <Card className="hover:shadow-xl transition-shadow duration-300 dark:bg-card flex flex-col h-full">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-primary flex items-center">
                    {icon || <BarChart3 className="h-6 w-6 mr-2 text-primary" />}
                    {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center justify-center p-4">
                <div className="w-full h-40 bg-muted/10 dark:bg-muted/5 rounded-md flex items-center justify-center p-2 relative">
                    <MockChart />
                    <div className="absolute inset-0 flex items-center justify-center bg-background/30 dark:bg-card/30 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="text-center text-foreground p-2 bg-card/80 dark:bg-background/80 rounded-md shadow">
                            <Activity className="h-8 w-8 mx-auto mb-1 text-primary" />
                            <p className="text-sm font-semibold">Real Graph Coming Soon</p>
                            <p className="text-xs">Needs charting library & data.</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </motion.div>
    );
};


const HomePage = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 sm:p-8 rounded-xl page-header-gradient text-primary-foreground shadow-2xl"
      >
        <h1 className="page-header-title mb-3">Welcome to NextStep!</h1>
        <p className="page-header-description mb-6">
          Your AI-powered guide to a successful career in Software Engineering. Let's craft your future, together.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
          <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold w-full sm:w-auto dark:bg-background dark:text-primary dark:hover:bg-background/90" asChild>
            <Link to="/assessment">Start Career Assessment <Compass className="ml-2 h-5 w-5" /></Link>
          </Button>
          <Button variant="outline" size="lg" className="border-primary-foreground/80 text-primary-foreground hover:bg-primary-foreground/10 font-semibold w-full sm:w-auto" asChild>
             <Link to="/learning-paths">Explore Learning Paths <Briefcase className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        <EnhancedPlaceholderGraphCard 
          title="SE Job Role Demand"
          description="Current trends in software engineering roles."
          icon={<TrendingUp className="h-6 w-6 mr-2 text-primary"/>}
          type="line"
        />
         <EnhancedPlaceholderGraphCard 
          title="Your Skill Distribution"
          description="Breakdown of your strongest skill areas."
          icon={<PieChart className="h-6 w-6 mr-2 text-primary"/>}
          type="pie"
        />
        <StatCard 
          title="Community Members" 
          value="0" 
          icon={<Users className="h-6 w-6 text-muted-foreground" />} 
          description="Join a growing community of aspiring engineers. (User Auth Needed)"
          linkTo="/community"
          linkText="Join Community"
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card className="dark:bg-card">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-primary">How It Works</CardTitle>
            <CardDescription className="text-muted-foreground">Follow these simple steps to forge your career path:</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h4 className="font-semibold text-foreground">Take the Assessment</h4>
                <p className="text-sm text-muted-foreground">Discover roles that match your aptitude and interests through our interactive questionnaire and skill games.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h4 className="font-semibold text-foreground">Choose Your Path</h4>
                <p className="text-sm text-muted-foreground">Select from recommended career paths and access structured learning modules tailored to your choice.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h4 className="font-semibold text-foreground">Learn & Grow</h4>
                <p className="text-sm text-muted-foreground">Complete tasks, build projects, earn points, and unlock badges as you track your progress.</p>
              </div>
            </div>
             <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">4</div>
              <div>
                <h4 className="font-semibold text-foreground">Connect & Succeed</h4>
                <p className="text-sm text-muted-foreground">Engage with the community, share achievements, and optionally make your profile visible to recruiters.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default HomePage;