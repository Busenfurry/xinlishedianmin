import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

// 预定义的心理社团成员名单
const PSYCHOLOGY_CLUB_MEMBERS = [
  "孙菲", "郑嘉伟", "刘梓彬", "黄淳杰", "郑雯", "谢俊斌", "朱浩雄", 
  "陈佳熔", "李雅楠", "徐锦凌", "杨礼萍", "罗子轩", "谢予桐", "黄于玲", 
  "张怡琳", "王爱华", "熊彦雯", "蓝鑫雅", "王润杰", "张婷", "孙健婷", 
  "黄淑娴", "吴安祺", "林佳榆", "杨婧林", "梁皓阳", "叶莹莹", "余霏", 
  "陈航", "刘昊轩", "关淮文", "徐丽纹", "邹语萱", "李伟", "陈景轩", 
  "叶子祺", "张文轩", "莫海瑜", "邓涵予", "胡筱璇", "林美玲", "陶乐", 
  "刘瑾伊", "林庆怡", "杨晨", "刘馨", "朱俊晖", "黄宇轩", "李仁政", 
  "唐俊钊", "徐诗妍", "王钰", "袁昊", "谭梓烨", "陈宛舒"
];

// 主点名器应用组件
export default function NamePickerApp() {
  // 状态管理
  const [nameList] = useState<string[]>(PSYCHOLOGY_CLUB_MEMBERS);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [pickCount, setPickCount] = useState<number>(1);
  const [isPicking, setIsPicking] = useState<boolean>(false);
  const [lastPickTime, setLastPickTime] = useState<string>('');
  const [hideNames, setHideNames] = useState<boolean>(false);
  const [revealedNames, setRevealedNames] = useState<Set<string>>(new Set());
  const { theme, toggleTheme, isDark } = useTheme();
  
  // 随机选择名字
  const pickRandomNames = () => {
    if (nameList.length === 0) {
      toast.info('名单为空，请联系管理员');
      return;
    }
    
    // 限制选择人数不超过名单总数
    const actualCount = Math.min(pickCount, nameList.length);
    
  setIsPicking(true);
  setRevealedNames(new Set());
    
    // 添加动画效果，短暂"滚动"后显示结果
    const animationDuration = 1500; // 动画持续时间
    const intervalTime = 50; // 每次更新的间隔
    const totalSteps = animationDuration / intervalTime;
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      
      // 随机选择名字，创建动画效果
      const tempSelected = [];
      const availableNames = [...nameList];
      
      for (let i = 0; i < actualCount; i++) {
        if (availableNames.length === 0) break;
        
        const randomIndex = Math.floor(Math.random() * availableNames.length);
        tempSelected.push(availableNames.splice(randomIndex, 1)[0]);
      }
      
      setSelectedNames(tempSelected);
      
      // 动画结束，选择最终结果
      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setIsPicking(false);
        setLastPickTime(new Date().toLocaleString());
        toast.success(`成功选择 ${actualCount} 名成员`);
      }
    }, intervalTime);
  };
  
  // 背景图案生成
  useEffect(() => {
    const createBackgroundPattern = () => {
      const container = document.getElementById('psychology-pattern');
      if (!container) return;
      
      // 清空现有图案
      container.innerHTML = '';
      
      // 创建心理学相关的抽象图案元素
        // 根据主题调整形状数量，白色模式下更多
          const shapesCount = isDark ? 15 : 40;
        for (let i = 0; i < shapesCount; i++) {
          const shape = document.createElement('div');
          // 白色模式下形状更大
          const size = Math.random() * (isDark ? 40 : 80) + 30;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
          const opacity = isDark ? Math.random() * 0.1 + 0.05 : Math.random() * 0.2 + 0.1;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 15;
        
        // 随机形状类型
        // 白色模式下增加菱形形状
        const shapeTypes = isDark ? ['circle', 'triangle', 'square'] : ['circle', 'triangle', 'square', 'diamond'];
        const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        
        // 设置形状样式
        shape.style.position = 'absolute';
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.left = `${left}%`;
        shape.style.top = `${top}%`;
        shape.style.opacity = opacity.toString();
        shape.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        shape.style.pointerEvents = 'none';
        
        // 根据形状类型设置样式
        if (shapeType === 'circle') {
          shape.style.borderRadius = '50%';
          // 提高白色模式下的透明度
           shape.style.background = isDark ? 'rgba(99, 102, 241, 0.5)' : 'rgba(99, 102, 241, 0.6)';
        } else if (shapeType === 'triangle') {
          shape.style.width = '0';
          shape.style.height = '0';
          shape.style.borderLeft = `${size/2}px solid transparent`;
          shape.style.borderRight = `${size/2}px solid transparent`;
           shape.style.borderBottom = `${size}px solid ${isDark ? 'rgba(139, 92, 246, 0.5)' : 'rgba(139, 92, 246, 0.6)'}`;
          shape.style.background = 'none';
        } else if (shapeType === 'diamond') {
          shape.style.transform = 'rotate(45deg)';
          shape.style.borderRadius = '4px';
           shape.style.background = isDark ? 'rgba(236, 72, 153, 0.5)' : 'rgba(236, 72, 153, 0.6)';
        } else {
          shape.style.borderRadius = '8px';
           shape.style.background = isDark ? 'rgba(217, 70, 239, 0.5)' : 'rgba(217, 70, 239, 0.6)';
        }
        
        container.appendChild(shape);
      }
    };
    
    // 添加浮动动画样式
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(5deg); }
        100% { transform: translateY(0px) rotate(0deg); }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .animate-fade-in {
        animation: fadeIn 0.5s ease-out forwards;
      }
      
      .result-card {
        animation: fadeIn 0.5s ease-out forwards;
      }
      
      .result-card:nth-child(2) { animation-delay: 0.1s; }
      .result-card:nth-child(3) { animation-delay: 0.2s; }
      .result-card:nth-child(4) { animation-delay: 0.3s; }
    `;
    document.head.appendChild(style);
    
    createBackgroundPattern();
    
    // 主题变化时重新创建背景图案
    return () => {
      const container = document.getElementById('psychology-pattern');
      if (container) container.innerHTML = '';
    };
  }, [theme]);

  // 当隐藏名字开关打开时重置已揭示状态
  useEffect(() => {
    if (hideNames) {
      setRevealedNames(new Set());
    }
  }, [hideNames]);
  
  return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:to-indigo-950 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[url('https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=white%20background%20with%20subtle%20psychological%20pattern%20light%20blue%20purple%20gradient&sign=24e1d5e12ceed1fbb7f1010617f8c234')] bg-cover bg-fixed bg-opacity-15 dark:bg-opacity-0">
      {/* 背景装饰图案 */}
      <div id="psychology-pattern" className="fixed inset-0 w-full h-full pointer-events-none z-0"></div>
      
      <div className="max-w-2xl mx-auto w-full relative z-10">
        {/* 头部区域 */}
        <header className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-3">
               <img 
              src="https://lf-code-agent.coze.cn/obj/x-ai-cn/279400321794/attachment/心理社logo文字_透明_20251007193837.png" 
              alt="華僑·心理" 
              className="h-32 md:h-36 object-contain"
            />
          </div>
          <p className="text-indigo-700 dark:text-indigo-300 mb-4">心理社团专属随机选择工具</p>
          
          {/* 主题切换按钮 */}
          <button 
            onClick={toggleTheme}
            className="absolute top-0 right-0 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md transition-all duration-300 hover:scale-110"
            aria-label={theme === 'light' ? '切换到深色模式' : '切换到浅色模式'}
          >
            {theme === 'light' ? (
              <i className="fa-solid fa-moon text-gray-700"></i>
            ) : (
              <i className="fa-solid fa-sun text-yellow-400"></i>
            )}
          </button>
        </header>
        
        {/* 主内容区 */}
        <main className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 transform hover:shadow-2xl border border-gray-100 dark:border-gray-700/50 animate-fade-in" style={{animationDelay: '0.1s'}}>
          {/* 统计信息栏 */}
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-900/30 dark:to-purple-900/30 px-6 py-3 border-b border-gray-100 dark:border-gray-700/50">
            <div className="flex flex-wrap justify-between items-center text-sm">
              <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2 sm:mb-0">
                <i className="fa-solid fa-users mr-1 text-indigo-500"></i>
                <span>成员总数: <strong>{nameList.length}</strong>人</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <i className="fa-solid fa-clock mr-1 text-purple-500"></i>
                <span>上次点名: {lastPickTime || '从未'}</span>
              </div>
            </div>
          </div>
          
          {/* 点名控制区域 */}
          <section className="p-6 border-b border-gray-100 dark:border-gray-700/50">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <i className="fa-solid fa-random text-indigo-500 mr-2"></i>
              随机点名
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="w-full sm:w-auto flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">单次点名人数</label>
                <div className="flex items-center border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <button 
                    onClick={() => setPickCount(Math.max(1, pickCount - 1))}
                    disabled={isPicking || pickCount <= 1}
                    className="px-3 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <span className="px-4 py-2 text-center flex-1 min-w-[40px] font-medium bg-white dark:bg-gray-800">
                    {pickCount}
                  </span>
                  <button 
                    onClick={() => setPickCount(pickCount + 1)}
                    disabled={isPicking || pickCount >= nameList.length}
                    className="px-3 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
               </div>
               
               <div className="w-full sm:w-auto flex items-center">
                 <label className="flex items-center space-x-2 cursor-pointer">
                   <input
                     type="checkbox"
                     checked={hideNames}
                     onChange={(e) => setHideNames(e.target.checked)}
                     className="form-checkbox h-5 w-5 text-indigo-500 rounded transition-colors"
                   />
                   <span className="text-sm font-medium text-gray-700 dark:text-gray-300">隐藏名字 (点击揭示)</span>
                 </label>
               </div>
               
                <button
                 onClick={pickRandomNames}
                 disabled={isPicking}
                 className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center shadow-lg shadow-indigo-500/20"
               >
                 {isPicking ? (
                   <>
                     <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                     选择中...
                   </>
                 ) : (
                   <>
                     <i className="fa-solid fa-hand-pointer mr-2"></i>
                     开始点名
                   </>
                 )}
               </button>
            </div>
          </section>
          
          {/* 结果展示区域 */}
          <section className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <i className="fa-solid fa-user-check text-purple-500 mr-2"></i>
              点名结果
            </h2>
            
            {selectedNames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 {selectedNames.map((name, index) => (
                   <div 
                     key={index}
                     className="result-card bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-xl text-center font-medium transform transition-all duration-500 hover:scale-105 shadow-lg shadow-indigo-500/20 border border-white/10 cursor-pointer"
                     style={{animationDelay: `${index * 0.1}s`}}
                     onClick={() => {
                       if (hideNames) {
                         setRevealedNames(prev => {
                           const newSet = new Set(prev);
                           newSet.add(name);
                           return newSet;
                         });
                       }
                     }}
                   >
                     <div className="flex flex-col items-center justify-center min-h-[80px]">
                       {hideNames ? (
                         revealedNames.has(name) ? (
                           <span className="transition-all duration-500 transform scale-100 opacity-100 text-xl font-bold">
                             {name}
                           </span>
                         ) : (
                           <span className="text-gray-300 transition-all">
                             <i className="fa-solid fa-question-circle text-2xl"></i>
                           </span>
                         )
                       ) : (
                         <span>{name}</span>
                       )}
                     </div>
                   </div>
                 ))}
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-8 text-center border border-dashed border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors">
                <div className="w-16 h-16 mx-auto bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4">
                  <i className="fa-solid fa-lightbulb text-2xl text-indigo-500 dark:text-indigo-400"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">等待点名</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">点击"开始点名"按钮，随机选择社团成员参与活动或分享</p>
              </div>
            )}
            
            {/* 名单预览（最多显示10个） */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                <i className="fa-solid fa-list text-indigo-400 mr-1"></i>
                成员名单预览 ({nameList.length}人)
              </h3>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-2 py-2 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-100 dark:border-gray-700">
                {nameList.map((name, index) => (
                  <span 
                    key={index}
                  className={`text-xs px-2.5 py-1.5 rounded-full transition-all duration-300 ${
                    !hideNames && selectedNames.includes(name) 
                      ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100 font-medium scale-105' 
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-500'
                  }`}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </main>
        
        {/* 页脚 */}
         <footer className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-700/50">
              <p className="flex items-center justify-center gap-2 mb-2">
                <i className="fa-solid fa-heart text-pink-500"></i>
                心理社团专属工具
              </p>
              <p>© {new Date().getFullYear()} 心灵导航 | 让每次互动都充满意义</p>
            </div>
         </footer>
       </div>
     </div>
  );
}