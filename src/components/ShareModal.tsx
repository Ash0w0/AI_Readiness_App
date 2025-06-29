import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Download, Share2, Camera, Linkedin, Twitter, Facebook, MessageCircle, 
  Copy, Check, Trophy, Target, Star, Zap,
  Mail, Instagram, Smartphone
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
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  // Platform-specific share texts
  const platformTexts = {
    linkedin: `🎯 Just earned my AI Skills Certificate with ${result.percentage}% score!

🏆 I completed the SkillScan AI assessment and gained valuable insights into my AI readiness. The personalized recommendations are helping me level up my skills in this rapidly evolving field.

📊 My Results:
• Overall Score: ${result.percentage}% (${result.score}/${result.totalQuestions} correct)
• Key Strengths: ${result.strengths.slice(0, 2).join(', ') || 'Building strong foundations'}

💡 As AI transforms every industry, staying ahead of the curve is crucial. This assessment helped me identify exactly where to focus my learning journey.

🚀 Ready to test your AI knowledge? Try SkillScan AI: ${testUrl}

#AISkills #ProfessionalDevelopment #SkillScanAI #ArtificialIntelligence #CareerGrowth`,

    twitter: `🎯 Just earned my AI Skills Certificate with ${result.percentage}% score! 🏆

Completed @SkillScanAI assessment - gained valuable insights into my AI readiness.

📊 Score: ${result.percentage}% (${result.score}/${result.totalQuestions} correct)
💪 Strengths: ${result.strengths.slice(0, 1).join(', ') || 'Building foundations'}

🚀 Test your AI knowledge: ${testUrl}

#AISkills #SkillScanAI #AI`,

    whatsapp: `🎯 Hey! Just earned my AI Skills Certificate with ${result.percentage}% score! 🏆

I completed the SkillScan AI assessment and it's amazing - got personalized insights into my AI readiness.

My Results:
• Score: ${result.percentage}% (${result.score}/${result.totalQuestions} correct)
• Strengths: ${result.strengths.slice(0, 2).join(', ') || 'Building strong foundations'}

You should try it too! It really helps identify where to focus your AI learning journey.

Check it out: ${testUrl}`,

    facebook: shareText,
    instagram: `🎯 Just earned my AI Skills Certificate with ${result.percentage}% score! 🏆

Completed the SkillScan AI assessment and gained valuable insights into my AI readiness.

Score: ${result.percentage}% (${result.score}/${result.totalQuestions} correct)
Strengths: ${result.strengths.slice(0, 2).join(', ') || 'Building strong foundations'}

Ready to test your AI knowledge? Try SkillScan AI: ${testUrl}

#AISkills #SkillScanAI #AI #ProfessionalDevelopment`,

    email: `Subject: My AI Skills Assessment Results - ${result.percentage}% Score!

${shareText}`
  };

  useEffect(() => {
    // Detect if user is on mobile
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    
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

      // Optimized size for social media sharing
      canvas.width = 1080;
      canvas.height = 1080;

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#8B5CF6');
      gradient.addColorStop(0.5, '#3B82F6');
      gradient.addColorStop(1, '#6366F1');

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
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Add main content
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      
      // Title
      ctx.font = 'bold 64px Inter, sans-serif';
      ctx.fillText('SkillScan AI Certificate', canvas.width / 2, 150);

      // Large score display
      ctx.font = 'bold 180px Inter, sans-serif';
      ctx.fillText(`${result.percentage}%`, canvas.width / 2, 350);

      // User name
      ctx.font = 'bold 48px Inter, sans-serif';
      ctx.fillText(userName, canvas.width / 2, 420);

      // Achievement details
      ctx.font = '36px Inter, sans-serif';
      ctx.fillText(`AI Skills Assessment • ${result.score}/${result.totalQuestions} correct`, canvas.width / 2, 480);

      // Strengths (if any)
      if (result.strengths.length > 0) {
        ctx.font = '28px Inter, sans-serif';
        ctx.fillText(`Strong in: ${result.strengths.slice(0, 2).join(', ')}`, canvas.width / 2, 540);
      }

      // Call to action with URL
      ctx.font = 'bold 32px Inter, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillText('Test your AI skills at:', canvas.width / 2, 650);
      
      ctx.font = 'bold 40px Inter, sans-serif';
      ctx.fillStyle = '#FFD700';
      ctx.fillText('skillscan-ai.netlify.app', canvas.width / 2, 710);

      // Bottom tagline
      ctx.font = '24px Inter, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillText('Unlock your AI potential • Professional Assessment', canvas.width / 2, 800);

      // Add trophy icon area
      ctx.font = '120px Arial';
      ctx.fillText('🏆', canvas.width / 2, 950);

      const dataUrl = canvas.toDataURL('image/png', 0.9);
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
    if (!screenshot) {
      alert('Certificate is still generating. Please wait a moment.');
      return;
    }

    try {
      // Convert screenshot to blob
      const response = await fetch(screenshot);
      const blob = await response.blob();
      const file = new File([blob], `skillscan-ai-certificate-${result.percentage}percent.png`, { type: 'image/png' });
      
      const platformText = platformTexts[platform as keyof typeof platformTexts] || shareText;

      // Try Web Share API first (works best on mobile)
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: `My AI Skills Certificate - ${result.percentage}% Score`,
            text: platformText,
            files: [file]
          });
          setShareSuccess(`Successfully shared to ${platform}!`);
          setTimeout(() => setShareSuccess(null), 3000);
          return;
        } catch (shareError) {
          if (shareError instanceof Error && shareError.name !== 'AbortError') {
            console.log('Web Share API failed, trying platform-specific approach');
          } else {
            return; // User cancelled
          }
        }
      }

      // Platform-specific sharing approaches
      switch (platform) {
        case 'linkedin':
          // Copy content to clipboard
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob,
              'text/plain': new Blob([platformText], { type: 'text/plain' })
            })
          ]);
          
          // Open LinkedIn sharing interface
          const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(testUrl)}`;
          window.open(linkedinUrl, '_blank', 'width=600,height=600');
          
          setShareSuccess('📋 Content copied! Paste in the LinkedIn post that just opened.');
          break;

        case 'twitter':
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob,
              'text/plain': new Blob([platformText], { type: 'text/plain' })
            })
          ]);
          
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(platformText)}`;
          window.open(twitterUrl, '_blank', 'width=600,height=400');
          
          setShareSuccess('📋 Content copied! Add the image to the tweet that just opened.');
          break;

        case 'whatsapp':
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob,
              'text/plain': new Blob([platformText], { type: 'text/plain' })
            })
          ]);
          
          if (isMobile) {
            // On mobile, try to open WhatsApp app
            window.open(`whatsapp://send?text=${encodeURIComponent(platformText)}`, '_blank');
          } else {
            // On desktop, open WhatsApp Web
            window.open('https://web.whatsapp.com/', '_blank');
          }
          
          setShareSuccess('📋 Content copied! Paste in WhatsApp chat and add the image.');
          break;

        case 'facebook':
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob,
              'text/plain': new Blob([platformText], { type: 'text/plain' })
            })
          ]);
          
          const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(testUrl)}`;
          window.open(facebookUrl, '_blank', 'width=600,height=600');
          
          setShareSuccess('📋 Content copied! Paste in the Facebook post that just opened.');
          break;

        case 'instagram':
          // Instagram doesn't support direct web sharing, so we'll copy and give instructions
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob,
              'text/plain': new Blob([platformText], { type: 'text/plain' })
            })
          ]);
          
          if (isMobile) {
            // Try to open Instagram app
            window.open('instagram://camera', '_blank');
          } else {
            window.open('https://www.instagram.com/', '_blank');
          }
          
          setShareSuccess('📋 Content copied! Create a new Instagram post and paste the image and caption.');
          break;

        case 'email':
          await navigator.clipboard.writeText(platformText);
          
          const emailUrl = `mailto:?subject=${encodeURIComponent('My AI Skills Assessment Results')}&body=${encodeURIComponent(platformText)}`;
          window.open(emailUrl, '_blank');
          
          setShareSuccess('📧 Email opened with content! Download and attach the certificate image.');
          break;

        default:
          // Fallback: copy to clipboard
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob,
              'text/plain': new Blob([platformText], { type: 'text/plain' })
            })
          ]);
          setShareSuccess('📋 Content copied to clipboard!');
      }

      setTimeout(() => setShareSuccess(null), 5000);
      
    } catch (error) {
      console.error('Sharing failed:', error);
      
      // Final fallback - download image and copy text
      downloadScreenshot();
      try {
        await navigator.clipboard.writeText(platformText);
        setShareSuccess('📥 Certificate downloaded and text copied! Upload manually to your platform.');
      } catch {
        setShareSuccess('📥 Certificate downloaded! Please copy text and upload manually.');
      }
      setTimeout(() => setShareSuccess(null), 5000);
    }
  };

  const copyToClipboard = async (text?: string) => {
    try {
      const textToCopy = text || shareText;
      await navigator.clipboard.writeText(textToCopy);
      setShareSuccess('📋 Text copied to clipboard!');
      setTimeout(() => setShareSuccess(null), 2000);
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
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
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
                  <p className="text-gray-300 text-sm flex items-center gap-1">
                    {isMobile && <Smartphone className="w-4 h-4" />}
                    Your AI skills certificate is ready to share
                  </p>
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

            {/* Generated Certificate Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
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
                    className="w-full max-w-sm mx-auto rounded-xl border border-white/20 shadow-2xl"
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
            </motion.div>

            {/* Social Media Sharing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
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
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <social.icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    <span className="text-white text-xs font-medium">{social.label}</span>
                  </motion.button>
                ))}
              </div>
              <div className="mt-3 text-center">
                <p className="text-gray-400 text-xs">
                  {isMobile 
                    ? '📱 Mobile: Native sharing available! Desktop: Content copied for easy pasting.'
                    : '💻 Click to open platform and copy content for easy pasting!'
                  }
                </p>
              </div>
            </motion.div>

            {/* Success Message */}
            <AnimatePresence>
              {shareSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4"
                >
                  <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-2 text-green-300">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">{shareSuccess}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex justify-center gap-3 pt-4 border-t border-white/10"
            >
              <AnimatedButton
                variant="secondary"
                onClick={() => copyToClipboard()}
                className="flex items-center gap-2"
                size="sm"
                glowing={true}
              >
                <Copy className="w-4 h-4" />
                Copy Text Only
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