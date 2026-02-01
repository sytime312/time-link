
import React, { useState } from 'react';
import { getGeminiResponse } from '../services/geminiService';
// Added Globe to the imported lucide-react components
import { Search, Map, ChevronRight, Loader2, Globe } from 'lucide-react';

const WorldSync: React.FC = () => {
  const [event, setEvent] = useState('');
  const [result, setResult] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    if (!event.trim()) return;
    setIsSyncing(true);

    const prompt = `'${event}'이(가) 일어났을 때의 시대를 기준으로 다음을 분석해줘:
1. 해당 사건의 핵심 내용 요약
2. 같은 시기 '아시아, 유럽, 아메리카, 아프리카'에서 일어난 주요 사건들
3. 이 사건들이 서로 어떤 영향을 주고받았는지(예: 교역로, 종교 전파 등)
표와 리스트를 활용해 가독성 있게 작성해줘.`;

    const response = await getGeminiResponse(prompt, 'pro');
    setResult(response);
    setIsSyncing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-stone-900 serif-title">동시대 세계사 비교 탐험</h2>
        <p className="text-stone-500 italic">"동일한 시간 속, 지구 반대편에서는 어떤 일이 벌어지고 있었을까요?"</p>
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400 group-focus-within:text-amber-500 transition-colors">
          <Search size={20} />
        </div>
        <input
          type="text"
          className="w-full pl-12 pr-32 py-4 bg-stone-100 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all text-lg"
          placeholder="중심 사건이나 시대를 입력하세요 (예: 프랑스 혁명, 실크로드의 개척)"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSync()}
        />
        <button
          onClick={handleSync}
          disabled={isSyncing || !event.trim()}
          className="absolute right-2 top-2 bottom-2 bg-stone-900 text-white px-6 rounded-xl hover:bg-stone-800 transition-all font-bold flex items-center gap-2 disabled:opacity-50"
        >
          {isSyncing ? <Loader2 className="animate-spin" size={20} /> : <Map size={20} />}
          전 세계 연대기 보기
        </button>
      </div>

      {isSyncing && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4 animate-pulse">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
            <Globe className="animate-spin" size={32} />
          </div>
          <p className="text-stone-500 font-medium">전 세계 역사를 동기화하는 중입니다...</p>
        </div>
      )}

      {result && !isSyncing && (
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="bg-amber-50/50 rounded-2xl border border-amber-200 overflow-hidden shadow-sm">
            <div className="bg-amber-100 px-6 py-3 border-b border-amber-200 flex items-center justify-between">
              <span className="font-bold text-amber-900 flex items-center gap-2">
                <ChevronRight className="text-amber-600" size={18} />
                {event} 당시의 세계 정세 분석
              </span>
              <span className="text-xs bg-white/50 px-2 py-1 rounded text-amber-700 font-bold">HISTORICAL CONTEXT</span>
            </div>
            <div className="p-8 prose prose-amber prose-stone max-w-none">
              <div className="whitespace-pre-wrap text-stone-800 leading-relaxed text-lg font-normal">
                {/* Simplified markdown display - in a real app use react-markdown */}
                {result.split('\n').map((line, i) => {
                  if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold text-stone-900 mb-4 mt-8 serif-title">{line.substring(2)}</h1>;
                  if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-stone-900 mb-3 mt-6 border-b pb-2">{line.substring(3)}</h2>;
                  if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-amber-800 mb-2 mt-4">{line.substring(4)}</h3>;
                  if (line.startsWith('- ') || line.startsWith('* ')) return <li key={i} className="ml-4 list-disc mb-1">{line.substring(2)}</li>;
                  return <p key={i} className="mb-2">{line}</p>;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorldSync;
