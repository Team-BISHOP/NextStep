import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Rss, Search, Users, Filter, Send, MessageCircle, ThumbsUp, Share2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useToast } from "@/components/ui/use-toast";

const initialTopics = [
  { id: 1, title: 'Best resources for learning Python for backend?', author: 'JaneDoe', authorAvatar: 'https://i.pravatar.cc/150?u=jane', replies: 12, views: 156, category: 'Python', date: '2025-05-26', content: 'Hey everyone, I\'m looking to dive deep into Python for backend development. Any recommendations for courses, books, or projects? Thanks!', comments: [{id:1, user: 'DevGuru', text:'Check out "Fluent Python"!', avatar: 'https://i.pravatar.cc/150?u=devguru'}] },
  { id: 2, title: 'Struggling with React state management. Help!', author: 'JohnSmith', authorAvatar: 'https://i.pravatar.cc/150?u=john', replies: 8, views: 98, category: 'React', date: '2025-05-22', content: 'I find myself confused between Context API, Redux, and Zustand. Which one is generally preferred for larger applications?', comments: [] },
  { id: 3, title: 'Showcase: My first full-stack project - "NextStep Planner"', author: 'AliceWonder', authorAvatar: 'https://i.pravatar.cc/150?u=alice', replies: 25, views: 302, category: 'Showcase', date: '2025-05-20', content: 'Super excited to share my first full-stack MERN project! It\'s a simple task planner. Feedback appreciated!', comments: [] },
];

const NewTopicForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [content, setContent] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please provide a title and content for your topic.",
      });
      return;
    }
    onSubmit({ title, category, content, author: 'GuestUser', authorAvatar: 'https://i.pravatar.cc/150?u=guest', replies: 0, views: 0, date: new Date().toISOString().split('T')[0], comments: [] });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="topicTitle" className="text-foreground">Title</Label>
        <Input id="topicTitle" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter a clear and concise title" required className="bg-background border-input" />
      </div>
      <div>
        <Label htmlFor="topicCategory" className="text-foreground">Category</Label>
        <select id="topicCategory" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 rounded-md border border-input bg-background focus:ring-primary focus:border-primary">
          <option value="General">General Discussion</option>
          <option value="Python">Python</option>
          <option value="React">React & Frontend</option>
          <option value="NodeJS">Node.js & Backend</option>
          <option value="DevOps">DevOps</option>
          <option value="Cloud">Cloud Computing</option>
          <option value="Showcase">Project Showcase</option>
          <option value="Q&A">Questions & Answers</option>
        </select>
      </div>
      <div>
        <Label htmlFor="topicContent" className="text-foreground">Content</Label>
        <Textarea id="topicContent" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Share your thoughts, questions, or project details..." rows={6} required className="bg-background border-input" />
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Send className="mr-2 h-4 w-4" /> Post Topic
        </Button>
      </DialogFooter>
    </form>
  );
};


const CommunityPage = () => {
  const [topics, setTopics] = useState(() => {
     const savedTopics = localStorage.getItem('communityTopics');
     return savedTopics ? JSON.parse(savedTopics) : initialTopics;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    localStorage.setItem('communityTopics', JSON.stringify(topics));
  }, [topics]);

  const handleAddTopic = (newTopicData) => {
    const newTopic = {
      ...newTopicData,
      id: Date.now(), 
    };
    setTopics(prev => [newTopic, ...prev]);
    setIsFormOpen(false);
    toast({
        title: "Topic Posted!",
        description: "Your new topic has been added to the forum.",
        className: "bg-primary text-primary-foreground"
    });
  };

  const filteredTopics = topics.filter(topic => 
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === 'All' || topic.category === filter)
  );

  return (
    <motion.div 
      className="space-y-6 sm:space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg dark:bg-card">
        <CardHeader className="page-header-gradient p-4 sm:p-6 rounded-t-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <Users className="h-8 w-8 sm:h-10 sm:w-10 text-primary-foreground" />
            <div>
              <CardTitle className="page-header-title">Community Forum</CardTitle>
              <CardDescription className="page-header-description">Connect, learn, and share with fellow engineers.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
            <div className="relative w-full md:flex-grow">
              <Input 
                type="text"
                placeholder="Search topics..."
                className="w-full p-3 pl-10 rounded-md border-input bg-background focus:ring-primary focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
                <select 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-3 rounded-md border border-input bg-background focus:ring-primary focus:border-primary w-full md:w-auto appearance-none"
                    title="Filter by category"
                >
                    <option value="All">All Categories</option>
                    <option value="General">General</option>
                    <option value="Python">Python</option>
                    <option value="React">React</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Showcase">Showcase</option>
                </select>
            </div>
             <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                  <MessageSquare className="mr-2 h-4 w-4" /> New Topic
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px] bg-card dark:bg-card">
                <DialogHeader>
                  <DialogTitle className="text-foreground text-xl">Create New Forum Topic</DialogTitle>
                  <DialogDescription>
                    Share your knowledge, ask questions, or start a discussion.
                  </DialogDescription>
                </DialogHeader>
                <NewTopicForm 
                  onSubmit={handleAddTopic} 
                  onCancel={() => setIsFormOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {filteredTopics.map(topic => (
              <Card key={topic.id} className="hover:shadow-md transition-shadow dark:bg-card/80">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                     <Avatar className="h-10 w-10">
                        <AvatarImage src={topic.authorAvatar} alt={topic.author} />
                        <AvatarFallback>{topic.author.substring(0,1).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-primary hover:underline cursor-pointer">{topic.title}</h3>
                        <p className="text-xs text-muted-foreground">
                        By <span className="font-medium text-foreground">{topic.author}</span> in <span className="text-accent dark:text-accent/90">{topic.category}</span> - {new Date(topic.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-foreground mt-2 truncate">{topic.content.substring(0,150)}...</p>
                    </div>
                    <div className="text-right text-xs text-muted-foreground space-y-1 flex-shrink-0">
                        <p className="flex items-center justify-end"><MessageCircle className="h-3 w-3 mr-1"/>{topic.replies} replies</p>
                        <p className="flex items-center justify-end"><Users className="h-3 w-3 mr-1"/>{topic.views} views</p>
                    </div>
                  </div>
                  <CardFooter className="p-0 pt-3 mt-3 border-t border-border/50 flex justify-between items-center">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <MessageCircle className="h-4 w-4 mr-1" /> View & Comment ({topic.comments?.length || 0})
                    </Button>
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary"><ThumbsUp className="h-4 w-4 mr-1"/> Like</Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary"><Share2 className="h-4 w-4 mr-1"/> Share</Button>
                    </div>
                  </CardFooter>
                </CardContent>
              </Card>
            ))}
            {filteredTopics.length === 0 && (
                <div className="text-center py-10">
                    <img  class="mx-auto h-24 w-24 text-muted-foreground mb-4 opacity-60" alt="Empty forum illustration" src="https://images.unsplash.com/photo-1633354931133-27ac1ee5d853" />
                    <p className="text-lg text-foreground">No topics found.</p>
                    <p className="text-sm text-muted-foreground">{searchTerm ? "Try a different search term or filter." : "Why not start a new topic?"}</p>
                </div>
            )}
          </div>
          
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CommunityPage;