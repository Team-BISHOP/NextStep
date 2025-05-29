import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Send, MessageSquare as MessageSquareHeart, Lightbulb } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient'; 

const FeedbackPage = () => {
  const { toast } = useToast();
  const [feedbackType, setFeedbackType] = useState('feedback'); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!title.trim() || !description.trim()) {
      toast({
        title: "Uh oh! Something's missing.",
        description: "Please provide a title and description.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    // Using localStorage for now
    const feedbackEntry = {
      id: Date.now().toString(), // Simple ID for local storage
      type: feedbackType,
      title,
      description,
      email: email || null,
      status: 'new',
      submittedAt: new Date().toISOString(),
    };

    try {
      const existingFeedbacks = JSON.parse(localStorage.getItem('userFeedbacks') || '[]');
      existingFeedbacks.push(feedbackEntry);
      localStorage.setItem('userFeedbacks', JSON.stringify(existingFeedbacks));

      toast({
        title: "Thank You! ✨",
        description: "Your " + feedbackType + " has been submitted successfully (Locally).",
        className: "bg-green-500 text-white dark:bg-green-600",
      });
      setTitle('');
      setDescription('');
      setEmail('');
    } catch (error) {
      console.error("Error submitting feedback to localStorage:", error);
      toast({
        title: "Submission Failed (Local)",
        description: "Could not submit your " + feedbackType + ". Please try again. " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center py-8" 
    >
      <Card className="shadow-xl w-full max-w-2xl"> 
        <CardHeader className="page-header-gradient text-primary-foreground rounded-t-lg p-6">
          <div className="flex items-center space-x-3">
            {feedbackType === 'feedback' ? <MessageSquareHeart className="h-8 w-8" /> : <Lightbulb className="h-8 w-8" />}
            <CardTitle className="text-2xl font-bold">Share Your Thoughts</CardTitle>
          </div>
          <CardDescription className="text-primary-foreground/80">
            We value your input! Help us improve NextStep.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={feedbackType === 'feedback' ? 'default' : 'outline'}
              onClick={() => setFeedbackType('feedback')}
              className="w-full"
            >
              <MessageSquareHeart className="mr-2 h-4 w-4" /> General Feedback
            </Button>
            <Button
              variant={feedbackType === 'feature' ? 'default' : 'outline'}
              onClick={() => setFeedbackType('feature')}
              className="w-full"
            >
              <Lightbulb className="mr-2 h-4 w-4" /> Feature Request
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-sm font-medium">
                Title / Summary
              </Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={feedbackType === 'feedback' ? "e.g., Issue with dashboard graphs" : "e.g., Add dark mode for project cards"}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium">
                Details
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please provide as much detail as possible..."
                required
                rows={5}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email (Optional)
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="So we can follow up if needed"
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                We'll only use this to contact you about your feedback.
              </p>
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmitting}>
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? (feedbackType === 'feedback' ? 'Submitting Feedback...' : 'Requesting Feature...') : (feedbackType === 'feedback' ? 'Submit Feedback' : 'Request Feature')}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="p-6 border-t">
          <p className="text-xs text-muted-foreground text-center w-full">
            Your feedback helps us shape the future of NextStep. Thank you for your contribution! (Data stored locally)
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default FeedbackPage;