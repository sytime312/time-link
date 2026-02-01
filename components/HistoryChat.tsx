
import React, { useState } from 'react';
import { getGeminiResponse } from '../services/geminiService.ts';
import { Send, User, Bot, Loader2 } from 'lucide-react';

const FIGURES = [
  { id: 'napoleon', name: '나폴레옹 보나파르트', description: '프랑스의 황제이자 위대한 전략가' },
  { id: 'qin', name: '진시황', description: '중국을 최초로 통일한 황제' },
  { id: 'elizabeth', name: '엘리자베스 1세', description: '영국의 황금시대를 이끈 여왕' },
  { id: 'mlk', name: '마틴 루서 킹', description: '미국 민권 운동의 상징' },
  { id: 'custom', name: '직접 입력...', description: '다른 인물을 불러오세요' },
];

const HistoryChat: React.FC = () => {
  const [selectedFigure, setSelectedFigure] = useState(FIGURES[0]);
  const [customName, setCustomName] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const activeName = selectedFigure.id === 'custom' ? customName : selectedFigure.name;

  const handleSend = async () => {
    if (!input.trim() || (!activeName && selectedFigure.id === 'custom')) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const prompt = `당신은 지금 '${activeName}'입니다. 학생의 질문에 당시 인물의 입장, 말투, 지식을 바탕으로 답변하세요.\n질문: ${userMsg}`;
    
    const aiResponse = await getGeminiResponse(prompt);
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 space-y-4">
          <label className="block text-sm font-bold text-stone-700">대화 상대 선택</label>
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
            {FIGURES.map((fig) => (
              <button
                key={fig.id}
                onClick={() => {
                  setSelectedFigure(fig);
                  setMessages([]);
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedFigure.id === fig.id 
                  ? 'bg-amber-50 border-amber-300 shadow-sm' 
                  : 'bg-white border-stone-200 hover:border-stone-400'
                }`}
              >
                <div className="font-bold text-stone-900">{fig.name}</div>
                <div className="text-xs text-stone-500">{fig.description}</div>
              </button>
            ))}
          </div>

          {selectedFigure.id === 'custom' && (
            <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <input
                type="text"
                placeholder="인물 이름을 입력하세요 (예: 칭기즈칸)"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="md:col-span-2 flex flex-col h-[600px] bg-stone-50 rounded-2xl border border-stone-200">
          <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-white rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-700">
                <User size={20} />
              </div>
              <div>
                <h3 className="font-bold text-stone-900">{activeName || '인물을 선택하세요'}</h3>
                <p className="text-xs text-green-600 font-medium">연결됨 (실시간 대화 가능)</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-2 opacity-60">
                <Bot size={48} />
                <p className="font-medium">{activeName}에게 질문을 시작해보세요.</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl ${
                  msg.role === 'user' 
                  ? 'bg-amber-600 text-white rounded-tr-none shadow-md' 
                  : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none shadow-sm'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-stone-200 shadow-sm">
                  <Loader2 className="animate-spin text-amber-600" size={20} />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-stone-200 rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="역사 인물에게 궁금한 점을 질문하세요..."
                className="flex-1 p-3 bg-stone-100 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none border-none transition-all"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-amber-600 text-white p-3 rounded-xl hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-600/20"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryChat;