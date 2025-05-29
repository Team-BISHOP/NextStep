import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Brain, Code, Palette, Users, BarChart3, ShieldCheck, Cloud, Layers, RefreshCw, Check, HelpCircle, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

const skillIcons = {
  'Problem Solving': Brain,
  'Coding Logic': Code,
  'Design Thinking': Palette,
  'Collaboration': Users,
  'Data Analysis': BarChart3,
  'System Security': ShieldCheck,
  'Cloud Tech': Cloud,
  'Automation': Layers,
};

const skills = Object.keys(skillIcons);
const GRID_SIZE = 9; // 3x3 grid
const GAME_DURATION = 30; // seconds
const MAX_ACTIVE_TILES = 3; // Max tiles active at once
const TILE_LIFESPAN = 2500; // ms

const WhackASkillGame = ({ onGameComplete }) => {
  const [activeTiles, setActiveTiles] = useState([]); // { index: number, skill: string, id: number }
  const [scores, setScores] = useState({});
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [whackedEffects, setWhackedEffects] = useState([]); // { id: number, x: number, y: number }

  const resetGame = useCallback(() => {
    setActiveTiles([]);
    setScores(skills.reduce((acc, skill) => ({ ...acc, [skill]: 0 }), {}));
    setTimeLeft(GAME_DURATION);
    setGameStarted(false);
    setShowInstructions(true);
    setWhackedEffects([]);
  }, []);

  useEffect(() => {
    if (!gameStarted || timeLeft <= 0) {
      if (gameStarted && timeLeft <= 0) { // Ensure game was actually played
        onGameComplete(scores);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, timeLeft, onGameComplete, scores]);


  useEffect(() => {
    if (!gameStarted || timeLeft <= 0) return;

    const manageTiles = setInterval(() => {
      // Remove old tiles
      setActiveTiles(currentTiles => currentTiles.filter(tile => Date.now() - tile.spawnTime < TILE_LIFESPAN));
      
      // Add new tiles if needed
      if (activeTiles.length < MAX_ACTIVE_TILES) {
        const availableIndices = Array.from({ length: GRID_SIZE }, (_, i) => i)
          .filter(index => !activeTiles.some(t => t.index === index));
        
        if (availableIndices.length > 0) {
          const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
          const randomSkill = skills[Math.floor(Math.random() * skills.length)];
          setActiveTiles(currentTiles => [
            ...currentTiles,
            { index: randomIndex, skill: randomSkill, id: Date.now(), spawnTime: Date.now() }
          ]);
        }
      }
    }, 500); // Check and update tiles more frequently

    return () => clearInterval(manageTiles);
  }, [gameStarted, timeLeft, activeTiles]);


  const handleTileWhack = (tile, event) => {
    if (!gameStarted || timeLeft <= 0) return;

    setScores(prevScores => ({
      ...prevScores,
      [tile.skill]: (prevScores[tile.skill] || 0) + 1,
    }));
    setActiveTiles(prevTiles => prevTiles.filter(t => t.id !== tile.id));

    // Add visual effect
    const rect = event.currentTarget.getBoundingClientRect();
    const effectId = Date.now();
    setWhackedEffects(prev => [...prev, { id: effectId, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }]);
    setTimeout(() => {
      setWhackedEffects(prev => prev.filter(e => e.id !== effectId));
    }, 500);
  };
  
  const startGame = () => {
    resetGame(); // Ensure clean state
    setGameStarted(true);
    setShowInstructions(false);
    setTimeLeft(GAME_DURATION); // Explicitly set time left on start
    setScores(skills.reduce((acc, skill) => ({ ...acc, [skill]: 0 }), {})); // Reset scores
  };

  if (showInstructions && !gameStarted) {
    return (
      <Card className="w-full max-w-lg mx-auto shadow-xl dark:bg-card">
        <CardHeader className="text-center">
          <Target className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-2xl font-semibold text-foreground">Whack-a-Skill Challenge!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <CardDescription className="text-muted-foreground mb-6">
            Skills will pop up randomly. Click on the ones that interest you the most before they disappear!
            Your choices help us understand your preferences. You have {GAME_DURATION} seconds.
          </CardDescription>
          <Button onClick={startGame} size="lg" className="w-full">Start Game</Button>
        </CardContent>
      </Card>
    );
  }

  if (!gameStarted && timeLeft <= 0) { // Game finished, show summary before onGameComplete takes over
     return (
      <Card className="w-full max-w-lg mx-auto shadow-xl dark:bg-card text-center">
        <CardHeader>
          <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl font-semibold text-green-600">Time's Up!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">Great job! Your skill preferences have been noted.</p>
          <p className="text-sm text-muted-foreground">The assessment will now calculate your results.</p>
          {/* onGameComplete is called by useEffect when timeLeft hits 0 */}
        </CardContent>
      </Card>
    );
  }


  return (
    <div className="w-full max-w-xl mx-auto p-4 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-4 p-3 bg-muted dark:bg-muted/50 rounded-lg">
        <div className="text-lg font-semibold text-primary">Time: {timeLeft}s</div>
        <Button variant="outline" size="sm" onClick={resetGame}>
          <RefreshCw className="h-4 w-4 mr-2" /> Reset
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full aspect-square max-w-md bg-background dark:bg-card p-3 rounded-lg shadow-inner">
        {Array.from({ length: GRID_SIZE }).map((_, index) => {
          const activeTile = activeTiles.find(t => t.index === index);
          const IconComponent = activeTile ? skillIcons[activeTile.skill] : null;
          return (
            <motion.div
              key={index}
              className={cn(
                "aspect-square rounded-lg border-2 border-dashed border-muted flex items-center justify-center cursor-pointer relative overflow-hidden",
                "bg-secondary/30 dark:bg-secondary/20"
              )}
              onClick={(e) => activeTile && handleTileWhack(activeTile, e)}
            >
              <AnimatePresence>
                {activeTile && IconComponent && (
                  <motion.div
                    key={activeTile.id}
                    initial={{ scale: 0.5, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0, opacity: 0, y: -20, transition: { duration: 0.2 } }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="p-2"
                  >
                    <IconComponent className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      
      {/* Whacked effects */}
      {whackedEffects.map(effect => (
        <motion.div
          key={effect.id}
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 0, scale: 3 }}
          transition={{ duration: 0.5 }}
          className="absolute rounded-full w-12 h-12 bg-primary/30 pointer-events-none"
          style={{ left: effect.x - 24, top: effect.y - 24 }} 
        />
      ))}

      {timeLeft <= 0 && gameStarted && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 text-center p-4 bg-green-100 dark:bg-green-800/30 rounded-lg w-full"
        >
          <Check className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-2" />
          <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">Time's Up!</h3>
          <p className="text-green-600 dark:text-green-400">Your skill preferences have been recorded.</p>
        </motion.div>
      )}
    </div>
  );
};

export default WhackASkillGame;