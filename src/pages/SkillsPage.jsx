import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, BarChart3, CheckCircle, PlusCircle, Upload } from 'lucide-react';

// Mock data - replace with actual data later
const userSkills = [
  { name: 'JavaScript', level: 80, category: 'Programming Language' },
  { name: 'React', level: 75, category: 'Frontend Framework' },
  { name: 'Node.js', level: 60, category: 'Backend Runtime' },
  { name: 'SQL', level: 50, category: 'Database' },
];

const userProjects = [
  { name: 'Portfolio Website', status: 'Completed', link: '#', date: '2024-03-15' },
  { name: 'Todo App with React', status: 'In Progress', link: '#', date: '2024-04-20' },
];

const SkillBar = ({ name, level, category }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-foreground">{name} <span className="text-xs text-muted-foreground">({category})</span></span>
      <span className="text-sm font-medium text-primary">{level}%</span>
    </div>
    <div className="w-full bg-muted rounded-full h-2.5">
      <motion.div 
        className="bg-gradient-to-r from-brand-blue-light to-brand-blue-default h-2.5 rounded-full" 
        style={{ width: `${level}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  </div>
);


const SkillsPage = () => {
  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg dark:bg-brand-gray-dark/50">
        <CardHeader className="bg-gradient-to-r from-brand-blue-default to-brand-blue-dark p-6 rounded-t-lg">
            <div className="flex items-center space-x-3">
                <Award className="h-10 w-10 text-white" />
                <div>
                    <CardTitle className="text-3xl font-bold text-white">My Skills & Projects</CardTitle>
                    <CardDescription className="text-blue-100 text-md">Track your expertise and completed projects.</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent className="p-6 grid md:grid-cols-2 gap-8">
          {/* Skills Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-border text-foreground">My Skills</h2>
            {userSkills.length > 0 ? (
              userSkills.map(skill => <SkillBar key={skill.name} {...skill} />)
            ) : (
              <p className="text-muted-foreground">No skills added yet. Start learning to populate your skills!</p>
            )}
            <Button variant="outline" className="mt-4 w-full hover:bg-primary/10">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Detailed Skill Report (Coming Soon)
            </Button>
          </section>

          {/* Projects Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-border text-foreground">My Projects</h2>
            {userProjects.length > 0 ? (
              <ul className="space-y-3">
                {userProjects.map(project => (
                  <li key={project.name} className="p-3 border rounded-md bg-secondary/30 dark:bg-secondary/10 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-foreground">{project.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        Status: {project.status} - Added: {project.date}
                      </p>
                    </div>
                    <Button variant="link" size="sm" asChild>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No projects submitted yet.</p>
            )}
            <Button className="mt-4 w-full bg-brand-blue-default hover:bg-brand-blue-dark text-primary-foreground">
              <Upload className="mr-2 h-4 w-4" />
              Submit New Project
            </Button>
            <p className="text-xs text-center mt-2 text-muted-foreground">Feature to submit projects coming soon.</p>
          </section>
        </CardContent>
      </Card>

      <Card className="dark:bg-brand-gray-dark/50">
        <CardHeader>
          <CardTitle className="text-xl text-brand-blue-default dark:text-brand-blue-light">Skill Points & Badges</CardTitle>
          <CardDescription>Earn points and badges as you complete modules and projects.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <img  class="mx-auto h-24 w-24 text-muted-foreground mb-3" alt="Stylized trophy icon indicating achievements or points" src="https://images.unsplash.com/photo-1561580726-1bd7aed04eb0" />
          <p className="text-lg font-semibold">Total Skill Points: <span className="text-primary">1250</span></p>
          <p className="text-muted-foreground">Badges Earned: <span className="text-primary">3</span> (e.g., React Novice, JS Fundamentals)</p>
          <p className="mt-4 text-sm text-muted-foreground">Gamification features are under development. Stay tuned for more ways to showcase your achievements!</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SkillsPage;