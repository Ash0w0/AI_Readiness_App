import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, Camera, Linkedin, Twitter, Facebook, MessageCircle } from 'lucide-react';
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

  useEffect(() => {
    if (isOpen) {
      // Auto-capture screenshot when modal opens
      captureScreenshot();
    }
  }, [isOpen]);

  const captureScreenshot = async () => {
    setIsCapturing(true);
    try {
      const resultsPage = document.querySelector('[data-results-page]') as HTMLElement;
      if (resultsPage) {
        const canvas = await html2canvas(resultsPage, {
          backgroundColor: '#1e1b4b',
          scale: 2,
          useCORS: true,
          allowTaint: true
        });
        const dataUrl = canvas.toDataURL('image/png');
        setScreenshot(dataUrl);
      }
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
    } finally {
      setIsCapturing(false);
    }
  };

  const downloadScreenshot = () => {
    if (screenshot) {
      const link = document.createElement('a');
      link.download = `skillscan-ai-results-${userName.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = screenshot;
      link.click();
    }
  };

  const shareText = `🎯 Just completed my AI Skills Assessment on SkillScan AI!\n\n📊 Score: ${result.percentage}%\n🎓 ${result.score}/${result.totalQuestions} questions correct\n\n💪 Strengths: ${result.strengths.join(', ') || 'Building my foundation'}\n🎯 Focus Areas: ${result.weaknesses.join(', ') || 'Continuing to grow'}\n\n🚀 Ready to level up my AI game! #AISkills #ProfessionalDevelopment #SkillScanAI`;

  const shareOnPlatform = (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const urls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodedText}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodedText}`,
      whatsapp: `https://wa.me/?text=${encodedText}`
    };
    
    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

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
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Share2 className="w-6 h-6" />
                Share Your Results
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Screenshot Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Your Achievement</h3>
              {isCapturing ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2 animate-pulse" />
                  <p className="text-gray-400">Capturing your results...</p>
                </div>
              ) : screenshot ? (
                <div className="relative">
                  <img
                    src={screenshot}
                    alt="Assessment Results"
                    className="w-full rounded-xl border border-white/20"
                  />
                  <div className="flex gap-2 mt-3">
                    <AnimatedButton
                      variant="secondary"
                      size="sm"
                      onClick={downloadScreenshot}
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </AnimatedButton>
                    <AnimatedButton
                      variant="ghost"
                      size="sm"
                      onClick={captureScreenshot}
                      className="flex items-center gap-2"
                    >
                      <Camera className="w-4 h-4" />
                      Retake
                    </AnimatedButton>
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 mb-3">No screenshot available</p>
                  <AnimatedButton
                    variant="secondary"
                    size="sm"
                    onClick={captureScreenshot}
                  >
                    Capture Screenshot
                  </AnimatedButton>
                </div>
              )}
            </div>

            {/* Share Text Preview */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Share Message</h3>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <pre className="text-gray-300 text-sm whitespace-pre-wrap font-sans">
                  {shareText}
                </pre>
              </div>
            </div>

            {/* Social Media Buttons */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Share On</h3>
              <div className="grid grid-cols-2 gap-3">
                <AnimatedButton
                  variant="secondary"
                  onClick={() => shareOnPlatform('linkedin')}
                  className="flex items-center gap-2 justify-center"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </AnimatedButton>
                <AnimatedButton
                  variant="secondary"
                  onClick={() => shareOnPlatform('twitter')}
                  className="flex items-center gap-2 justify-center"
                >
                  <Twitter className="w-5 h-5" />
                  Twitter
                </AnimatedButton>
                <AnimatedButton
                  variant="secondary"
                  onClick={() => shareOnPlatform('facebook')}
                  className="flex items-center gap-2 justify-center"
                >
                  <Facebook className="w-5 h-5" />
                  Facebook
                </AnimatedButton>
                <AnimatedButton
                  variant="secondary"
                  onClick={() => shareOnPlatform('whatsapp')}
                  className="flex items-center gap-2 justify-center"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </AnimatedButton>
              </div>
              
              <AnimatedButton
                variant="ghost"
                onClick={copyToClipboard}
                className="w-full"
              >
                Copy Text to Clipboard
              </AnimatedButton>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}