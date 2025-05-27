import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckSquare, Compass, Zap, ArrowLeft, ArrowRight, Send, RefreshCw } from 'lucide-react';
import { Progress } from "@/components/ui/progress"; 

const questions = [
  {
    id: 1,
    text: "When faced with a complex problem, what is your initial approach?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "Break it down into smaller, manageable parts." },
      { id: "b", text: "Research existing solutions and best practices." },
      { id: "c", text: "Experiment with different ideas and prototype solutions." },
      { id: "d", text: "Collaborate with others to brainstorm and discuss." }
    ]
  },
  {
    id: 2,
    text: "Which of these activities do you find most engaging?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "Designing user interfaces and experiences." },
      { id: "b", text: "Optimizing code for performance and efficiency." },
      { id: "c", text: "Automating repetitive tasks and processes." },
      { id: "d", text: "Planning project architecture and infrastructure." }
    ]
  },
  {
    id: 3,
    text: "How comfortable are you with learning new technologies and tools?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "Very comfortable, I enjoy exploring new things." },
      { id: "b", text: "Somewhat comfortable, I learn as needed." },
      { id: "c", text: "Neutral, it depends on the technology." },
      { id: "d", text: "Less comfortable, I prefer sticking to what I know." }
    ]
  },
  {
    id: 4,
    text: "What aspect of software development excites you the most?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "Seeing users interact with the final product." },
      { id: "b", text: "Solving challenging logical puzzles." },
      { id: "c", text: "Building robust and scalable systems." },
      { id: "d", text: "Ensuring the quality and reliability of software." }
    ]
  },
  {
    id: 5,
    text: "Imagine a team project. Which role would you naturally gravitate towards?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "The one who codes core features." },
      { id: "b", text: "The one who tests everything meticulously." },
      { id: "c", text: "The one who manages deployment and operations." },
      { id: "d", text: "The one who designs the overall system." }
    ]
  }
];

