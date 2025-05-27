import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Send, User, CornerDownLeft } from 'lucide-react';

const AIChatPage = () => {
  const [messages, setMessages] = React.useState([
    { sender: 'ai', text: "Hello! I'm CareerForge AI. How can I help you today? Ask me about career paths, learning resources, or platform features." }
  ]);
  const [input, setInput] = React.useState('');
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages([...newMessages, { sender: 'ai', text: "I'm currently learning! This feature is under development. For now, explore other sections or check back later for full AI chat functionality." }]);
    }, 1000);
  };

  return (
    <motion.div
      className="h-[calc(100vh-10rem)] flex flex-col" // Adjust height based on your layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="flex-grow flex flex-col shadow-lg dark:bg-brand-gray-dark/50 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-brand-blue-default to-brand-blue-dark p-4 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <Bot className="h-8 w-8 text-white" />
            <div>
              <CardTitle className="text-2xl font-bold text-white">AI Assistant</CardTitle>
              <CardDescription className="text-blue-100 text-sm">Your personal guide for CareerForge SE.</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow overflow-y-auto p-4 space-y-4 bg-muted/20 dark:bg-muted/10">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg shadow ${
                msg.sender === 'user' 
                ? 'bg-primary text-primary-foreground rounded-br-none' 
                : 'bg-card dark:bg-brand-gray-default text-card-foreground rounded-bl-none'
              }`}>
                <div className="flex items-start space-x-2">
                  {msg.sender === 'ai' && <Bot className="h-5 w-5 flex-shrink-0 text-primary" />}
                  <p className="text-sm">{msg.text}</p>
                  {msg.sender === 'user' && <User className="h-5 w-5 flex-shrink-0 text-primary-foreground" />}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>
        
        <div className="p-4 border-t border-border bg-background dark:bg-brand-gray-dark">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-grow p-3 rounded-md border border-input bg-background focus:ring-primary focus:border-primary"
            />
            <Button onClick={handleSend} className="bg-brand-blue-default hover:bg-brand-blue-dark text-primary-foreground" size="icon">
              <Send className="h-5 w-5" />
            </Button>
          </div>
           <p className="text-xs text-muted-foreground mt-2 text-center">AI responses are simulated. Full functionality is under development.</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default AIChatPage;