import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckSquare, Compass, Zap, ArrowRight, Lightbulb, Puzzle, Send, Brain, Gamepad2 } from 'lucide-react';

const AssessmentIntro = ({ onStartAssessment }) => (
  <motion.div 
    className="space-y-6 sm:space-y-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="shadow-lg dark:bg-card overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary via-primary/80 to-accent p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4">
          <Compass className="h-10 w-10 md:h-12 md:w-12 text-primary-foreground dark:text-background" />
          <div>
            <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground dark:text-background">Career Path Assessment</CardTitle>
            <CardDescription className="text-primary-foreground/80 dark:text-background/80 text-sm sm:text-md md:text-lg">Discover your ideal software engineering role.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 md:p-8">
        <p className="text-md sm:text-lg mb-4 text-foreground">
          This assessment helps you understand your strengths and interests. Answer honestly for the best results!
        </p>
        <p className="text-md sm:text-lg mb-6 text-foreground">
          We're crafting <span className="font-semibold text-primary">interactive mini-games and visual puzzles</span> to make this even more engaging and insightful. These new methods are coming soon!
        </p>
        
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <div className="flex items-start space-x-3 p-3 sm:p-4 bg-secondary dark:bg-secondary/30 rounded-lg shadow-sm">
            <CheckSquare className="h-5 w-5 sm:h-6 sm:w-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-md sm:text-lg text-foreground">Personalized Recommendations</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Receive 1-3 tailored role suggestions.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 sm:p-4 bg-secondary dark:bg-secondary/30 rounded-lg shadow-sm">
            <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-md sm:text-lg text-foreground">Quick & Engaging</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Complete in ~5-10 minutes.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse w-full sm:w-auto" onClick={onStartAssessment}>
            Start Questionnaire
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto" disabled>
            <Gamepad2 className="mr-2 h-5 w-5" /> Mini-Game Challenge (Coming Soon)
          </Button>
        </div>

        <div className="mt-8 sm:mt-10">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center text-foreground">How It Works:</h3>
          <div className="flex flex-col sm:flex-row justify-around items-start space-y-6 sm:space-y-0 sm:space-x-4">
            <div className="text-center max-w-xs mx-auto sm:mx-0">
              <Puzzle className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-2 text-primary" />
              <h4 className="font-medium text-foreground">Answer Questions</h4>
              <p className="text-xs text-muted-foreground">Respond to scenario-based and preference questions.</p>
            </div>
            <div className="text-center max-w-xs mx-auto sm:mx-0">
              <Brain className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-2 text-primary/70" />
              <h4 className="font-medium text-foreground/70">Visual Puzzles (Planned)</h4>
              <p className="text-xs text-muted-foreground">Engage in interactive tasks to reveal deeper insights.</p>
            </div>
            <div className="text-center max-w-xs mx-auto sm:mx-0">
              <Send className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-2 text-primary" />
              <h4 className="font-medium text-foreground">Get Your Results</h4>
              <p className="text-xs text-muted-foreground">View top career path matches and detailed insights.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default AssessmentIntro;