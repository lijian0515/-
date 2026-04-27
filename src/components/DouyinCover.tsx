import { motion } from 'motion/react';
import { THEME, COVER_CONTENT } from '../constants';
import { TrendingUp, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';

interface DouyinCoverProps {
  title: string;
  titleSize: number;
  titleX: number;
  titleY: number;
  titleColor: string;

  yearText: string;
  yearSize: number;
  yearX: number;
  yearY: number;
  yearColor: string;

  subtitle: string;
  subtitleSize: number;
  subtitleX: number;
  subtitleY: number;
  subtitleColor: string;
  subtitleBg: string;
  subtitleOpacity: number;
  subtitleRadius: number;

  branding: string;
  brandingSize: number;
  brandingX: number;
  brandingY: number;
  brandingColor: string;

  footer: string;
  avatarText: string;
  avatarBg: string;
  englishFooter: string;
  tags: string[];
  userImage: string | null;
  imageScale: number;
  imageXOffset: number;
  imageYOffset: number;

  bgImage: string | null;
  bgScale: number;
  maskImage: string | null;
  maskScale: number;
  maskOpacity: number;
  coverPadding: number;
}

export default function DouyinCover({ 
  title, 
  titleSize,
  titleX,
  titleY,
  titleColor,
  yearText,
  yearSize,
  yearX,
  yearY,
  yearColor,
  subtitle, 
  subtitleSize,
  subtitleX,
  subtitleY,
  subtitleColor,
  subtitleBg,
  subtitleOpacity,
  subtitleRadius,
  branding, 
  brandingSize,
  brandingX,
  brandingY,
  brandingColor,
  footer, 
  avatarText,
  avatarBg,
  englishFooter,
  tags, 
  userImage, 
  imageScale, 
  imageXOffset,
  imageYOffset,
  bgImage,
  bgScale,
  maskImage,
  maskScale,
  maskOpacity,
  coverPadding
}: DouyinCoverProps) {
  return (
    <div 
      className="relative w-full aspect-[3/4] bg-[#0A0A0A] overflow-hidden flex flex-col font-sans select-none"
      style={{ padding: coverPadding }}
      id="douyin-cover-preview"
    >
      {/* Background Image Layer */}
      {bgImage && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.img 
            src={bgImage} 
            animate={{ scale: bgScale }}
            transition={{ duration: 0 }}
            className="w-full h-full object-cover opacity-30" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/20 to-[#0A0A0A]" />
        </div>
      )}

      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 z-1 bg-[radial-gradient(circle_at_80%_20%,_#1a1a1a_0%,_transparent_60%)] opacity-40" />
      
      {/* Custom Mask Image Layer */}
      {maskImage && (
        <div className="absolute inset-0 z-5 pointer-events-none mix-blend-screen" style={{ opacity: maskOpacity }}>
           <motion.img 
            src={maskImage} 
            animate={{ scale: maskScale }}
            transition={{ duration: 0 }}
            className="w-full h-full object-cover" 
          />
        </div>
      )}

      {/* Main Layout Grid */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        
        {/* Top: Branding & Title */}
        <div className="space-y-6">
          <motion.div 
            style={{ 
              x: brandingX, 
              y: brandingY,
              fontSize: brandingSize,
              color: brandingColor
            }}
            className="flex items-center gap-3"
          >
            <div className="h-[2px] w-8 shrink-0" style={{ backgroundColor: brandingColor }} />
            <span className="font-black tracking-widest">{branding}</span>
          </motion.div>

          <div className="space-y-0 relative z-30">
            <motion.div
              style={{ 
                x: yearX,
                y: yearY, 
                fontSize: yearSize,
                color: yearColor
              }}
              className="font-black italic leading-[1] tracking-tighter"
            >
              {yearText}
            </motion.div>
            
            <motion.h1 
              style={{ 
                x: titleX,
                y: titleY, 
                fontSize: titleSize,
                color: titleColor
              }}
              className="font-black italic leading-[1.05] tracking-tighter"
            >
              <span className="whitespace-pre-wrap leading-tight">{title}</span>
            </motion.h1>
            
            <motion.div 
              style={{ x: subtitleX, y: subtitleY }}
              className="inline-block mt-4"
            >
              <span 
                style={{ 
                  color: subtitleColor, 
                  backgroundColor: subtitleBg,
                  opacity: subtitleOpacity,
                  fontSize: subtitleSize,
                  borderRadius: subtitleRadius
                }}
                className="px-4 py-1.5 font-black not-italic whitespace-pre-wrap decoration-clone shadow-sm"
              >
                {subtitle}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Character Space */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="w-full h-full flex items-end justify-end relative pr-6">
            {userImage ? (
              <div className="relative w-[85%] h-full flex items-end justify-center">
                <motion.img 
                  animate={{ 
                    scale: imageScale,
                    x: imageXOffset,
                    y: imageYOffset 
                  }}
                  transition={{ duration: 0 }}
                  src={userImage}
                  alt="Character"
                  className="w-full h-full object-contain object-bottom z-20"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0A0A0A] to-transparent z-30 opacity-95" />
              </div>
            ) : null}
          </div>
        </div>

        {/* Bottom: Keywords & CTA */}
        <div className="relative z-50 space-y-6">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => tag.trim() && (
              <motion.span 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1 rounded text-[10px] text-white/90 font-bold uppercase tracking-wider"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-between border-t border-white/10 pt-4"
          >
            <div className="flex items-center gap-3">
              <div 
                style={{ backgroundColor: avatarBg }}
                className="w-10 h-10 rounded-full flex items-center justify-center font-black text-black text-sm"
              >
                {avatarText}
              </div>
              <p className="text-[11px] text-white/60 font-bold leading-tight whitespace-pre-line">
                {footer}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-white/40 font-mono tracking-tighter uppercase">{englishFooter}</p>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
