
import React, { useState } from 'react';
import { TabType } from './types';
import HistoryChat from './components/HistoryChat';
import WorldSync from './components/WorldSync';
import QuizBuilder from './components/QuizBuilder';
import { Compass, Globe, BookOpen, Clock } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.CHAT);

  return (
    <div className="min-h-screen flex flex-col max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <header className="mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold serif-title text-stone-900 flex items-center gap-3">
            <Clock className="text-amber-600" size={36} />
            타임링크: AI 세계사 커넥터
          </h1>
          <p className="text-stone-600 mt-2 font-medium">역사의 흐름을 연결하고 인과관계로 이해하는 지혜로운 시간 여행</p>
        </div>
        <div className="bg-white/50 border border-stone-200 px-4 py-2 rounded-full text-xs font-semibold text-stone-500 uppercase tracking-wider shadow-sm">
          Powered by Gemini 3.0
        </div>
      </header>

      {/* Tabs */}
      <nav className="flex bg-stone-200/50 p-1 rounded-xl mb-6 shadow-inner overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab(TabType.CHAT)}
          className={`flex-1 min-w-fit px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ${
            activeTab === TabType.CHAT 
            ? 'bg-white text-amber-700 shadow-sm font-bold' 
            : 'text-stone-500 hover:text-stone-700 hover:bg-stone-300/30'
          }`}
        >
          <Compass size={18} />
          <span>역사 인물 대화</span>
        </button>
        <button
          onClick={() => setActiveTab(TabType.MAP)}
          className={`flex-1 min-w-fit px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ${
            activeTab === TabType.MAP 
            ? 'bg-white text-amber-700 shadow-sm font-bold' 
            : 'text-stone-500 hover:text-stone-700 hover:bg-stone-300/30'
          }`}
        >
          <Globe size={18} />
          <span>같은 시간, 다른 세상</span>
        </button>
        <button
          onClick={() => setActiveTab(TabType.QUIZ)}
          className={`flex-1 min-w-fit px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ${
            activeTab === TabType.QUIZ 
            ? 'bg-white text-amber-700 shadow-sm font-bold' 
            : 'text-stone-500 hover:text-stone-700 hover:bg-stone-300/30'
          }`}
        >
          <BookOpen size={18} />
          <span>맥락 이해 퀴즈</span>
        </button>
      </nav>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-6 sm:p-8 min-h-[600px]">
          {activeTab === TabType.CHAT && <HistoryChat />}
          {activeTab === TabType.MAP && <WorldSync />}
          {activeTab === TabType.QUIZ && <QuizBuilder />}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-stone-400 text-sm pb-8">
        <p>© 2024 TimeLink AI World History. 과 거를 통해 미래를 배웁니다.</p>
      </footer>
    </div>
  );
};

export default App;
