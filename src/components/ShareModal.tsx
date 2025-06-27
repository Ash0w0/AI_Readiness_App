import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Camera, Linkedin, Twitter, Facebook, MessageCircle, Send, Share2 } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { AnimatedButton } from './AnimatedButton';
import html2canvas from 'html2canvas';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: {
    score: number;
    totalQuestions: number;
    percentage: number;
    strengths: string[];
    weaknesses: string[];
  };
  userName: string;
}

export function ShareModal({ isOpen, onClose, result, userName }: ShareModalProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [shareText, setShareText] = useState('');
  const [isSharing, setIsSharing] = useState<string | null>(null);

  // Auto-generate post content
  useEffect(() => {
    if (isOpen) {
      const achievementLevel = result.percentage >= 80 ? 'Excellent' : 
                              result.percentage >= 60 ? 'Good' : 'Learning';
      
      const postContent = `🚀 Just completed my AI Readiness Assessment!

📊 Score: ${result.percentage}% (${result.score}/${result.totalQuestions} correct)
🎯 Level: ${achievementLevel}
💪 Strengths: ${result.strengths.join(', ') || 'Building knowledge'}
📚 Growing in: ${result.weaknesses.join(', ') || 'All areas covered'}

Ready to level up my AI skills! 🤖✨

#AIReadiness #ArtificialIntelligence #ProfessionalDevelopment #TechSkills #Learning #AI #MachineLearning #FutureOfWork`;

      setShareText(postContent);
      captureScreenshot();
    }
  }, [isOpen, result]);

  const captureScreenshot = async () => {
    setIsCapturing(true);
    try {
      // Wait a bit for modal to settle
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const element = document.querySelector('.results-page') || document.body;
      const canvas = await html2canvas(element as HTMLElement, {
        backgroundColor: '#1a1a2e',
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const dataUrl = canvas.toDataURL('image/png');
      setScreenshot(dataUrl);
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
    } finally {
      setIsCapturing(false);
    }
  };

  const downloadImage = () => {
    if (screenshot) {
      const link = document.createElement('a');
      link.download = `ai-readiness-results-${userName.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = screenshot;
      link.click();
    }
  };

  const shareToLinkedIn = async () => {
    setIsSharing('linkedin');
    try {
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent(shareText)}`;
      window.open(url, '_blank', 'width=600,height=600');
    } catch (error) {
      console.error('LinkedIn sharing failed:', error);
    } finally {
      setIsSharing(null);
    }
  };

  const shareToTwitter = async () => {
    setIsSharing('twitter');
    try {
      const twitterText = shareText.substring(0, 280); // Twitter character limit
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(window.location.href)}`;
      window.open(url, '_blank', 'width=600,height=600');
    } catch (error) {
      console.error('Twitter sharing failed:', error);
    } finally {
      setIsSharing(null);
    }
  };

  const shareToFacebook = async () => {
    setIsSharing('facebook');
    try {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`;
      window.open(url, '_blank', 'width=600,height=600');
    } catch (error) {
      console.error('Facebook sharing failed:', error);
    } finally {
      setIsSharing(null);
    }
  };

  const shareToWhatsApp = async () => {
    setIsSharing('whatsapp');
    try {
      const url = `https://wa.me/?text=${encodeURIComponent(shareText + '\n\n' + window.location.href)}`;
      window.open(url, '_blank');
    } catch (error) {
      console.error('WhatsApp sharing failed:', error);
    } finally {
      setIsSharing(null);
    }
  };

  const shareToTelegram = async () => {
    setIsSharing('telegram');
    try {
      const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(shareText)}`;
      window.open(url, '_blank');
    } catch (error) {
      console.error('Telegram sharing failed:', error);
    } finally {
      setIsSharing(null);
    }
  };

  const shareNative = async () => {
    setIsSharing('native');
    try {
      if (navigator.share) {
        const shareData: any = {
          title: 'My AI Readiness Assessment Results',
          text: shareText,
          url: window.location.href
        };

        // Add image if available and supported
        if (screenshot && navigator.canShare) {
          const response = await fetch(screenshot);
          const blob = await response.blob();
          const file = new File([blob], 'ai-results.png', { type: 'image/png' });
          
          if (navigator.canShare({ files: [file] })) {
            shareData.files = [file];
          }
        }

        await navigator.share(shareData);
      } else {
        // Fallback to copying to clipboard
        await navigator.clipboard.writeText(shareText + '\n\n' + window.location.href);
        alert('Content copied to clipboard!');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Native sharing failed:', error);
      }
    } finally {
      setIsSharing(null);
    }
  };

  const socialPlatforms = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'from-blue-600 to-blue-700',
      action: shareToLinkedIn,
      description: 'Share with your professional network'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'from-sky-500 to-sky-600',
      action: shareToTwitter,
      description: 'Tweet your achievement'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'from-blue-700 to-blue-800',
      action: shareToFacebook,
      description: 'Share with friends and family'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'from-green-500 to-green-600',
      action: shareToWhatsApp,
      description: 'Send to your contacts'
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'from-blue-500 to-blue-600',
      action: shareToTelegram,
      description: 'Share in Telegram'
    },
    {
      name: 'More',
      icon: Share2,
      color: 'from-purple-500 to-purple-600',
      action: shareNative,
      description: 'Use device sharing options'
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Share Your Achievement</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Post Preview */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Your Post Preview</h3>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-white font-medium">{userName}</div>
                      <div className="text-gray-400 text-sm">Just now</div>
                    </div>
                  </div>
                  <div className="text-gray-300 whitespace-pre-line text-sm leading-relaxed">
                    {shareText}
                  </div>
                  {screenshot && (
                    <div className="mt-3 rounded-lg overflow-hidden">
                      <img 
                        src={screenshot} 
                        alt="Results screenshot" 
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Screenshot Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-medium">Screenshot</h4>
                    <div className="flex gap-2">
                      <AnimatedButton
                        variant="secondary"
                        size="sm"
                        onClick={captureScreenshot}
                        loading={isCapturing}
                        className="flex items-center gap-2"
                      >
                        <Camera className="w-4 h-4" />
                        {isCapturing ? 'Capturing...' : 'Retake'}
                      </AnimatedButton>
                      {screenshot && (
                        <AnimatedButton
                          variant="secondary"
                          size="sm"
                          onClick={downloadImage}
                          className="flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </AnimatedButton>
                      )}
                    </div>
                  </div>
                  
                  {screenshot ? (
                    <div className="border border-white/20 rounded-lg overflow-hidden">
                      <img 
                        src={screenshot} 
                        alt="Results screenshot" 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ) : (
                    <div className="border border-white/20 rounded-lg h-48 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        {isCapturing ? (
                          <div className="flex flex-col items-center gap-2">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                            <span>Capturing screenshot...</span>
                          </div>
                        ) : (
                          <span>Screenshot will appear here</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sharing Options */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Share On</h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialPlatforms.map((platform) => (
                    <motion.button
                      key={platform.name}
                      onClick={platform.action}
                      disabled={isSharing === platform.name.toLowerCase()}
                      className={`p-4 rounded-xl bg-gradient-to-r ${platform.color} text-white font-medium transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <platform.icon className="w-6 h-6" />
                        <span className="text-sm font-semibold">
                          {isSharing === platform.name.toLowerCase() ? 'Sharing...' : platform.name}
                        </span>
                        <span className="text-xs opacity-80 text-center">
                          {platform.description}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div>
                      <h4 className="text-blue-300 font-medium mb-1">One-Click Sharing</h4>
                      <p className="text-blue-200 text-sm">
                        Your post is automatically created with your results and screenshot. 
                        Just click any platform to share instantly - no copying or pasting needed!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}