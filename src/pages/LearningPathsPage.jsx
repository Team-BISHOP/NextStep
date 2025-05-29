import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Code, Cloud, ShieldCheck, Users, Layers, Search, Database, GitBranch, Palette, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const paths = [
  { id: 'software-engineer', title: 'Software Engineer', description: 'Build and maintain software applications across various platforms.', icon: Code, modules: 25, projects: 5, color: 'bg-blue-500', textColor: 'text-blue-500' },
  { id: 'qa-engineer', title: 'QA Engineer', description: 'Ensure software quality through rigorous testing and automation.', icon: ShieldCheck, modules: 18, projects: 3, color: 'bg-green-500', textColor: 'text-green-500' },
  { id: 'devops-engineer', title: 'DevOps Engineer', description: 'Bridge development and operations for efficient software delivery.', icon: Layers, modules: 22, projects: 4, color: 'bg-purple-500', textColor: 'text-purple-500' },
  { id: 'cloud-engineer', title: 'Cloud Engineer', description: 'Design, implement, and manage cloud-based infrastructure and services.', icon: Cloud, modules: 28, projects: 6, color: 'bg-sky-500', textColor: 'text-sky-500' },
  { id: 'solutions-architect', title: 'Solutions Architect', description: 'Design high-level solutions to complex business problems using technology.', icon: Users, modules: 30, projects: 7, color: 'bg-red-500', textColor: 'text-red-500' },
  { id: 'business-analyst', title: 'Business Analyst', description: 'Analyze business needs and translate them into technical requirements.', icon: Briefcase, modules: 15, projects: 2, color: 'bg-indigo-500', textColor: 'text-indigo-500' },
  { id: 'data-scientist', title: 'Data Scientist', description: 'Extract insights and knowledge from data using scientific methods.', icon: Database, modules: 32, projects: 8, color: 'bg-pink-500', textColor: 'text-pink-500' },
  { id: 'cybersecurity-analyst', title: 'Cybersecurity Analyst', description: 'Protect computer systems and networks from threats.', icon: GitBranch, modules: 26, projects: 5, color: 'bg-teal-500', textColor: 'text-teal-500' },
  { id: 'ui-ux-designer', title: 'UI/UX Designer', description: 'Create user-friendly and visually appealing digital interfaces.', icon: Palette, modules: 20, projects: 4, color: 'bg-orange-500', textColor: 'text-orange-500' },
  { id: 'ai-ml-engineer', title: 'AI/ML Engineer', description: 'Develop artificial intelligence and machine learning models.', icon: Brain, modules: 35, projects: 9, color: 'bg-cyan-500', textColor: 'text-cyan-500' },
];

const LearningPathCard = ({ id, title, description, icon: Icon, modules, projects, color, textColor }) => (
  <motion.div 
    whileHover={{ y: -5, boxShadow: "0px 10px 20px hsl(var(--primary)/0.1)" }}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="h-full flex flex-col dark:bg-card overflow-hidden shadow-md hover:shadow-xl transition-shadow border-t-4" style={{ borderTopColor: `hsl(var(--${color.replace('bg-','').split('-')[0]}))`, '--path-color': `hsl(var(--${color.replace('bg-','').split('-')[0]}))` }}>
      <CardHeader className="relative">
        <div className="pt-4 flex items-center space-x-3">
          <Icon className={cn("h-8 w-8", textColor)} />
          <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
        </div>
        <CardDescription className="pt-1 text-sm text-muted-foreground h-12 overflow-hidden text-ellipsis">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-sm text-muted-foreground space-y-1">
          <p><span className="font-medium text-foreground">{modules}</span> learning modules</p>
          <p><span className="font-medium text-foreground">{projects}</span> hands-on projects</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className={cn("w-full text-white", color, `hover:${color.replace('500', '600')}`)}>
          <Link to={`/learning-paths/${id}`}>Explore Path</Link>
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
      className="space-y-6 sm:space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg dark:bg-card">
        <CardHeader className="page-header-gradient p-4 sm:p-6 rounded-t-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <Briefcase className="h-8 w-8 sm:h-10 sm:w-10 text-primary-foreground" />
            <div>
              <CardTitle className="page-header-title">Learning Paths</CardTitle>
              <CardDescription className="page-header-description">Choose your software engineering specialization and start learning.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredPaths.map((path) => (
                <LearningPathCard key={path.id} {...path} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <img  class="mx-auto h-24 w-24 sm:h-32 sm:w-32 text-muted-foreground mb-4" alt="Magnifying glass with a sad face, indicating no results found." src="https://images.unsplash.com/photo-1665218627423-47e531284a4c" />
              <p className="text-lg sm:text-xl font-semibold text-foreground">No Learning Paths Found</p>
              <p className="text-muted-foreground text-sm sm:text-base">Try adjusting your search term or explore all available paths.</p>
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