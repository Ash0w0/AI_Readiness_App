import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Download, Share2, Trophy, Target, Star, Zap, ArrowLeft,
  Linkedin, Twitter, Facebook, MessageCircle, Mail, Instagram,
  Copy, Check, Home
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { TestResult } from '../types';
import html2canvas from 'html2canvas';

export function SharePage() {
  const { resultData } = useParams<{ resultData: string }>();
  const [result, setResult] = useState<TestResult | null>(null);
  const [userName, setUserName] = useState('');
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const certificateRef = useRef<HTMLDivElement>(null);

  const templates = [
    {
      id: 'achievement',
      name: 'Achievement Badge',
      gradient: 'from-purple-600 via-blue-600 to-indigo-600',
      icon: Trophy,
      style: 'modern'
    },
    {
      id: 'professional',
      name: 'Professional Card',
      gradient: 'from-slate-800 via-gray-800 to-black',
      icon: Target,
      style: 'corporate'
    },
    {
      id: 'celebration',
      name: 'Celebration',
      gradient: 'from-yellow-400 via-orange-500 to-red-500',
      icon: Star,
      style: 'festive'
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      gradient: 'from-gray-100 via-white to-gray-50',
      icon: Zap,
      style: 'clean'
    }
  ];

  const testUrl = 'https://skillscan-ai.netlify.app';

  useEffect(() => {
    if (resultData) {
      try {
        const decoded = decodeURIComponent(resultData);
        const parsed = JSON.parse(decoded);
        setResult(parsed.result);
        setUserName(parsed.userName);
      } catch (error) {
        console.error('Failed to parse result data:', error);
      }
    }
  }, [resultData]);

  useEffect(() => {
    if (result && userName) {
      generateVisualCard();
    }
  }, [result, userName, selectedTemplate]);

  const shareText = result ? `🎯 Just earned my AI Skills Certificate with ${result.percentage}% score!

🏆 I completed the SkillScan AI assessment and gained valuable insights into my AI readiness. The personalized recommendations are helping me level up my skills in this rapidly evolving field.

📊 My Results:
• Overall Score: ${result.percentage}% (${result.score}/${result.totalQuestions} correct)
• Key Strengths: ${result.strengths.slice(0, 2).join(', ') || 'Building strong foundations'}
• Growth Areas: ${result.weaknesses.slice(0, 2).join(', ') || 'Continuous improvement'}

💡 As AI transforms every industry, staying ahead of the curve is crucial. This assessment helped me identify exactly where to focus my learning journey.

🚀 Ready to test your AI knowledge? Try SkillScan AI and discover your AI readiness level: ${testUrl}

#AISkills #ProfessionalDevelopment #SkillScanAI #ArtificialIntelligence #CareerGrowth #TechSkills #AIReadiness` : '';

  const generateVisualCard = async () => {
    if (!result || !userName) return;
    
    setIsCapturing(true);
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Optimized size for social media sharing
      canvas.width = 1200;
      canvas.height = 630; // Perfect for social media previews

      const template = templates[selectedTemplate];
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (template.id === 'achievement') {
        gradient.addColorStop(0, '#8B5CF6');
        gradient.addColorStop(0.5, '#3B82F6');
        gradient.addColorStop(1, '#6366F1');
      } else if (template.id === 'professional') {
        gradient.addColorStop(0, '#1E293B');
        gradient.addColorStop(0.5, '#374151');
        gradient.addColorStop(1, '#000000');
      } else if (template.id === 'celebration') {
        gradient.addColorStop(0, '#FBBF24');
        gradient.addColorStop(0.5, '#F97316');
        gradient.addColorStop(1, '#EF4444');
      } else {
        gradient.addColorStop(0, '#F1F5F9');
        gradient.addColorStop(0.5, '#FFFFFF');
        gradient.addColorStop(1, '#F8FAFC');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add decorative elements
      ctx.globalAlpha = 0.1;
      for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.arc(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * 100 + 20,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = template.id === 'minimalist' ? '#6366F1' : '#FFFFFF';
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Add main content
      ctx.fillStyle = template.id === 'minimalist' ? '#1E293B' : '#FFFFFF';
      
      // Title
      ctx.font = 'bold 56px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SkillScan AI Certificate', canvas.width / 2, 100);

      // Large score display
      ctx.font = 'bold 140px Inter, sans-serif';
      ctx.fillText(`${result.percentage}%`, canvas.width / 2, 280);

      // User name
      ctx.font = 'bold 36px Inter, sans-serif';
      ctx.fillText(userName, canvas.width / 2, 340);

      // Achievement details
      ctx.font = '28px Inter, sans-serif';
      ctx.fillText(`AI Skills Assessment • ${result.score}/${result.totalQuestions} correct`, canvas.width / 2, 380);

      // Strengths (if any)
      if (result.strengths.length > 0) {
        ctx.font = '24px Inter, sans-serif';
        ctx.fillText(`Strong in: ${result.strengths.slice(0, 2).join(', ')}`, canvas.width / 2, 420);
      }

      // Call to action with URL
      ctx.font = 'bold 26px Inter, sans-serif';
      ctx.fillStyle = template.id === 'minimalist' ? '#64748B' : 'rgba(255, 255, 255, 0.9)';
      ctx.fillText('Test your AI skills at:', canvas.width / 2, 480);
      
      ctx.font = 'bold 32px Inter, sans-serif';
      ctx.fillStyle = template.id === 'minimalist' ? '#3B82F6' : '#FFD700';
      ctx.fillText('skillscan-ai.netlify.app', canvas.width / 2, 520);

      // Bottom tagline
      ctx.font = '20px Inter, sans-serif';
      ctx.fillStyle = template.id === 'minimalist' ? '#64748B' : 'rgba(255, 255, 255, 0.8)';
      ctx.fillText('Unlock your AI potential • Professional Assessment', canvas.width / 2, 580);

      const dataUrl = canvas.toDataURL('image/png');
      setScreenshot(dataUrl);
    } catch (error) {
      console.error('Failed to generate visual card:', error);
    } finally {
      setIsCapturing(false);
    }
  };

  const downloadScreenshot = () => {
    if (screenshot) {
      const link = document.createElement('a');
      link.download = `skillscan-ai-certificate-${userName.replace(/\s+/g, '-').toLowerCase()}-${result?.percentage}percent.png`;
      link.href = screenshot;
      link.click();
    }
  };

  const shareOnPlatform = (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const currentUrl = window.location.href;
    
    const urls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}&summary=${encodedText}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodeURIComponent(currentUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodedText}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodeURIComponent(currentUrl)}`,
      instagram: `https://www.instagram.com/`,
      email: `mailto:?subject=${encodeURIComponent('My AI Skills Assessment Results')}&body=${encodedText}%0A%0A${encodeURIComponent(currentUrl)}`
    };
    
    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
  };

  const copyToClipboard = async (text?: string) => {
    try {
      const textToCopy = text || shareText;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const handleBack = () => {
    window.history.pushState(null, '', '/results');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleHome = () => {
    window.history.pushState(null, '', '/test-selection');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return '🏆';
    if (score >= 80) return '🥇';
    if (score >= 70) return '🥈';
    if (score >= 60) return '🥉';
    return '🎯';
  };

  const getScoreTitle = (score: number) => {
    if (score >= 90) return 'AI Expert';
    if (score >= 80) return 'AI Proficient';
    if (score >= 70) return 'AI Competent';
    if (score >= 60) return 'AI Learner';
    return 'AI Explorer';
  };

  if (!result || !userName) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading certificate...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <AnimatedButton
              variant="secondary"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Results
            </AnimatedButton>
            <AnimatedButton
              variant="ghost"
              onClick={handleHome}
              className="flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              Home
            </AnimatedButton>
          </div>
        </motion.div>

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl">
              <Share2 className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Share Your Achievement</h1>
          <p className="text-gray-300 text-lg">Your AI skills certificate is ready to share with the world!</p>
        </motion.div>

        {/* Achievement Banner */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <GlassCard className="p-6 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{getScoreEmoji(result.percentage)}</div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{getScoreTitle(result.percentage)}</h3>
                  <p className="text-purple-300 text-lg">You scored {result.percentage}% on your AI assessment!</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-white">{result.percentage}%</div>
                <div className="text-gray-300">{result.score}/{result.totalQuestions} correct</div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Certificate Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Your Shareable Certificate</h3>
            
            {isCapturing ? (
              <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
                />
                <p className="text-gray-400">Creating your certificate...</p>
              </div>
            ) : screenshot ? (
              <div className="text-center">
                <img
                  src={screenshot}
                  alt="AI Skills Certificate"
                  className="max-w-full h-auto rounded-xl border border-white/20 shadow-2xl mx-auto mb-6"
                  style={{ maxHeight: '400px' }}
                />
                <div className="flex justify-center gap-4">
                  <AnimatedButton
                    variant="secondary"
                    onClick={downloadScreenshot}
                    className="flex items-center gap-2"
                    size="sm"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </AnimatedButton>
                  <AnimatedButton
                    variant="secondary"
                    onClick={() => copyToClipboard()}
                    className="flex items-center gap-2"
                    size="sm"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy Text'}
                  </AnimatedButton>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                <Share2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">Certificate not available</p>
                <AnimatedButton
                  variant="secondary"
                  onClick={generateVisualCard}
                  size="sm"
                >
                  Generate Certificate
                </AnimatedButton>
              </div>
            )}
          </GlassCard>
        </motion.div>

        {/* Social Media Sharing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Share on Social Media</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { platform: 'linkedin', icon: Linkedin, color: 'hover:bg-blue-600', label: 'LinkedIn' },
                { platform: 'twitter', icon: Twitter, color: 'hover:bg-blue-400', label: 'Twitter' },
                { platform: 'facebook', icon: Facebook, color: 'hover:bg-blue-700', label: 'Facebook' },
                { platform: 'whatsapp', icon: MessageCircle, color: 'hover:bg-green-600', label: 'WhatsApp' },
                { platform: 'instagram', icon: Instagram, color: 'hover:bg-pink-600', label: 'Instagram' },
                { platform: 'email', icon: Mail, color: 'hover:bg-gray-600', label: 'Email' }
              ].map((social, index) => (
                <motion.button
                  key={social.platform}
                  onClick={() => shareOnPlatform(social.platform)}
                  className={`p-4 bg-white/10 rounded-xl border border-white/20 transition-all ${social.color} group flex flex-col items-center gap-2 hover:scale-105`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <social.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                  <span className="text-white text-sm font-medium">{social.label}</span>
                </motion.button>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                💡 This page will show your certificate image when shared on social platforms!
              </p>
            </div>
          </GlassCard>
        </motion.div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}