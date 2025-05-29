import React, { useState, useEffect } from 'react';
import AssessmentIntro from '@/components/assessment/AssessmentIntro';
import QuestionCard from '@/components/assessment/QuestionCard';
import ResultsCard from '@/components/assessment/ResultsCard';
import WhackASkillGame from '@/components/assessment/WhackASkillGame';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListChecks, Gamepad2 } from 'lucide-react';

const questions = [
  {
    id: 1,
    text: "When faced with a complex problem, what is your initial approach?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "Break it down into smaller, manageable parts.", score: { 'Software Engineer': 2, 'Solutions Architect': 1, 'Problem Solving': 2 } },
      { id: "b", text: "Research existing solutions and best practices.", score: { 'Business Analyst': 2, 'Solutions Architect': 1, 'Data Analysis': 1 } },
      { id: "c", text: "Experiment with different ideas and prototype solutions.", score: { 'Software Engineer': 1, 'Data Scientist': 2, 'AI/ML Engineer': 1, 'Coding Logic': 1 } },
      { id: "d", text: "Collaborate with others to brainstorm and discuss.", score: { 'Business Analyst': 1, 'QA Engineer': 1, 'Collaboration': 2 } }
    ]
  },
  {
    id: 2,
    text: "Which of these activities do you find most engaging?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "Designing user interfaces and experiences.", score: { 'UI/UX Designer': 3, 'Software Engineer': 1, 'Design Thinking': 3 } },
      { id: "b", text: "Optimizing code for performance and efficiency.", score: { 'Software Engineer': 2, 'DevOps Engineer': 1, 'Coding Logic': 2 } },
      { id: "c", text: "Automating repetitive tasks and processes.", score: { 'DevOps Engineer': 3, 'QA Engineer': 1, 'Automation': 3 } },
      { id: "d", text: "Planning project architecture and infrastructure.", score: { 'Solutions Architect': 3, 'Cloud Engineer': 1, 'Cloud Tech': 1 } }
    ]
  },
  {
    id: 3,
    text: "How comfortable are you with learning new technologies and tools?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "Very comfortable, I enjoy exploring new things.", score: { 'Software Engineer': 1, 'DevOps Engineer': 1, 'Cloud Engineer': 1, 'Data Scientist':1, 'AI/ML Engineer': 1 } },
      { id: "b", text: "Somewhat comfortable, I learn as needed.", score: { 'QA Engineer': 1, 'Business Analyst': 1 } },
      { id: "c", text: "Neutral, it depends on the technology.", score: {} },
      { id: "d", text: "Less comfortable, I prefer sticking to what I know.", score: {} }
    ]
  },
  {
    id: 4,
    text: "What aspect of software development excites you the most?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "Seeing users interact with the final product.", score: { 'UI/UX Designer': 2, 'Software Engineer': 1, 'QA Engineer': 1, 'Design Thinking': 1 } },
      { id: "b", text: "Solving challenging logical puzzles.", score: { 'Software Engineer': 2, 'Data Scientist': 1, 'Problem Solving': 2 } },
      { id: "c", text: "Building robust and scalable systems.", score: { 'Solutions Architect': 2, 'Cloud Engineer': 2, 'DevOps Engineer': 1, 'Cloud Tech': 2 } },
      { id: "d", text: "Ensuring the quality and reliability of software.", score: { 'QA Engineer': 3, 'System Security': 1 } }
    ]
  },
  {
    id: 5,
    text: "Imagine a team project. Which role would you naturally gravitate towards?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "The one who codes core features.", score: { 'Software Engineer': 3, 'Coding Logic': 2 } },
      { id: "b", text: "The one who tests everything meticulously.", score: { 'QA Engineer': 3 } },
      { id: "c", text: "The one who manages deployment and operations.", score: { 'DevOps Engineer': 3, 'Cloud Engineer': 1, 'Automation': 1 } },
      { id: "d", text: "The one who designs the overall system.", score: { 'Solutions Architect': 3 } }
    ]
  }
];

const pathDetails = {
  'Software Engineer': { description: 'Build and maintain software applications across various platforms.', reasonTemplate: "Your answers indicate a strong aptitude for logical thinking and a passion for creating tangible software products." },
  'QA Engineer': { description: 'Ensure software quality through rigorous testing and automation.', reasonTemplate: "You show a keen eye for detail and a drive for quality, essential for a QA Engineer." },
  'DevOps Engineer': { description: 'Bridge development and operations for efficient software delivery.', reasonTemplate: "You seem to enjoy optimizing processes and ensuring systems run smoothly, key traits for DevOps." },
  'Cloud Engineer': { description: 'Design, implement, and manage cloud-based infrastructure and services.', reasonTemplate: "Your interest in scalable systems and infrastructure points towards a Cloud Engineering role." },
  'Solutions Architect': { description: 'Design high-level solutions to complex business problems using technology.', reasonTemplate: "You enjoy planning and designing large systems, which is central to a Solutions Architect." },
  'Business Analyst': { description: 'Analyze business needs and translate them into technical requirements.', reasonTemplate: "Your knack for understanding requirements and communication suits a Business Analyst." },
  'Data Scientist': { description: 'Extract insights and knowledge from data using scientific methods.', reasonTemplate: "A preference for experimentation and data analysis makes Data Scientist a good fit." },
  'UI/UX Designer': { description: 'Create user-friendly and visually appealing digital interfaces.', reasonTemplate: "Your focus on user experience and design aligns well with UI/UX Design." },
  'AI/ML Engineer': { description: 'Develop artificial intelligence and machine learning models.', reasonTemplate: "Interest in new technologies and experimentation points towards AI/ML Engineering." },
};

