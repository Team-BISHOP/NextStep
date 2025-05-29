import React from 'react';
import ModuleCard from './ModuleCard';
import { Milestone } from 'lucide-react';

const LearningPathModuleList = ({ modules }) => {
  if (!modules || modules.length === 0) {
    return (
      <div className="text-center py-10">
        <Milestone className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <p className="text-xl font-semibold text-foreground">Roadmap Coming Soon!</p>
        <p className="text-muted-foreground">Detailed steps for this path are currently under development. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {modules.map((module, index) => (
        <ModuleCard key={module.id} module={module} index={index} />
      ))}
    </div>
  );
};

export default LearningPathModuleList;