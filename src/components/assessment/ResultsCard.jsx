import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw, Sparkles, CheckCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResultsCard = ({ onRestart, onBackToQuestions, recommendedPaths }) => {
  const cardVariants = {
    initial: { opacity: 0, scale: 0.9, transition: { duration: 0.3, ease: "easeInOut" } },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3, ease: "easeInOut" } }
  };

  const defaultPaths = [
    { id: 'software-engineer', title: 'Software Engineer', description: 'Strong problem-solving and coding skills. Enjoys building features.', reason: "Your answers indicate a strong aptitude for logical thinking and a passion for creating tangible software products." },
    { id: 'devops-engineer', title: 'DevOps Engineer', description: 'Interest in automation, infrastructure, and system stability.', reason: "You seem to enjoy optimizing processes and ensuring systems run smoothly, key traits for DevOps." },
  ];
  
  const pathsToDisplay = recommendedPaths && recommendedPaths.length > 0 ? recommendedPaths : defaultPaths;


  const handleSelectPath = (pathId) => {
    localStorage.setItem('chosenCareerPath', pathId);
    // Potentially navigate or show a confirmation
    // For now, just log it
    console.log(`Path ${pathId} selected and saved.`);
  };

  return (
    <motion.div
      key="results"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Card className="shadow-lg dark:bg-card overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary via-primary/80 to-accent p-4 sm:p-6 md:p-8">
          <div className="flex items-center space-x-3">
            <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-primary-foreground dark:text-background" />
            <div>
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground dark:text-background">Assessment Results</CardTitle>
              <CardDescription className="text-primary-foreground/80 dark:text-background/80 text-sm sm:text-md md:text-lg">Your personalized career path recommendations!</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 md:p-8">
          <p className="text-md sm:text-lg mb-6 text-foreground">
            Based on your responses, we've identified these potential career paths for you. Explore them to find your best fit!
          </p>
          <div className="space-y-4">
            {pathsToDisplay.map((path, index) => (
              <Card key={path.id} className="bg-secondary dark:bg-secondary/80 p-3 sm:p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start">
                    <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-primary">{index + 1}. {path.title}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{path.description}</p>
                        <p className="text-xs text-foreground/70 mt-2 italic">"{path.reason}"</p>
                    </div>
                    <Button asChild size="sm" className="mt-3 sm:mt-0 sm:ml-4 bg-primary text-primary-foreground dark:text-background hover:bg-primary/90">
                        <Link to={`/learning-paths/${path.id}`} onClick={() => handleSelectPath(path.id)}>
                           <CheckCheck className="mr-2 h-4 w-4" /> Choose & View Path
                        </Link>
                    </Button>
                </div>
              </Card>
            ))}
             {pathsToDisplay.length === 0 && (
                <p className="text-muted-foreground text-center py-5">No specific paths matched strongly. Try retaking or explore all paths!</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row justify-between border-t dark:border-border space-y-3 sm:space-y-0">
          <Button variant="outline" onClick={onBackToQuestions} className="w-full sm:w-auto text-foreground border-input hover:bg-muted/50 dark:hover:bg-muted/20">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Questions
          </Button>
          <Button onClick={onRestart} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground dark:text-background">
            <RefreshCw className="mr-2 h-4 w-4" /> Restart Assessment
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ResultsCard;