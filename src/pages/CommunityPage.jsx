import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Rss, Search, Users, Filter } from 'lucide-react';

const mockTopics = [
  { id: 1, title: 'Best resources for learning Python for backend?', author: 'JaneDoe', replies: 12, views: 156, category: 'Python', date: '2 days ago' },
  { id: 2, title: 'Struggling with React state management. Help!', author: 'JohnSmith', replies: 8, views: 98, category: 'React', date: '5 days ago' },
  { id: 3, title: 'Showcase: My first full-stack project', author: 'AliceWonder', replies: 25, views: 302, category: 'Showcase', date: '1 week ago' },
  { id: 4, title: 'Tips for acing a DevOps interview?', author: 'BobBuilder', replies: 5, views: 77, category: 'DevOps', date: '10 days ago' },
];

const CommunityPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filter, setFilter] = React.useState('All');

  const filteredTopics = mockTopics.filter(topic => 
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === 'All' || topic.category === filter)
  );

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
            <Users className="h-10 w-10 text-white" />
            <div>
              <CardTitle className="text-3xl font-bold text-white">Community Forum</CardTitle>
              <CardDescription className="text-blue-100 text-md">Connect, learn, and share with fellow engineers.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full md:w-1/2">
              <input 
                type="text"
                placeholder="Search topics..."
                className="w-full p-3 pl-10 rounded-md border border-input bg-background focus:ring-primary focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <select 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-3 rounded-md border border-input bg-background focus:ring-primary focus:border-primary w-full md:w-auto"
                >
                    <option value="All">All Categories</option>
                    <option value="Python">Python</option>
                    <option value="React">React</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Showcase">Showcase</option>
                    <option value="General">General</option>
                </select>
            </div>
            <Button className="w-full md:w-auto bg-brand-blue-default hover:bg-brand-blue-dark text-primary-foreground">
              <MessageSquare className="mr-2 h-4 w-4" /> New Topic
            </Button>
          </div>

          {/* Forum Topics List - Placeholder for now */}
          <div className="space-y-4">
            {filteredTopics.map(topic => (
              <Card key={topic.id} className="hover:shadow-md transition-shadow dark:bg-brand-gray-default/30">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-primary hover:underline cursor-pointer">{topic.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      By <span className="font-medium text-foreground">{topic.author}</span> in <span className="text-primary">{topic.category}</span> - {topic.date}
                    </p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>{topic.replies} replies</p>
                    <p>{topic.views} views</p>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredTopics.length === 0 && (
                <div className="text-center py-10">
                    <img  class="mx-auto h-24 w-24 text-muted-foreground mb-4" alt="Empty forum illustration" src="https://images.unsplash.com/photo-1633354931133-27ac1ee5d853" />
                    <p className="text-lg text-foreground">No topics found for your criteria.</p>
                    <p className="text-sm text-muted-foreground">Try a different search or filter, or start a new topic!</p>
                </div>
            )}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              The community forum is currently under active development. 
              More features like user profiles, private messaging, and real-time discussions are coming soon!
            </p>
            <Button variant="link" className="mt-2">
              <Rss className="mr-2 h-4 w-4" /> Subscribe to Updates
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CommunityPage;