const CareerPathAssessmentPage = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1 onwards: Questions, last: Results
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const totalQuestions = questions.length;

  const handleStartAssessment = () => {
    setCurrentStep(1);
    setShowResults(false);
    setAnswers({});
  };

  const handleAnswerSelect = (questionId, optionId) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleNext = () => {
    if (currentStep < totalQuestions) {
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === totalQuestions) {
      // This is the last question, show submit/results
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (showResults) setShowResults(false); // Go back from results to last question
    else if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };
  
  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  }

  const progressPercentage = totalQuestions > 0 ? ((currentStep -1) / totalQuestions) * 100 : 0;
  
  const cardVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: "easeInOut" } }
  };

  if (currentStep === 0) {
    return (
      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-lg dark:bg-card overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary to-accent p-6 md:p-8">
            <div className="flex items-center space-x-3 md:space-x-4">
              <Compass className="h-10 w-10 md:h-12 md:w-12 text-primary-foreground" />
              <div>
                <CardTitle className="text-3xl md:text-4xl font-bold text-primary-foreground">Career Path Assessment</CardTitle>
                <CardDescription className="text-primary-foreground/80 text-md md:text-lg">Discover your ideal software engineering role.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <p className="text-lg mb-6 text-foreground">
              This interactive assessment will help you understand your strengths, interests, and aptitudes to recommend suitable software engineering career paths.
              Answer honestly to get the most accurate results!
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start space-x-3 p-4 bg-secondary dark:bg-secondary/80 rounded-lg">
                <CheckSquare className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Personalized Recommendations</h3>
                  <p className="text-sm text-muted-foreground">Receive 1-3 tailored role suggestions.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-secondary dark:bg-secondary/80 rounded-lg">
                <Zap className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Quick & Engaging</h3>
                  <p className="text-sm text-muted-foreground">Complete in ~5-10 minutes.</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse" onClick={handleStartAssessment}>
                Start Assessment Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4 text-center text-foreground">How the assessment works:</h3>
              <div className="flex flex-col md:flex-row justify-around items-start space-y-6 md:space-y-0 md:space-x-4">
                <div className="text-center max-w-xs mx-auto md:mx-0">
                  <img  alt="Icon representing questions" class="h-16 w-16 mx-auto mb-2 text-primary"  src="https://images.unsplash.com/photo-1636633762833-5d1658f1e29b" />
                  <h4 className="font-medium text-foreground">Answer Questions</h4>
                  <p className="text-xs text-muted-foreground">Respond to a series of scenario-based and preference questions.</p>
                </div>
                <div className="text-center max-w-xs mx-auto md:mx-0">
                  <img  alt="Icon representing analysis" class="h-16 w-16 mx-auto mb-2 text-primary"  src="https://images.unsplash.com/photo-1578098576845-51e4ff4305d5" />
                  <h4 className="font-medium text-foreground">AI-Powered Analysis</h4>
                  <p className="text-xs text-muted-foreground">Our algorithm analyzes your responses to identify patterns.</p>
                </div>
                <div className="text-center max-w-xs mx-auto md:mx-0">
                  <img  alt="Icon representing results" class="h-16 w-16 mx-auto mb-2 text-primary"  src="https://images.unsplash.com/photo-1638256192052-9fa73b790cf5" />
                  <h4 className="font-medium text-foreground">Get Your Results</h4>
                  <p className="text-xs text-muted-foreground">View your top career path matches and detailed insights.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (showResults) {
    return (
      <motion.div
        key="results"
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Card className="shadow-lg dark:bg-card overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary to-accent p-6 md:p-8">
            <CardTitle className="text-3xl md:text-4xl font-bold text-primary-foreground">Assessment Results</CardTitle>
            <CardDescription className="text-primary-foreground/80 text-md md:text-lg">Here are your personalized recommendations!</CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <p className="text-lg mb-6 text-foreground">
              Based on your answers, we've identified the following potential career paths for you.
              (This is a placeholder. Real results and analysis will be implemented later.)
            </p>
            <div className="space-y-4">
              <Card className="bg-secondary dark:bg-secondary/80 p-4">
                <h3 className="text-xl font-semibold text-primary">1. Software Engineer</h3>
                <p className="text-muted-foreground">Strong problem-solving and coding skills. Enjoys building features.</p>
              </Card>
              <Card className="bg-secondary dark:bg-secondary/80 p-4">
                <h3 className="text-xl font-semibold text-primary">2. DevOps Engineer</h3>
                <p className="text-muted-foreground">Interest in automation, infrastructure, and system stability.</p>
              </Card>
            </div>
          </CardContent>
          <CardFooter className="p-6 md:p-8 flex justify-between">
            <Button variant="outline" onClick={handlePrevious}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Questions
            </Button>
            <Button onClick={handleRestart}>
              <RefreshCw className="mr-2 h-4 w-4" /> Restart Assessment
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    )
  }
  
  const currentQuestion = questions[currentStep - 1];

  return (
    <motion.div
      key={currentStep}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative"
    >
      <Card className="shadow-lg dark:bg-card overflow-hidden">
        <CardHeader className="p-6 md:p-8 border-b dark:border-border">
           <Progress value={progressPercentage} className="w-full h-2 mb-4" />
          <CardTitle className="text-2xl md:text-3xl font-semibold text-foreground">Question {currentStep} <span className="text-muted-foreground text-lg">of {totalQuestions}</span></CardTitle>
          <CardDescription className="text-md text-muted-foreground pt-1">{currentQuestion.text}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <div className="space-y-4">
            {currentQuestion.options.map(option => (
              <motion.div
                key={option.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={answers[currentQuestion.id] === option.id ? "default" : "outline"}
                  className={`w-full justify-start text-left h-auto py-3 px-4 whitespace-normal ${answers[currentQuestion.id] === option.id ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 dark:ring-offset-background' : 'hover:bg-muted/50'}`}
                  onClick={() => handleAnswerSelect(currentQuestion.id, option.id)}
                >
                  <span className={`font-semibold mr-3 py-1 px-2 rounded ${answers[currentQuestion.id] === option.id ? 'bg-primary-foreground text-primary' : 'bg-muted text-muted-foreground'}`}>{option.id.toUpperCase()}.</span>
                  {option.text}
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-6 md:p-8 flex justify-between border-t dark:border-border">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep <= 1 && !showResults}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button onClick={handleNext} disabled={!answers[currentQuestion.id]}>
            {currentStep === totalQuestions ? "View Results" : "Next"}
            {currentStep === totalQuestions ? <Send className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CareerPathAssessmentPage;