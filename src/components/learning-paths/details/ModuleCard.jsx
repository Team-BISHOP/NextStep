import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Lock, PlayCircle, BookOpen, Code, Zap, Milestone, Clock, BarChart2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const getModuleIcon = (type) => {
  switch(type) {
    case 'video': return <PlayCircle className="h-5 w-5 text-primary flex-shrink-0" />;
    case 'course': return <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />;
    case 'interactive': return <Zap className="h-5 w-5 text-primary flex-shrink-0" />;
    case 'project': return <Code className="h-5 w-5 text-primary flex-shrink-0" />;
    default: return <Milestone className="h-5 w-5 text-primary flex-shrink-0" />;
  }
};

const ModuleCard = ({ module, index }) => {
  const isLocked = module.status === 'locked';
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: index * 0.05 } }
  };
  const progressValue = module.status === 'completed' ? 100 : module.status === 'inprogress' ? (module.progress || 50) : 0;

  return (
    <motion.div 
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <Card className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-xl border-l-4",
        isLocked ? 'border-l-muted-foreground/30 bg-muted/20 dark:bg-muted/10' : 'border-l-primary bg-card dark:bg-card',
        module.status === 'inprogress' && 'ring-2 ring-accent dark:ring-accent ring-offset-2 dark:ring-offset-card shadow-lg'
      )}>
        <CardHeader className="p-4">
          <div className="flex items-start justify-between space-x-2">
            <div className="flex items-start space-x-3 min-w-0"> {/* Added min-w-0 here */}
              {getModuleIcon(module.type)}
              <div className="flex-grow"> {/* Added flex-grow */}
                <CardTitle className={cn("text-md sm:text-lg font-semibold break-words", isLocked ? 'text-muted-foreground' : 'text-foreground')}>{module.title}</CardTitle> {/* Added break-words */}
                <div className="flex flex-wrap items-center text-xs text-muted-foreground space-x-2 mt-1">
                  <span className="flex items-center whitespace-nowrap"><BarChart2 className="h-3 w-3 mr-1" />{module.type}</span>
                  <span className="flex items-center whitespace-nowrap"><Clock className="h-3 w-3 mr-1" />{module.duration}</span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 ml-2 self-start"> {/* Added self-start */}
                {module.status === 'completed' && <CheckCircle className="h-6 w-6 text-green-500" title="Completed"/>}
                {module.status === 'inprogress' && <div className="h-3 w-3 bg-accent rounded-full animate-pulse mt-1" title="In Progress"></div> }
                {module.status === 'locked' && <Lock className="h-5 w-5 text-muted-foreground/70" title="Locked"/>}
            </div>
          </div>
        </CardHeader>
        {module.description && (
          <CardContent className="p-4 pt-0">
            <p className={cn("text-sm", isLocked ? 'text-muted-foreground/70' : 'text-muted-foreground')}>{module.description}</p>
          </CardContent>
        )}
        <CardFooter className={cn("p-4", isLocked ? "hidden" : "flex flex-col sm:flex-row items-center gap-2")}>
            <Progress value={progressValue} className="w-full sm:w-2/3 h-2" indicatorClassName={module.status === 'completed' ? 'bg-green-500' : 'bg-primary'} />
            <Button 
              size="sm" 
              variant={module.status === 'completed' ? "outline" : "default"}
              className={cn("w-full sm:w-auto sm:ml-auto mt-2 sm:mt-0", module.status === 'inprogress' && 'bg-accent hover:bg-accent/90 text-accent-foreground')}
              disabled={isLocked}
            >
              {module.status === 'completed' ? 'Review' : module.status === 'inprogress' ? 'Continue' : 'Start Module'}
            </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ModuleCard;
