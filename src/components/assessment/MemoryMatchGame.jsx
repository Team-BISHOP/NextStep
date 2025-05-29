
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Code, Palette, Users, BarChart3, ShieldCheck, Cloud, Layers, RefreshCw, Check, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const icons = {
  'Problem Solving': Brain,
  'Coding Logic': Code,
  'Design Thinking': Palette,
  'Collaboration': Users,
  'Data Analysis': BarChart3,
  'System Security': ShieldCheck,
  'Cloud Tech': Cloud,
  'Automation': Layers,
};

const initialTiles = [
  { id: 1, type: 'Problem Solving', icon: icons['Problem Solving'], matched: false },
  { id: 2, type: 'Coding Logic', icon: icons['Coding Logic'], matched: false },
  { id: 3, type: 'Design Thinking', icon: icons['Design Thinking'], matched: false },
  { id: 4, type: 'Collaboration', icon: icons['Collaboration'], matched: false },
  { id: 5, type: 'Data Analysis', icon: icons['Data Analysis'], matched: false },
  { id: 6, type: 'System Security', icon: icons['System Security'], matched: false },
  { id: 7, type: 'Cloud Tech', icon: icons['Cloud Tech'], matched: false },
  { id: 8, type: 'Automation', icon: icons['Automation'], matched: false },
];

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const MemoryMatchGame = ({ onGameComplete }) => {
  const [tiles, setTiles] = useState([]);
  const [flippedTiles, setFlippedTiles] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const totalPairs = initialTiles.length;

  const initializeGame = () => {
    const gameTiles = shuffleArray([...initialTiles, ...initialTiles].map((tile, index) => ({ ...tile, uniqueId: index })));
    setTiles(gameTiles);
    setFlippedTiles([]);
    setMatchedPairs(0);
    setMoves(0);
    setIsChecking(false);
    setGameStarted(true);
    setShowInstructions(false);
  };

  useEffect(() => {
    if (gameStarted && matchedPairs === totalPairs) {
      const scores = {};
      tiles.filter(t => t.matched).forEach(t => {
        scores[t.type] = (scores[t.type] || 0) + 1; 
      });
      onGameComplete(scores, moves);
    }
  }, [matchedPairs, gameStarted, onGameComplete, tiles, totalPairs, moves]);

  const handleTileClick = (tile) => {
    if (isChecking || flippedTiles.length === 2 || tile.matched || flippedTiles.find(t => t.uniqueId === tile.uniqueId)) {
      return;
    }

    const newFlippedTiles = [...flippedTiles, tile];
    setFlippedTiles(newFlippedTiles);
    setMoves(prev => prev + 1);

    if (newFlippedTiles.length === 2) {
      setIsChecking(true);
      setTimeout(() => {
        const [firstTile, secondTile] = newFlippedTiles;
        if (firstTile.type === secondTile.type) {
          setTiles(prevTiles =>
            prevTiles.map(t =>
              t.type === firstTile.type ? { ...t, matched: true } : t
            )
          );
          setMatchedPairs(prev => prev + 1);
        }
        setFlippedTiles([]);
        setIsChecking(false);
      }, 1000);
    }
  };
  
  if (showInstructions && !gameStarted) {
    return (
      <Card className="w-full max-w-lg mx-auto shadow-xl dark:bg-card">
        <CardContent className="p-6 text-center">
          <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-3">Memory Match Challenge!</h2>
          <p className="text-muted-foreground mb-6">
            Test your observation skills! Match pairs of icons related to different tech interests. 
            Your matches will help us understand your inclinations.
          </p>
          <Button onClick={initializeGame} size="lg" className="w-full">Start Game</Button>
        </CardContent>
      </Card>
    );
  }


  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4 p-3 bg-muted dark:bg-muted/50 rounded-lg">
        <div className="text-foreground">
          <span className="font-semibold">Moves:</span> {moves}
        </div>
        <div className="text-foreground">
          <span className="font-semibold">Pairs Found:</span> {matchedPairs} / {totalPairs}
        </div>
        <Button variant="outline" size="sm" onClick={initializeGame}>
          <RefreshCw className="h-4 w-4 mr-2" /> Reset
        </Button>
      </div>

      <AnimatePresence>
        <motion.div 
          layout 
          className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {tiles.map((tile) => {
            const IconComponent = tile.icon;
            const isFlipped = flippedTiles.some(ft => ft.uniqueId === tile.uniqueId) || tile.matched;
            return (
              <motion.div
                key={tile.uniqueId}
                layout
                initial={{ rotateY: 0 }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                onClick={() => handleTileClick(tile)}
                className={cn(
                  "aspect-square rounded-lg cursor-pointer flex items-center justify-center transition-all",
                  "transform-style-preserve-3d", 
                  tile.matched ? "bg-green-500/20 border-2 border-green-500 opacity-70" : "bg-secondary dark:bg-secondary/80 hover:bg-secondary/60 dark:hover:bg-secondary/60",
                )}
              >
                <div className={cn("absolute w-full h-full flex items-center justify-center backface-hidden", isFlipped && !tile.matched ? "opacity-0" : "opacity-100", tile.matched ? "opacity-0" : "opacity-100")}>
                   <HelpCircle className="h-8 w-8 text-primary/50" />
                </div>
                <div className={cn("absolute w-full h-full flex items-center justify-center backface-hidden transform rotate-y-180", isFlipped || tile.matched ? "opacity-100" : "opacity-0")}>
                  {IconComponent && <IconComponent className={cn("h-10 w-10 sm:h-12 sm:w-12", tile.matched ? "text-green-600 dark:text-green-400" : "text-primary")} />}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
      {matchedPairs === totalPairs && gameStarted && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 text-center p-4 bg-green-100 dark:bg-green-800/30 rounded-lg"
        >
          <Check className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-2" />
          <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">Congratulations!</h3>
          <p className="text-green-600 dark:text-green-400">You've matched all pairs in {moves} moves.</p>
          <p className="text-sm text-muted-foreground mt-1">Your results will be considered for path recommendations.</p>
        </motion.div>
      )}
       <style jsx global>{`
        .transform-style-preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .transform.rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default MemoryMatchGame;
