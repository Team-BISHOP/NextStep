import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Code, Cloud, ShieldCheck, Users, Layers, Search } from 'lucide-react';

const paths = [
  { title: 'Software Engineer', description: 'Build and maintain software applications across various platforms.', icon: Code, modules: 25, projects: 5, color: 'bg-blue-500' },
  { title: 'QA Engineer', description: 'Ensure software quality through rigorous testing and automation.', icon: ShieldCheck, modules: 18, projects: 3, color: 'bg-green-500' },
  { title: 'DevOps Engineer', description: 'Bridge development and operations for efficient software delivery.', icon: Layers, modules: 22, projects: 4, color: 'bg-purple-500' },
  { title: 'Cloud Engineer', description: 'Design, implement, and manage cloud-based infrastructure and services.', icon: Cloud, modules: 28, projects: 6, color: 'bg-yellow-500' },
  { title: 'Solutions Architect', description: 'Design high-level solutions to complex business problems using technology.', icon: Users, modules: 30, projects: 7, color: 'bg-red-500' },
  { title: 'Business Analyst', description: 'Analyze business needs and translate them into technical requirements.', icon: Briefcase, modules: 15, projects: 2, color: 'bg-indigo-500' },
];

const LearningPathCard = ({ title, description, icon: Icon, modules, projects, color }) => (
  <motion.div 
    whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="h-full flex flex-col dark:bg-brand-gray-dark/50 overflow-hidden">
      <CardHeader className="relative">
        <div className={`absolute top-0 left-0 right-0 h-2 ${color}`}></div>
        <div className="pt-4 flex items-center space-x-3">
          <Icon className={`h-8 w-8 ${color.replace('bg-', 'text-')}`} />
          <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
        </div>
        <CardDescription className="pt-1 text-sm text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-sm text-muted-foreground space-y-1">
          <p><span className="font-medium text-foreground">{modules}</span> learning modules</p>
          <p><span className="font-medium text-foreground">{projects}</span> hands-on projects</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className={`w-full ${color} hover:${color.replace('500', '600')} text-white`}>
          Explore Path
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
);

const LearningPathsPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const filteredPaths = paths.filter(path => 
    path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    path.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg dark:bg-brand-gray-dark/50">
        <CardHeader className="bg-gradient-to-r from-brand-blue-default to-brand-blue-dark p-6 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <Briefcase className="h-10 w-10 text-white" />
            <div>
              <CardTitle className="text-3xl font-bold text-white">Learning Paths</CardTitle>
              <CardDescription className="text-blue-100 text-md">Choose your software engineering specialization and start learning.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6 relative">
            <input 
              type="text"
              placeholder="Search for a learning path (e.g., DevOps, Cloud)"
              className="w-full p-3 pl-10 rounded-md border border-input bg-background focus:ring-primary focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>

          {filteredPaths.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPaths.map((path, index) => (
                <LearningPathCard key={index} {...path} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <img  class="mx-auto h-32 w-32 text-muted-foreground mb-4" alt="Magnifying glass with a sad face, indicating no results found." src="https://images.unsplash.com/photo-1665218627423-47e531284a4c" />
              <p className="text-xl font-semibold text-foreground">No Learning Paths Found</p>
              <p className="text-muted-foreground">Try adjusting your search term or explore all available paths.</p>
            </div>
          )}
          
          <p className="mt-8 text-sm text-center text-muted-foreground">
            New learning paths and modules are added regularly. Stay tuned!
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LearningPathsPage;