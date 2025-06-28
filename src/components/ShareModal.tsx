import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Download, Share2, Camera, Linkedin, Twitter, Facebook, MessageCircle, 
  Copy, Check, Trophy, Target, Star, Zap,
  Mail, Instagram
} from 'lucide-react';
import { GlassCard } from './GlassCard';
import { AnimatedButton } from './AnimatedButton';
import { TestResult } from '../types';
import html2canvas from 'html2canvas';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: TestResult;
  userName: string;
}

export function ShareModal({ isOpen, onClose, result, userName }: ShareModalProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const shareText = `🎯 Just earned my AI Skills Certificate with ${result.percentage}% score!

🏆 I completed the SkillScan AI assessment and gained valuable insights into my AI readiness. The personalized recommendations are helping me level up my skills in this rapidly evolving field.

📊 My Results:
• Overall Score: ${result.percentage}% (${result.score}/${result.totalQuestions} correct)
• Key Strengths: ${result.strengths.slice(0, 2).join(', ') || 'Building strong foundations'}
• Growth Areas: ${result.weaknesses.slice(0, 2).join(', ') || 'Continuous improvement'}

💡 As AI transforms every industry, staying ahead of the curve is crucial. This assessment helped me identify exactly where to focus my learning journey.

🚀 Ready to test your AI knowledge? Try SkillScan AI and discover your AI readiness level: ${testUrl}

#AISkills #ProfessionalDevelopment #SkillScanAI #ArtificialIntelligence #CareerGrowth #TechSkills #AIReadiness`;

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      generateVisualCard();
    }
  }, [isOpen]);

  const generateVisualCard = async () => {
    setIsCapturing(true);
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Optimized thumbnail size for social media
      canvas.width = 800;
      canvas.height = 600;

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
      for (let i = 0; i < 15; i++) {
        ctx.beginPath();
        ctx.arc(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * 80 + 15,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = template.id === 'minimalist' ? '#6366F1' : '#FFFFFF';
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Add main content - optimized for thumbnail
      ctx.fillStyle = template.id === 'minimalist' ? '#1E293B' : '#FFFFFF';
      
      // Title
      ctx.font = 'bold 48px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SkillScan AI Certificate', canvas.width / 2, 80);

      // Large score display
      ctx.font = 'bold 120px Inter, sans-serif';
      ctx.fillText(`${result.percentage}%`, canvas.width / 2, 220);

      // User name
      ctx.font = 'bold 32px Inter, sans-serif';
      ctx.fillText(userName, canvas.width / 2, 280);

      // Achievement details
      ctx.font = '24px Inter, sans-serif';
      ctx.fillText(`AI Skills Assessment • ${result.score}/${result.totalQuestions} correct`, canvas.width / 2, 320);

      // Strengths (if any)
      if (result.strengths.length > 0) {
        ctx.font = '20px Inter, sans-serif';
        ctx.fillText(`Strong in: ${result.strengths.slice(0, 2).join(', ')}`, canvas.width / 2, 360);
      }

      // Call to action with URL
      ctx.font = 'bold 22px Inter, sans-serif';
      ctx.fillStyle = template.id === 'minimalist' ? '#64748B' : 'rgba(255, 255, 255, 0.9)';
      ctx.fillText('Test your AI skills at:', canvas.width / 2, 420);
      
      ctx.font = 'bold 28px Inter, sans-serif';
      ctx.fillStyle = template.id === 'minimalist' ? '#3B82F6' : '#FFD700';
      ctx.fillText('skillscan-ai.netlify.app', canvas.width / 2, 460);

      // Bottom tagline
      ctx.font = '18px Inter, sans-serif';
      ctx.fillStyle = template.id === 'minimalist' ? '#64748B' : 'rgba(255, 255, 255, 0.8)';
      ctx.fillText('Unlock your AI potential • Professional Assessment', canvas.width / 2, 520);

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
      link.download = `skillscan-ai-certificate-${userName.replace(/\s+/g, '-').toLowerCase()}-${result.percentage}percent.png`;
      link.href = screenshot;
      link.click();
    }
  };

  const shareOnPlatform = async (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    
    // For all platforms, try to copy the image to clipboard first
    if (screenshot) {
      try {
        const response = await fetch(screenshot);
        const blob = await response.blob();
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob
          })
        ]);
        
        // Show platform-specific instructions
        const instructions = {
          linkedin: 'Certificate copied to clipboard! Paste it in your LinkedIn post along with the text.',
          twitter: 'Certificate copied to clipboard! Paste it in your tweet along with the text.',
          facebook: 'Certificate copied to clipboard! Paste it in your Facebook post along with the text.',
          whatsapp: 'Certificate copied to clipboard! You can paste it in WhatsApp along with the message.',
          instagram: 'Certificate copied to clipboard! You can paste it in your Instagram story or post.',
          email: 'Certificate copied to clipboard! You can attach it to your email.'
        };
        
        alert(instructions[platform as keyof typeof instructions] || 'Certificate copied to clipboard!');
      } catch (error) {
        console.log('Clipboard API not supported, opening platform with text only');
      }
    }
    
    // Open the respective platform
    const urls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(testUrl)}&summary=${encodedText}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(testUrl)}&quote=${encodedText}`,
      whatsapp: `https://wa.me/?text=${encodedText}`,
      instagram: `https://www.instagram.com/`,
      email: `mailto:?subject=${encodeURIComponent('My AI Skills Assessment Results')}&body=${encodedText}`
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Confetti Animation */}
        <AnimatePresence>
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-60">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-3 h-3 ${
                    i % 4 === 0 ? 'bg-yellow-400' :
                    i % 4 === 1 ? 'bg-purple-500' :
                    i % 4 === 2 ? 'bg-blue-500' : 'bg-green-500'
                  } rounded-full`}
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: -20,
                    rotate: 0,
                    scale: Math.random() * 0.8 + 0.4
                  }}
                  animate={{
                    y: window.innerHeight + 20,
                    rotate: 360,
                    x: Math.random() * window.innerWidth
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        >
          <GlassCard className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <motion.div 
                className="flex items-center gap-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                  <Share2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Share Your Achievement</h2>
                  <p className="text-gray-300 text-sm">Your AI skills certificate is ready to share</p>
                </div>
              </motion.div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors group"
              >
                <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </button>
            </div>

            {/* Achievement Banner */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <GlassCard className="p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{getScoreEmoji(result.percentage)}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{getScoreTitle(result.percentage)}</h3>
                      <p className="text-purple-300 text-sm">You scored {result.percentage}% on your AI assessment!</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">{result.percentage}%</div>
                    <div className="text-gray-300 text-sm">{result.score}/{result.totalQuestions} correct</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Template Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <h3 className="text-lg font-semibold text-white mb-3">Choose Your Certificate Style</h3>
              <div className="grid grid-cols-4 gap-3">
                {templates.map((template, index) => (
                  <motion.button
                    key={template.id}
                    onClick={() => {
                      setSelectedTemplate(index);
                      generateVisualCard();
                    }}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      selectedTemplate === index
                        ? 'border-purple-500 bg-purple-500/20 glow-border'
                        : 'border-white/20 bg-white/5 hover:border-white/30'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-full h-12 rounded-lg bg-gradient-to-r ${template.gradient} mb-2 flex items-center justify-center`}>
                      <template.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-white font-medium text-xs">{template.name}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Generated Certificate Thumbnail */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <h3 className="text-lg font-semibold text-white mb-3">Your Shareable Certificate</h3>
              {isCapturing ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-3"
                  />
                  <p className="text-gray-400 text-sm">Creating your certificate...</p>
                </div>
              ) : screenshot ? (
                <div className="relative group">
                  <img
                    src={screenshot}
                    alt="AI Skills Certificate"
                    className="w-full max-w-md mx-auto rounded-xl border border-white/20 shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-3">
                    <AnimatedButton
                      variant="secondary"
                      onClick={downloadScreenshot}
                      className="flex items-center gap-2"
                      size="sm"
                      glowing={true}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </AnimatedButton>
                    <AnimatedButton
                      variant="secondary"
                      onClick={() => copyToClipboard()}
                      className="flex items-center gap-2"
                      size="sm"
                      glowing={true}
                    >
                      <Copy className="w-4 h-4" />
                      Copy Text
                    </AnimatedButton>
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm mb-3">No certificate available</p>
                  <AnimatedButton
                    variant="secondary"
                    onClick={generateVisualCard}
                    size="sm"
                    glowing={true}
                  >
                    Generate Certificate
                  </AnimatedButton>
                </div>
              )}
            </motion.div>

            {/* Social Media Sharing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Share Your Achievement</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
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
                    className={`p-3 bg-white/10 rounded-xl border border-white/20 transition-all ${social.color} group flex flex-col items-center gap-1 glow-border`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <social.icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    <span className="text-white text-xs font-medium">{social.label}</span>
                  </motion.button>
                ))}
              </div>
              <div className="mt-3 text-center">
                <p className="text-gray-400 text-xs">
                  💡 Tip: Certificate will be copied to clipboard - paste it along with your post!
                </p>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center gap-3 pt-4 border-t border-white/10"
            >
              <AnimatedButton
                variant="secondary"
                onClick={() => copyToClipboard()}
                className="flex items-center gap-2"
                size="sm"
                glowing={true}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Share Text'}
              </AnimatedButton>
              {screenshot && (
                <AnimatedButton
                  onClick={downloadScreenshot}
                  className="flex items-center gap-2"
                  size="sm"
                  glowing={true}
                  variant="highlight"
                >
                  <Download className="w-4 h-4" />
                  Download Certificate
                </AnimatedButton>
              )}
            </motion.div>

            <canvas ref={canvasRef} className="hidden" />
          </GlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}