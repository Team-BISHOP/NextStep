import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Briefcase, Compass, Users, BarChart3, Activity } from 'lucide-react';
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

const PlaceholderGraphCard = ({ title, description }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="h-full"
    >
        <Card className="hover:shadow-xl transition-shadow duration-300 dark:bg-card flex flex-col h-full">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-primary flex items-center">
                    <BarChart3 className="h-6 w-6 mr-2 text-primary" />
                    {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                    <Activity className="h-16 w-16 mx-auto mb-2 text-muted-foreground/50" />
                    <p>Detailed graph coming soon.</p>
                </div>
            </CardContent>
        </Card>
    </motion.div>
);


const HomePage = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 rounded-xl bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground shadow-2xl dark:from-brand-blue-dark dark:via-brand-blue-default/90 dark:to-accent"
      >
        <h1 className="text-4xl font-bold mb-3 text-white dark:text-primary-foreground">Welcome to NextStep!</h1>
        <p className="text-lg text-white/90 dark:text-blue-100 mb-6">
          Your AI-powered guide to a successful career in Software Engineering. Let's craft your future, together.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" className="bg-white text-primary hover:bg-blue-50 font-semibold dark:text-brand-blue-dark dark:hover:bg-slate-200" asChild>
            <Link to="/assessment">Start Career Assessment <Compass className="ml-2 h-5 w-5" /></Link>
          </Button>
          <Button variant="outline" size="lg" className="border-white/80 text-white hover:bg-white/10 font-semibold dark:border-blue-200/70 dark:hover:bg-white/20" asChild>
             <Link to="/learning-paths">Explore Learning Paths <Briefcase className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PlaceholderGraphCard 
          title="SE Job Role Demand"
          description="Visualizing current trends in software engineering roles."
        />
         <PlaceholderGraphCard 
          title="Your Progress Overview"
          description="Track your learning and skill development at a glance."
        />
        <StatCard 
          title="Community Members" 
          value="0" 
          icon={<Users className="h-6 w-6 text-muted-foreground" />} 
          description="Join a growing community of aspiring engineers. (Coming Soon!)"
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
            <CardTitle className="text-2xl text-primary">How It Works</CardTitle>
            <CardDescription className="text-muted-foreground">Follow these simple steps to forge your career path:</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-semibold text-foreground">Take the Assessment</h4>
                <p className="text-sm text-muted-foreground">Discover roles that match your aptitude and interests through our interactive questionnaire.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-semibold text-foreground">Choose Your Path</h4>
                <p className="text-sm text-muted-foreground">Select from recommended career paths and access structured learning modules.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-semibold text-foreground">Learn & Grow</h4>
                <p className="text-sm text-muted-foreground">Complete tasks, build projects, and track your progress with our skill scoring system.</p>
              </div>
            </div>
             <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">4</div>
              <div>
                <h4 className="font-semibold text-foreground">Connect & Succeed</h4>
                <p className="text-sm text-muted-foreground">Engage with the community and optionally make your profile visible to recruiters.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <div className="text-center py-8">
         <img  class="mx-auto w-full max-w-2xl rounded-lg shadow-lg object-cover h-64 md:h-80 lg:h-96" alt="Illustration of diverse people collaborating on code around a stylized gear representing career forging" src="https://images.unsplash.com/photo-1693386556815-7f2bf40493bd" />
      </div>

    </div>
  );
};

export default HomePage;