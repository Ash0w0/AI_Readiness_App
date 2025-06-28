import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Download, Share2, Camera, Linkedin, Twitter, Facebook, MessageCircle, 
  Copy, Check, Sparkles, Trophy, Target, TrendingUp, Star, Zap,
  Globe, Mail, Instagram, Youtube, Heart, Award, Crown, Flame
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
  const [activeTab, setActiveTab] = useState<'visual' | 'text' | 'custom'>('visual');
  const [copied, setCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [customMessage, setCustomMessage] = useState('');
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

  const shareTexts = {
    linkedin: `🎯 Just earned my AI Skills Certificate with ${result.percentage}% score!

🏆 I completed the SkillScan AI assessment and gained valuable insights into my AI readiness. The personalized recommendations are helping me level up my skills in this rapidly evolving field.

📊 My Results:
• Overall Score: ${result.percentage}% (${result.score}/${result.totalQuestions} correct)
• Key Strengths: ${result.strengths.slice(0, 2).join(', ') || 'Building strong foundations'}
• Growth Areas: ${result.weaknesses.slice(0, 2).join(', ') || 'Continuous improvement'}

💡 As AI transforms every industry, staying ahead of the curve is crucial. This assessment helped me identify exactly where to focus my learning journey.

🚀 Ready to test your AI knowledge? Try SkillScan AI and discover your AI readiness level: ${testUrl}

#AISkills #ProfessionalDevelopment #SkillScanAI #ArtificialIntelligence #CareerGrowth #TechSkills #AIReadiness`,

    twitter: `🎯 Just aced my AI Skills Assessment! 

📈 Score: ${result.percentage}%
💪 Strengths: ${result.strengths.slice(0, 2).join(', ')}
🎓 Ready to level up my AI game!

Test your AI knowledge: ${testUrl}

#AISkills #TechAssessment #SkillScanAI`,

    facebook: `🎉 Exciting news! I just completed an AI Skills Assessment and earned my certificate with ${result.percentage}% score!

My results:
✅ ${result.percentage}% overall score
🌟 Strong in: ${result.strengths.join(', ') || 'Building my foundation'}
📚 Learning focus: ${result.weaknesses.join(', ') || 'Continuous growth'}

The future is AI-powered, and I'm committed to staying ahead of the curve! 🚀

Want to test your AI readiness? Check out: ${testUrl}

#AILearning #ProfessionalGrowth #SkillScanAI`,

    whatsapp: `🎯 Hey! Just took this amazing AI skills test and got ${result.percentage}%! 

Really eye-opening to see where I stand with AI knowledge. The personalized recommendations are spot-on 👌

Check out SkillScan AI if you want to assess your AI readiness too: ${testUrl}`,

    email: `Subject: My AI Skills Assessment Results - ${result.percentage}% Score!

Hi there!

I wanted to share my recent AI Skills Assessment results with you. I scored ${result.percentage}% and gained valuable insights into my AI knowledge and areas for growth.

Key highlights:
• Overall Score: ${result.score} out of ${result.totalQuestions} questions correct
• Strengths: ${result.strengths.join(', ') || 'Building foundation'}
• Areas to develop: ${result.weaknesses.join(', ') || 'Continuous learning'}

The assessment provided personalized learning recommendations that I'm excited to explore. As AI becomes increasingly important in our field, I think this kind of skills evaluation could be valuable for our team too.

You can try it yourself at: ${testUrl}

Best regards,
${userName}`
  };

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
      // Create a visual card programmatically
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 1200;
      canvas.height = 630; // Optimal for social media

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
      ctx.font = 'bold 72px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SkillScan AI', canvas.width / 2, 120);

      ctx.font = 'bold 120px Inter, sans-serif';
      ctx.fillText(`${result.percentage}%`, canvas.width / 2, 280);

      ctx.font = '36px Inter, sans-serif';
      ctx.fillText(`${userName} • AI Skills Certificate`, canvas.width / 2, 340);

      ctx.font = '28px Inter, sans-serif';
      ctx.fillText(`${result.score}/${result.totalQuestions} questions correct`, canvas.width / 2, 390);

      if (result.strengths.length > 0) {
        ctx.fillText(`Strengths: ${result.strengths.slice(0, 2).join(', ')}`, canvas.width / 2, 450);
      }

      ctx.font = '24px Inter, sans-serif';
      ctx.fillStyle = template.id === 'minimalist' ? '#64748B' : 'rgba(255, 255, 255, 0.8)';
      ctx.fillText('Unlock your AI potential • SkillScan AI', canvas.width / 2, 550);

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
    const text = shareTexts[platform as keyof typeof shareTexts];
    const encodedText = encodeURIComponent(text);
    
    if (platform === 'linkedin') {
      // For LinkedIn, we'll use the native sharing with both image and text
      if (screenshot) {
        // First, try to copy the image to clipboard
        try {
          const response = await fetch(screenshot);
          const blob = await response.blob();
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob
            })
          ]);
          
          // Show a message to the user
          alert('Certificate image copied to clipboard! You can paste it in your LinkedIn post along with the text.');
        } catch (error) {
          console.log('Clipboard API not supported, opening LinkedIn with text only');
        }
      }
      
      // Open LinkedIn with the text
      const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(testUrl)}&summary=${encodedText}`;
      window.open(linkedinUrl, '_blank', 'width=600,height=400');
    } else {
      const urls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodeURIComponent(testUrl)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(testUrl)}&quote=${encodedText}`,
        whatsapp: `https://wa.me/?text=${encodedText}`,
        instagram: `https://www.instagram.com/`, // Instagram doesn't support direct sharing
        email: `mailto:?subject=${encodeURIComponent('My AI Skills Assessment Results')}&body=${encodedText}`
      };
      
      if (platform === 'instagram') {
        // For Instagram, we'll copy the text and open Instagram
        copyToClipboard(text);
        window.open(urls.instagram, '_blank');
      } else {
        window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
      }
    }
  };

  const copyToClipboard = async (text?: string) => {
    try {
      const textToCopy = text || shareTexts.linkedin;
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
          className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
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
                  <p className="text-gray-300 text-sm">Celebrate your AI skills assessment results</p>
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

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {[
                { id: 'visual', label: 'Certificate', icon: Camera },
                { id: 'text', label: 'Share Text', icon: MessageCircle },
                { id: 'custom', label: 'Custom', icon: Sparkles }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all text-sm ${
                    activeTab === tab.id
                      ? 'bg-purple-500 text-white shadow-lg glow-border'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'visual' && (
                <motion.div
                  key="visual"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {/* Template Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Choose Your Style</h3>
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
                  </div>

                  {/* Generated Visual */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Your Certificate</h3>
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
                          alt="Achievement Certificate"
                          className="w-full rounded-xl border border-white/20 shadow-2xl"
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
                  </div>

                  <canvas ref={canvasRef} className="hidden" />
                </motion.div>
              )}

              {activeTab === 'text' && (
                <motion.div
                  key="text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Platform Messages</h3>
                    <div className="grid gap-3">
                      {Object.entries(shareTexts).slice(0, 3).map(([platform, text]) => (
                        <motion.div
                          key={platform}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * Object.keys(shareTexts).indexOf(platform) }}
                        >
                          <GlassCard className="p-3">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-white capitalize flex items-center gap-2 text-sm">
                                {platform === 'linkedin' && <Linkedin className="w-4 h-4 text-blue-500" />}
                                {platform === 'twitter' && <Twitter className="w-4 h-4 text-blue-400" />}
                                {platform === 'facebook' && <Facebook className="w-4 h-4 text-blue-600" />}
                                {platform}
                              </h4>
                              <AnimatedButton
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(text)}
                                className="flex items-center gap-1 text-xs"
                                glowing={true}
                              >
                                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                {copied ? 'Copied!' : 'Copy'}
                              </AnimatedButton>
                            </div>
                            <div className="bg-white/5 rounded-lg p-2 max-h-20 overflow-y-auto">
                              <pre className="text-gray-300 text-xs whitespace-pre-wrap font-sans">
                                {text.slice(0, 200)}...
                              </pre>
                            </div>
                          </GlassCard>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'custom' && (
                <motion.div
                  key="custom"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Custom Message</h3>
                    <GlassCard className="p-4">
                      <textarea
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        placeholder={`Write your custom message here... 

You can include:
• Your score: ${result.percentage}%
• Your strengths: ${result.strengths.join(', ')}
• Personal insights`}
                        className="w-full h-32 bg-white/5 border border-white/20 rounded-xl p-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      />
                      <div className="flex justify-between items-center mt-3">
                        <div className="text-gray-400 text-xs">
                          {customMessage.length} characters
                        </div>
                        <AnimatedButton
                          variant="secondary"
                          onClick={() => copyToClipboard(customMessage)}
                          disabled={!customMessage.trim()}
                          className="flex items-center gap-2"
                          size="sm"
                          glowing={!!customMessage.trim()}
                        >
                          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          {copied ? 'Copied!' : 'Copy'}
                        </AnimatedButton>
                      </div>
                    </GlassCard>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Social Media Sharing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
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
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <social.icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    <span className="text-white text-xs font-medium">{social.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex justify-center gap-3 mt-6 pt-4 border-t border-white/10"
            >
              <AnimatedButton
                variant="secondary"
                onClick={() => copyToClipboard()}
                className="flex items-center gap-2"
                size="sm"
                glowing={true}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Text'}
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
          </GlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}