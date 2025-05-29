import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Github, Link as LinkIcon, Trash2, Edit3, Eye, Filter, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label"; 
import { Textarea } from "@/components/ui/textarea"; 

const initialProjects = [
  { id: 1, name: 'My Awesome Portfolio', description: 'A personal portfolio website built with React and TailwindCSS, showcasing my skills and projects.', liveLink: 'https://example.com', repoLink: 'https://github.com/user/portfolio', dateAdded: '2025-03-10', tags: ['React', 'TailwindCSS', 'Portfolio'] },
  { id: 2, name: 'E-commerce Platform API', description: 'Backend API for an e-commerce site using Node.js, Express, and MongoDB.', repoLink: 'https://github.com/user/ecommerce-api', dateAdded: '2025-04-22', tags: ['Node.js', 'Express', 'MongoDB', 'API'] },
  { id: 3, name: 'Task Management App', description: 'A simple to-do list application with user authentication.', liveLink: 'https://tasks.example.com', dateAdded: '2025-01-15', tags: ['Frontend', 'Productivity'] },
];


const ProjectCard = ({ project, onEdit, onDelete }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="h-full flex flex-col dark:bg-card shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">{project.name}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">Added: {project.dateAdded}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-foreground mb-3 h-16 overflow-hidden text-ellipsis">{project.description || "No description provided."}</p>
        {project.tags && project.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {project.tags.map(tag => (
              <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>
        )}
        <div className="space-y-1 text-sm">
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:text-primary/80">
              <LinkIcon className="h-4 w-4 mr-1" /> Live Demo
            </a>
          )}
          {project.repoLink && (
            <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-muted-foreground hover:text-foreground">
              <Github className="h-4 w-4 mr-1" /> GitHub Repo
            </a>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 p-4 border-t">
        <Button variant="outline" size="sm" onClick={() => onEdit(project)}><Edit3 className="h-4 w-4 mr-1" /> Edit</Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(project.id)}><Trash2 className="h-4 w-4 mr-1" /> Delete</Button>
      </CardFooter>
    </Card>
  </motion.div>
);

const ProjectForm = ({ project, onSubmit, onCancel }) => {
  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description || '');
  const [liveLink, setLiveLink] = useState(project?.liveLink || '');
  const [repoLink, setRepoLink] = useState(project?.repoLink || '');
  const [tags, setTags] = useState(project?.tags?.join(', ') || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: project?.id,
      name,
      description,
      liveLink,
      repoLink,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      dateAdded: project?.dateAdded || new Date().toISOString().split('T')[0]
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="projectName" className="text-foreground">Project Name</Label>
        <Input id="projectName" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., My Awesome App" required className="bg-background" />
      </div>
      <div>
        <Label htmlFor="projectDescription" className="text-foreground">Description</Label>
        <Textarea id="projectDescription" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Briefly describe your project" className="bg-background" />
      </div>
      <div>
        <Label htmlFor="projectLiveLink" className="text-foreground">Live Demo URL</Label>
        <Input id="projectLiveLink" type="url" value={liveLink} onChange={(e) => setLiveLink(e.target.value)} placeholder="https://yourproject.live" className="bg-background" />
      </div>
      <div>
        <Label htmlFor="projectRepoLink" className="text-foreground">GitHub Repository URL</Label>
        <Input id="projectRepoLink" type="url" value={repoLink} onChange={(e) => setRepoLink(e.target.value)} placeholder="https://github.com/user/repo" className="bg-background" />
      </div>
      <div>
        <Label htmlFor="projectTags" className="text-foreground">Tags (comma-separated)</Label>
        <Input id="projectTags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g., React, API, Machine Learning" className="bg-background" />
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{project ? 'Save Changes' : 'Add Project'}</Button>
      </DialogFooter>
    </form>
  );
};


const ProjectsPage = () => {
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('userProjects');
    return savedProjects ? JSON.parse(savedProjects) : initialProjects;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  React.useEffect(() => {
    localStorage.setItem('userProjects', JSON.stringify(projects));
  }, [projects]);

  const handleAddProject = (newProjectData) => {
    const newProject = {
      ...newProjectData,
      id: Date.now(), 
    };
    setProjects(prev => [newProject, ...prev]);
    setIsFormOpen(false);
  };

  const handleEditProject = (updatedProjectData) => {
    setProjects(prev => prev.map(p => p.id === updatedProjectData.id ? updatedProjectData : p));
    setEditingProject(null);
    setIsFormOpen(false);
  };
  
  const openEditForm = (project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(prev => prev.filter(p => p.id !== projectId));
    }
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (project.tags && project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <motion.div
      className="w-full space-y-6 sm:space-y-8" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg dark:bg-card w-full">
        <CardHeader className="page-header-gradient p-4 sm:p-6 rounded-t-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div className="flex items-center space-x-3">
              <Github className="h-8 w-8 sm:h-10 sm:w-10 text-primary-foreground" />
              <div>
                <CardTitle className="page-header-title">My Projects</CardTitle>
                <CardDescription className="page-header-description">Showcase your work and track your accomplishments.</CardDescription>
              </div>
            </div>
            <Dialog open={isFormOpen} onOpenChange={(isOpen) => {
              setIsFormOpen(isOpen);
              if (!isOpen) setEditingProject(null);
            }}>
              <DialogTrigger asChild>
                <Button className="mt-3 sm:mt-0 bg-primary-foreground text-primary hover:bg-primary-foreground/90 dark:bg-background dark:text-primary dark:hover:bg-background/90">
                  <PlusCircle className="h-5 w-5 mr-2" /> {editingProject ? 'Edit Project' : 'Add New Project'}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px] bg-card dark:bg-card">
                <DialogHeader>
                  <DialogTitle className="text-foreground">{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                  <DialogDescription>
                    {editingProject ? 'Update the details of your project.' : 'Fill in the details of your new project. Connect your GitHub repo for more visibility!'}
                  </DialogDescription>
                </DialogHeader>
                <ProjectForm 
                  project={editingProject} 
                  onSubmit={editingProject ? handleEditProject : handleAddProject} 
                  onCancel={() => { setIsFormOpen(false); setEditingProject(null); }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="mb-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search projects by name, description, or tag..."
                className="w-full p-3 pl-10 rounded-md border-input bg-background focus:ring-primary focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
          </div>

          {filteredProjects.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} onEdit={openEditForm} onDelete={handleDeleteProject} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-10">
              <img  class="mx-auto h-24 w-24 sm:h-32 sm:w-32 text-muted-foreground mb-4" alt="Empty box icon indicating no projects found" src="https://images.unsplash.com/photo-1584980401975-f5109f053649" />
              <p className="text-lg sm:text-xl font-semibold text-foreground">No Projects Found</p>
              <p className="text-muted-foreground text-sm sm:text-base">
                {searchTerm ? "Try adjusting your search or filter." : "Click 'Add New Project' to get started!"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <p className="text-xs text-center text-muted-foreground">
        Tip: Keep your project list updated to reflect your latest achievements! (Data stored locally)
      </p>
    </motion.div>
  );
};

export default ProjectsPage;