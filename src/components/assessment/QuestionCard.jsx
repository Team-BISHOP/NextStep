import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import { Progress } from "@/components/ui/progress"; 

const QuestionCard = ({ question, currentQ, totalQ, onAnswer, selectedAnswer, onNext, onPrevious, progress }) => {
  const cardVariants = {
    initial: { opacity: 0, x: 50, transition: { duration: 0.3, ease: "easeInOut" } },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: "easeInOut" } }
  };

  return (
    <motion.div
      key={question.id}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative"
    >
      <Card className="shadow-lg dark:bg-card overflow-hidden">
        <CardHeader className="p-4 sm:p-6 md:p-8 border-b dark:border-border">
           <Progress value={progress} className="w-full h-2 mb-4 bg-muted dark:bg-muted/50" indicatorClassName="bg-primary" />
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">Question {currentQ} <span className="text-muted-foreground text-base sm:text-lg">of {totalQ}</span></CardTitle>
          <CardDescription className="text-sm sm:text-md text-muted-foreground pt-1">{question.text}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 md:p-8">
          <div className="space-y-3 sm:space-y-4">
            {question.options.map(option => (
              <motion.div
                key={option.id}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
              >
                <Button
                  variant={selectedAnswer === option.id ? "default" : "outline"}
                  className={`w-full justify-start text-left h-auto py-2.5 px-3 sm:py-3 sm:px-4 whitespace-normal text-sm sm:text-base transition-all duration-150 ease-in-out ${selectedAnswer === option.id ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 dark:ring-offset-background dark:text-background' : 'hover:bg-muted/50 dark:hover:bg-muted/20 border-input text-foreground'}`}
                  onClick={() => onAnswer(question.id, option.id)}
                >
                  <span className={`font-semibold mr-2 sm:mr-3 py-1 px-1.5 sm:px-2 rounded text-xs sm:text-sm ${selectedAnswer === option.id ? 'bg-primary-foreground text-primary dark:bg-background dark:text-primary' : 'bg-muted text-muted-foreground dark:bg-muted/30'}`}>{option.id.toUpperCase()}.</span>
                  {option.text}
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row justify-between border-t dark:border-border space-y-3 sm:space-y-0">
          <Button variant="outline" onClick={onPrevious} disabled={currentQ <= 1} className="w-full sm:w-auto text-foreground border-input hover:bg-muted/50 dark:hover:bg-muted/20">
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button onClick={onNext} disabled={!selectedAnswer} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground dark:text-background">
            {currentQ === totalQ ? "View Results" : "Next"}
            {currentQ === totalQ ? <Send className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default QuestionCard;