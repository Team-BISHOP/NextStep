import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Code, ShieldCheck, GitBranch, Cloud, Users, Briefcase, Database, Palette, Brain, AlertTriangle } from 'lucide-react';
import LearningPathHeader from '@/components/learning-paths/details/LearningPathHeader';
import LearningPathModuleList from '@/components/learning-paths/details/LearningPathModuleList';

const allPathsData = {
  'software-engineer': { 
    title: 'Software Engineer', 
    icon: Code, 
    modules: [
      { id: 1, title: 'Introduction to Programming with Python', status: 'completed', type: 'course', duration: '10 hours', description: 'Learn the fundamentals of programming using Python, covering syntax, data types, and control flow.', progress: 100 },
      { id: 2, title: 'Data Structures & Algorithms', status: 'inprogress', type: 'course', duration: '20 hours', description: 'Understand common data structures (arrays, lists, trees, graphs) and algorithms (sorting, searching). Prerequisite for advanced topics.', parent: 1, progress: 60 },
      { id: 3, title: 'Version Control with Git & GitHub', status: 'locked', type: 'interactive', duration: '5 hours', description: 'Master Git for version control and collaboration using GitHub. Essential for team projects.', parent: 1 },
      { id: 4, title: 'Frontend Basics (HTML, CSS, JavaScript)', status: 'locked', type: 'course', duration: '15 hours', description: 'Build the visual and interactive parts of websites. Covers core web technologies.', parent: 1 },
      { id: 5, title: 'Introduction to Databases (SQL)', status: 'locked', type: 'course', duration: '12 hours', description: 'Learn SQL for managing and querying relational databases.', parent: 1 },
      { id: 6, title: 'Frontend Frameworks (React)', status: 'locked', type: 'project', duration: '25 hours', description: 'Deep dive into React for building dynamic user interfaces. Build a portfolio project.', parent: 4 },
      { id: 7, title: 'Backend Development (Node.js & Express)', status: 'locked', type: 'course', duration: '20 hours', description: 'Learn to build server-side applications with Node.js and Express framework.', parent: 5 },
      { id: 8, title: 'Full-Stack Application Project', status: 'locked', type: 'project', duration: '30 hours', description: 'Combine frontend and backend skills to build a complete web application.', parents: [6, 7] },
      { id: 9, title: 'Testing and QA Fundamentals', status: 'locked', type: 'course', duration: '8 hours', description: 'Learn software testing principles and methodologies.', parent: 2 },
      { id: 10, title: 'Deployment & DevOps Basics', status: 'locked', type: 'interactive', duration: '10 hours', description: 'Understand deployment strategies and basic DevOps concepts.', parent: 8 },
    ]
  },
   'qa-engineer': { title: 'QA Engineer', icon: ShieldCheck, modules: [ 
    { id: 1, title: 'Software Testing Fundamentals', status: 'completed', type: 'course', duration: '10h', progress: 100 },
    { id: 2, title: 'Test Case Design', status: 'inprogress', type: 'interactive', duration: '8h', parent: 1, progress: 40 },
    { id: 3, title: 'Automation with Selenium', status: 'locked', type: 'project', duration: '20h', parent: 2 },
   ]},
  'devops-engineer': { title: 'DevOps Engineer', icon: GitBranch, modules: []},
  'cloud-engineer': { title: 'Cloud Engineer', icon: Cloud, modules: []},
  'solutions-architect': { title: 'Solutions Architect', icon: Users, modules: []},
  'business-analyst': { title: 'Business Analyst', icon: Briefcase, modules: []},
  'data-scientist': { title: 'Data Scientist', icon: Database, modules: []},
  'cybersecurity-analyst': { title: 'Cybersecurity Analyst', icon: ShieldCheck, modules: []},
  'ui-ux-designer': { title: 'UI/UX Designer', icon: Palette, modules: []},
  'ai-ml-engineer': { title: 'AI/ML Engineer', icon: Brain, modules: []},
};


const LearningPathDetailPage = () => {
  const { pathId } = useParams();
  const pathData = allPathsData[pathId] || { title: 'Unknown Path', modules: [] };
  const PathIcon = pathData.icon || Code;

  if (!pathData || !pathData.title || pathData.title === 'Unknown Path') {
    return (
      <motion.div 
        initial={{ opacity: 0, y:20}} animate={{opacity:1, y:0}}
        className="text-center py-10 flex flex-col items-center justify-center h-[60vh]"
      >
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Learning Path Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The learning path for "{pathId}" could not be found or is not yet available.
        </p>
        <Button asChild variant="outline">
          <Link to="/learning-paths">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Learning Paths
          </Link>
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-6 sm:space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg dark:bg-card overflow-hidden">
        <LearningPathHeader pathData={pathData} PathIcon={PathIcon} />
        <CardContent className="p-4 sm:p-6">
          <LearningPathModuleList modules={pathData.modules} />
        </CardContent>
        <CardFooter className="p-4 sm:p-6 text-center border-t dark:border-border">
            <p className="text-xs text-muted-foreground w-full">
                Content is for demonstration purposes. Actual learning modules may vary.
            </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default LearningPathDetailPage;