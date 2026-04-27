import { motion } from 'motion/react';
import DouyinCover from './components/DouyinCover';
import { Download, RefreshCcw, Share2, Layers, Edit3 } from 'lucide-react';
import { toPng } from 'html-to-image';
import { useRef, useState, ChangeEvent } from 'react';

export default function App() {
  const coverRef = useRef<HTMLDivElement>(null);
  const [branding, setBranding] = useState('老王深度拆解 · 2026');
  const [brandingSize, setBrandingSize] = useState(14);
  const [brandingX, setBrandingX] = useState(0);
  const [brandingY, setBrandingY] = useState(0);
  const [brandingColor, setBrandingColor] = useState('#FFFFFF');

  const [title, setTitle] = useState('哪些行业');
  const [titleSize, setTitleSize] = useState(64);
  const [titleX, setTitleX] = useState(0);
  const [titleY, setTitleY] = useState(0);
  const [titleColor, setTitleColor] = useState('#FACC15');

  const [yearText, setYearText] = useState('2026');
  const [yearSize, setYearSize] = useState(64);
  const [yearX, setYearX] = useState(0);
  const [yearY, setYearY] = useState(0);
  const [yearColor, setYearColor] = useState('#FFFFFF');

  const [subtitle, setSubtitle] = useState('能赚钱？');
  const [subtitleSize, setSubtitleSize] = useState(36);
  const [subtitleX, setSubtitleX] = useState(0);
  const [subtitleY, setSubtitleY] = useState(0);
  const [subtitleColor, setSubtitleColor] = useState('#000000');
  const [subtitleBg, setSubtitleBg] = useState('#FFFFFF');
  const [subtitleOpacity, setSubtitleOpacity] = useState(0.9);
  const [subtitleRadius, setSubtitleRadius] = useState(0);

  const [footer, setFooter] = useState('我看透真相 \n 你负责赚钱');
  const [avatarText, setAvatarText] = useState('王');
  const [avatarBg, setAvatarBg] = useState('#FACC15');
  const [englishFooter, setEnglishFooter] = useState('EXPERT GUIDANCE SYSTEM');
  const [tags, setTags] = useState(['财富非线性', '爆发是关键', '底层逻辑']);
  
  const [userImage, setUserImage] = useState<string | null>(null);
  const [imageScale, setImageScale] = useState(1);
  const [imageXOffset, setImageXOffset] = useState(0);
  const [imageYOffset, setImageYOffset] = useState(0);

  const [bgImage, setBgImage] = useState<string | null>(null);
  const [bgScale, setBgScale] = useState(1);
  const [maskImage, setMaskImage] = useState<string | null>(null);
  const [maskScale, setMaskScale] = useState(1);
  const [maskOpacity, setMaskOpacity] = useState(0.5);

  const [coverPadding, setCoverPadding] = useState(24);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, setter: (val: string | null) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const handleDownload = async () => {
    if (!coverRef.current) return;
    
    try {
      const dataUrl = await toPng(coverRef.current, {
        cacheBust: true,
        pixelRatio: 3, // Premium quality
      });
      const link = document.createElement('a');
      link.download = `laowang-cover-${title}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
      alert('下载失败，请尝试在电脑端使用或更换浏览器');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row items-start justify-center p-4 md:p-12 gap-8 font-sans overflow-auto">
      
      {/* Left Side: Controls Scrollable Area */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full md:max-w-md space-y-6 shrink-0"
      >
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tighter italic">
            封面<span className="text-green-500">编辑器</span>
          </h2>
          <p className="text-white/40 text-sm">3:4 高清封面生成 · 老王专属模板</p>
        </div>

        {/* Text Controls */}
        <div className="space-y-6 bg-white/5 border border-white/10 p-6 rounded-2xl max-h-[60vh] overflow-y-auto custom-scrollbar">
          
          <div className="space-y-2 border-b border-white/5 pb-4">
             <h3 className="text-xs font-black text-white/40 uppercase tracking-widest">全局配置</h3>
             <div>
                <label className="text-[10px] text-white/40 font-bold block mb-1">内边距 ({coverPadding}px)</label>
                <input type="range" min="0" max="60" value={coverPadding} onChange={(e) => setCoverPadding(parseInt(e.target.value))} className="w-full h-1 accent-yellow-400" />
             </div>
          </div>

          <div className="space-y-2 border-b border-white/5 pb-4">
             <h3 className="text-xs font-black text-white/40 uppercase tracking-widest">背景与遮罩层</h3>
             <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                   <label className="text-[10px] text-white/40 font-bold block">背景图</label>
                   <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setBgImage)} className="hidden" id="bg-upload" />
                   <label htmlFor="bg-upload" className="block text-center p-2 bg-white/10 rounded-lg text-[10px] cursor-pointer">上传</label>
                   {bgImage && (
                     <div className="space-y-1">
                        <input type="range" min="0.5" max="3" step="0.01" value={bgScale} onChange={(e) => setBgScale(parseFloat(e.target.value))} className="w-full h-1" />
                        <button onClick={() => setBgImage(null)} className="text-[9px] text-red-400 block mx-auto">清除</button>
                     </div>
                   )}
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] text-white/40 font-bold block">遮罩层</label>
                   <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setMaskImage)} className="hidden" id="mask-upload" />
                   <label htmlFor="mask-upload" className="block text-center p-2 bg-white/10 rounded-lg text-[10px] cursor-pointer">上传</label>
                   {maskImage && (
                     <div className="space-y-1">
                        <input type="range" min="0.5" max="3" step="0.01" value={maskScale} onChange={(e) => setMaskScale(parseFloat(e.target.value))} className="w-full h-1" />
                        <input type="range" min="0" max="1" step="0.01" value={maskOpacity} onChange={(e) => setMaskOpacity(parseFloat(e.target.value))} className="w-full h-1" />
                        <button onClick={() => setMaskImage(null)} className="text-[9px] text-red-400 block mx-auto">清除</button>
                     </div>
                   )}
                </div>
             </div>
          </div>

          <div className="space-y-2 border-b border-white/5 pb-4">
             <h3 className="text-xs font-black text-white/40 uppercase tracking-widest">年份标题 (2026)</h3>
             <div className="space-y-3">
                <input 
                  type="text" 
                  value={yearText} 
                  onChange={(e) => setYearText(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white font-bold"
                />
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] text-white/40 font-bold block mb-1">大小 ({yearSize}px)</label>
                      <input type="range" min="20" max="120" value={yearSize} onChange={(e) => setYearSize(parseInt(e.target.value))} className="w-full h-1 accent-yellow-400" />
                   </div>
                   <div>
                      <label className="text-[10px] text-white/40 font-bold block mb-1">颜色</label>
                      <input type="color" value={yearColor} onChange={(e) => setYearColor(e.target.value)} className="w-full h-6 bg-transparent cursor-pointer rounded overflow-hidden p-0 border-none" />
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] text-white/40 font-bold block mb-1">左右 ({yearX}px)</label>
                      <input type="range" min="-100" max="100" value={yearX} onChange={(e) => setYearX(parseInt(e.target.value))} className="w-full h-1 accent-yellow-400" />
                   </div>
                   <div>
                      <label className="text-[10px] text-white/40 font-bold block mb-1">上下 ({yearY}px)</label>
                      <input type="range" min="-100" max="100" value={yearY} onChange={(e) => setYearY(parseInt(e.target.value))} className="w-full h-1 accent-yellow-400" />
                   </div>
                </div>
             </div>
          </div>

          <div className="space-y-2 border-b border-white/5 pb-4">
             <h3 className="text-xs font-black text-white/40 uppercase tracking-widest">主标题配置 (黄)</h3>
             <div className="space-y-3">
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white font-bold"
                />
                <div className="grid grid-cols-3 gap-3">
                   <div className="col-span-2">
                      <label className="text-[10px] text-white/40 font-bold block mb-1">大小 ({titleSize}px)</label>
                      <input type="range" min="20" max="120" value={titleSize} onChange={(e) => setTitleSize(parseInt(e.target.value))} className="w-full h-1 accent-yellow-400" />
                   </div>
                   <div>
                      <label className="text-[10px] text-white/40 font-bold block mb-1">颜色</label>
                      <input type="color" value={titleColor} onChange={(e) => setTitleColor(e.target.value)} className="w-full h-6 bg-transparent cursor-pointer rounded overflow-hidden p-0 border-none" />
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] text-white/40 font-bold block mb-1">左右 ({titleX}px)</label>
                      <input type="range" min="-100" max="100" value={titleX} onChange={(e) => setTitleX(parseInt(e.target.value))} className="w-full h-1 accent-yellow-400" />
                   </div>
                   <div>
                      <label className="text-[10px] text-white/40 font-bold block mb-1">上下 ({titleY}px)</label>
                      <input type="range" min="-100" max="100" value={titleY} onChange={(e) => setTitleY(parseInt(e.target.value))} className="w-full h-1 accent-yellow-400" />
                   </div>
                </div>
             </div>
          </div>

          <div className="space-y-2 border-b border-white/5 pb-4">
             <h3 className="text-xs font-black text-white/40 uppercase tracking-widest">副标题配置 (透明层)</h3>
             <div className="space-y-3">
                <input 
                  type="text" 
                  value={subtitle} 
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white font-bold"
                />
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] text-white/40 font-bold block mb-1">大小 ({subtitleSize}px)</label>
                      <input type="range" min="12" max="80" value={subtitleSize} onChange={(e) => setSubtitleSize(parseInt(e.target.value))} className="w-full h-1 accent-yellow-400" />
                   </div>
                   <div>
                      <label className="text-[10px] text-white/40 font-bold block mb-1">文字颜色</label>
                      <input type="color" value={subtitleColor} onChange={(e) => setSubtitleColor(e.target.value)} className="w-full h-6 bg-transparent cursor-pointer rounded overflow-hidden p-0 border-none" />
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] text-white/40 font-bold block mb-1">左右 ({subtitleX}px)</label>
                      <input type="range" min="-200" max="200" value={subtitleX} onChange={(e) => setSubtitleX(parseInt(e.target.value))} className="w-full h-1 accent-yellow-400" />
                   </div>
                   <div>
                      <label className="text-[10px] text-white/40 font-bold block mb-1">上下 ({subtitleY}px)</label>
                      <input type="range" min="-200" max="200" value={subtitleY} onChange={(e) => setSubtitleY(parseInt(e.target.value))} className="w-full h-1 accent-yellow-400" />
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] text-white/40 font-bold block mb-1">不透明度</label>
                      <input type="range" min="0" max="1" step="0.01" value={subtitleOpacity} onChange={(e) => setSubtitleOpacity(parseFloat(e.target.value))} className="w-full h-1 accent-yellow-400" />
                   </div>
                   <div>
                      <label className="text-[10px] text-white/40 font-bold block mb-1">圆角 ({subtitleRadius}px)</label>
                      <input type="range" min="0" max="100" value={subtitleRadius} onChange={(e) => setSubtitleRadius(parseInt(e.target.value))} className="w-full h-1 accent-yellow-400" />
                   </div>
                </div>
                <div>
                   <label className="text-[10px] text-white/40 font-bold block mb-1">遮罩色</label>
                   <input type="color" value={subtitleBg} onChange={(e) => setSubtitleBg(e.target.value)} className="w-full h-6 bg-transparent cursor-pointer rounded overflow-hidden p-0 border-none" />
                </div>
             </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black text-white/40 uppercase tracking-widest">底部文案与标签</h3>
            <div className="space-y-3">
               <div className="grid grid-cols-2 gap-3">
                  <div>
                     <label className="text-[10px] text-white/40 font-bold block mb-1">头像文字</label>
                     <input type="text" value={avatarText} onChange={(e) => setAvatarText(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-center" />
                  </div>
                  <div>
                     <label className="text-[10px] text-white/40 font-bold block mb-1">头像背景</label>
                     <input type="color" value={avatarBg} onChange={(e) => setAvatarBg(e.target.value)} className="w-full h-6 bg-transparent cursor-pointer" />
                  </div>
               </div>
               <div>
                  <label className="text-[10px] text-white/40 font-bold block mb-1">英文小字</label>
                  <input type="text" value={englishFooter} onChange={(e) => setEnglishFooter(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs" />
               </div>
               <div className="grid grid-cols-3 gap-2">
                 {tags.map((tag, i) => (
                   <input 
                     key={i}
                     type="text" 
                     value={tag} 
                     onChange={(e) => handleTagChange(i, e.target.value)}
                     className="w-full bg-white/5 border border-white/10 rounded-lg p-1.5 text-[10px] text-white focus:border-yellow-400 text-center"
                   />
                 ))}
               </div>
               <textarea 
                 rows={2}
                 value={footer} 
                 onChange={(e) => setFooter(e.target.value)}
                 className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white"
               />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-4">
            <div>
              <label className="text-[10px] text-white/40 uppercase font-bold block mb-2">人物图片调整</label>
              <div className="grid grid-cols-2 gap-2">
                 <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setUserImage)} className="hidden" id="char-upload" />
                 <label htmlFor="char-upload" className="flex items-center justify-center gap-2 bg-white/10 border border-white/10 rounded-xl p-2 cursor-pointer hover:bg-white/15 transition-all text-[10px] font-bold">
                    选取新照片
                 </label>
                 {userImage && (
                    <button onClick={() => {setUserImage(null); setImageScale(1); setImageXOffset(0); setImageYOffset(0);}} className="text-[10px] font-bold bg-red-400/10 text-red-400 rounded-xl border border-red-400/20">移除</button>
                 )}
              </div>
            </div>

            {userImage && (
              <div className="space-y-3 p-3 bg-white/5 rounded-xl border border-white/5">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-[10px] text-white/40 font-bold italic underline">缩放比例</label>
                    <span className="text-[10px] text-yellow-500 font-mono italic">{Math.round(imageScale * 100)}%</span>
                  </div>
                  <input type="range" min="0.2" max="3" step="0.01" value={imageScale} onChange={(e) => setImageScale(parseFloat(e.target.value))} className="w-full h-1 accent-yellow-400" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] text-white/40 font-bold block mb-1">水平</label>
                      <input type="range" min="-500" max="500" value={imageXOffset} onChange={(e) => setImageXOffset(parseInt(e.target.value))} className="w-full h-1 accent-yellow-400" />
                   </div>
                   <div>
                      <label className="text-[10px] text-white/40 font-bold block mb-1">垂直</label>
                      <input type="range" min="-500" max="500" value={imageYOffset} onChange={(e) => setImageYOffset(parseInt(e.target.value))} className="w-full h-1 accent-yellow-400" />
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={handleDownload}
          className="w-full bg-white text-black py-4 rounded-full font-black flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all cursor-pointer active:scale-95 shadow-lg shadow-white/5"
        >
          <Download className="w-5 h-5" />
          立即导出 4K 无水印封面
        </button>
      </motion.div>

      {/* Right Side: Preview */}
      <div className="w-full flex justify-center sticky top-8">
        <div className="relative w-full max-w-[420px] bg-black rounded-[1.5rem] shadow-2xl overflow-hidden border-8 border-[#111]">
          <div ref={coverRef}>
            <DouyinCover 
              title={title} 
              titleSize={titleSize}
              titleX={titleX}
              titleY={titleY}
              titleColor={titleColor}

              yearText={yearText}
              yearSize={yearSize}
              yearX={yearX}
              yearY={yearY}
              yearColor={yearColor}
              
              subtitle={subtitle} 
              subtitleSize={subtitleSize}
              subtitleX={subtitleX}
              subtitleY={subtitleY}
              subtitleColor={subtitleColor}
              subtitleBg={subtitleBg}
              subtitleOpacity={subtitleOpacity}
              subtitleRadius={subtitleRadius}
              
              branding={branding}
              brandingSize={brandingSize}
              brandingX={brandingX}
              brandingY={brandingY}
              brandingColor={brandingColor}
              
              footer={footer}
              avatarText={avatarText}
              avatarBg={avatarBg}
              englishFooter={englishFooter}
              tags={tags}
              userImage={userImage} 
              imageScale={imageScale}
              imageXOffset={imageXOffset}
              imageYOffset={imageYOffset}

              bgImage={bgImage}
              bgScale={bgScale}
              maskImage={maskImage}
              maskScale={maskScale}
              maskOpacity={maskOpacity}
              coverPadding={coverPadding}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