const gameTypeToPathMapping = {
  'Problem Solving': ['Software Engineer', 'Solutions Architect', 'Data Scientist'],
  'Coding Logic': ['Software Engineer', 'AI/ML Engineer'],
  'Design Thinking': ['UI/UX Designer', 'Software Engineer'],
  'Collaboration': ['Business Analyst', 'QA Engineer', 'Solutions Architect'],
  'Data Analysis': ['Data Scientist', 'Business Analyst'],
  'System Security': ['QA Engineer', 'Cybersecurity Analyst'],
  'Cloud Tech': ['Cloud Engineer', 'DevOps Engineer', 'Solutions Architect'],
  'Automation': ['DevOps Engineer', 'QA Engineer'],
};


const CareerPathAssessmentPage = () => {
  const [assessmentType, setAssessmentType] = useState('intro'); 
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState({});
  const [gameScores, setGameScores] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recommendedPaths, setRecommendedPaths] = useState([]);

  const totalQuestions = questions.length;

  useEffect(() => {
    const savedAnswers = localStorage.getItem('careerAssessmentAnswers');
    if (savedAnswers) {
      setQuestionnaireAnswers(JSON.parse(savedAnswers));
    }
    const savedGameScores = localStorage.getItem('careerAssessmentGameScores');
    if (savedGameScores) {
      setGameScores(JSON.parse(savedGameScores));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('careerAssessmentAnswers', JSON.stringify(questionnaireAnswers));
  }, [questionnaireAnswers]);

  useEffect(() => {
    localStorage.setItem('careerAssessmentGameScores', JSON.stringify(gameScores));
  }, [gameScores]);


  const calculateResults = () => {
    const combinedScores = {};

    questions.forEach(q => {
      const answerId = questionnaireAnswers[q.id];
      if (answerId) {
        const selectedOption = q.options.find(opt => opt.id === answerId);
        if (selectedOption && selectedOption.score) {
          for (const path in selectedOption.score) {
            combinedScores[path] = (combinedScores[path] || 0) + selectedOption.score[path];
          }
        }
      }
    });

    if (gameScores) {
      for (const gameType in gameScores) {
        const pathsToBoost = gameTypeToPathMapping[gameType] || [];
        pathsToBoost.forEach(path => {
          combinedScores[path] = (combinedScores[path] || 0) + (gameScores[gameType] * 1.5); 
        });
      }
    }
    
    const sortedPaths = Object.entries(combinedScores)
      .filter(([key]) => pathDetails[key]) 
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3) 
      .map(([id]) => ({ 
        id: id.toLowerCase().replace(/ /g, '-'), 
        title: id, 
        description: pathDetails[id]?.description || "A promising career in tech!",
        reason: pathDetails[id]?.reasonTemplate || "Your answers and game performance suggest this path could be a good fit."
      }));
    
    setRecommendedPaths(sortedPaths);
    localStorage.setItem('recommendedCareerPaths', JSON.stringify(sortedPaths));
    setAssessmentType('results');
  };

  const handleStartQuestionnaire = () => {
    setCurrentQuestionIndex(0);
    setQuestionnaireAnswers({});
    setAssessmentType('questionnaire');
  };
  
  const handleAnswerSelect = (questionId, optionId) => {
    setQuestionnaireAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResults(); 
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleGameComplete = (scores) => {
    setGameScores(scores);
    calculateResults(); 
  };

  const handleRestartAssessment = () => {
    setAssessmentType('intro');
    setQuestionnaireAnswers({});
    setGameScores(null);
    setCurrentQuestionIndex(0);
    setRecommendedPaths([]);
    localStorage.removeItem('careerAssessmentAnswers');
    localStorage.removeItem('careerAssessmentGameScores');
    localStorage.removeItem('recommendedCareerPaths');
  };

  const progressPercentage = totalQuestions > 0 ? ((currentQuestionIndex) / totalQuestions) * 100 : 0;
  
  return (
    <div className="w-full flex flex-col items-center"> 
      {assessmentType === 'intro' && (
        <div className="w-full max-w-3xl">
          <Tabs defaultValue="questionnaire" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="questionnaire">
                <ListChecks className="mr-2 h-4 w-4" /> Questionnaire
              </TabsTrigger>
              <TabsTrigger value="game">
                <Gamepad2 className="mr-2 h-4 w-4" /> Whack-a-Skill
              </TabsTrigger>
            </TabsList>
            <TabsContent value="questionnaire">
              <AssessmentIntro onStartAssessment={handleStartQuestionnaire} />
            </TabsContent>
            <TabsContent value="game">
               <WhackASkillGame onGameComplete={handleGameComplete} />
            </TabsContent>
          </Tabs>
        </div>
      )}

      {assessmentType === 'questionnaire' && (
        <div className="w-full max-w-3xl">
          <QuestionCard 
            question={questions[currentQuestionIndex]}
            currentQ={currentQuestionIndex + 1}
            totalQ={totalQuestions}
            onAnswer={handleAnswerSelect}
            selectedAnswer={questionnaireAnswers[questions[currentQuestionIndex].id]}
            onNext={handleNextQuestion}
            onPrevious={handlePreviousQuestion}
            progress={progressPercentage}
          />
        </div>
      )}

      {assessmentType === 'game' && (
         <div className="w-full max-w-3xl">
            <WhackASkillGame onGameComplete={handleGameComplete} />
         </div>
      )}
      
      {assessmentType === 'results' && (
        <div className="w-full max-w-3xl">
          <ResultsCard 
            onRestart={handleRestartAssessment} 
            onBackToQuestions={() => setAssessmentType('intro')} 
            recommendedPaths={recommendedPaths} 
          />
        </div>
      )}
    </div>
  );
};

export default CareerPathAssessmentPage;