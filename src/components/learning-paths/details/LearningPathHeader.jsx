import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const LearningPathHeader = ({ pathData, PathIcon }) => {
  return (
    <CardHeader className="page-header-gradient p-4 sm:p-6 rounded-t-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <PathIcon className="h-10 w-10 sm:h-12 sm:w-12 text-primary-foreground flex-shrink-0" />
          <div>
            <CardTitle className="page-header-title">{pathData.title} Roadmap</CardTitle>
            <CardDescription className="page-header-description">
              Your step-by-step guide to becoming a {pathData.title}.
            </CardDescription>
          </div>
        </div>
        <Button asChild variant="outline" size="sm" className="mt-4 sm:mt-0 sm:ml-auto w-full sm:w-auto border-primary-foreground/70 text-primary-foreground hover:bg-primary-foreground/10 dark:border-primary-foreground/70 dark:text-primary-foreground dark:hover:bg-primary-foreground/20">
          <Link to="/learning-paths">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Paths
          </Link>
        </Button>
      </div>
    </CardHeader>
  );
};

export default LearningPathHeader;