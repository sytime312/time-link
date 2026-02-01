
import React, { useState } from 'react';
import { getGeminiResponse } from '../services/geminiService.ts';
import { BrainCircuit, CheckCircle2, RotateCcw, Loader2 } from 'lucide-react';

const QuizBuilder: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [quiz, setQuiz] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setShowAnswer(false);

    const prompt = `'${topic}' 주제에 대해 단순 연도 암기가 아닌, '왜 그런 일이 일어났는지(원인)'와 '사건이 미친 영향(결과)'을 묻는 객관식 퀴즈 3문제를 만들어줘.
형식:
[문제 1]
...
(1) ...
(2) ...
(3) ...
(4) ...

---정답 및 해설---
...`;

    const response = await getGeminiResponse(prompt, 'pro');
    setQuiz(response);
    setIsGenerating(false);
  };

  const parts = quiz.split('---정답 및 해설---');
  const quizBody = parts[0];
  const answerBody = parts[1];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-stone-900 serif-title">사고력 증진 역사 퀴즈</h2>
        <p className="text-stone-500">단순한 암기를 넘어 인과관계를 추론해보세요.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          className="flex-1 p-4 bg-stone-100 border border-transparent rounded-xl focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all"
          placeholder="복습하고 싶은 주제를 입력하세요 (예: 산업 혁명, 로마의 멸망)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !topic.trim()}
          className="bg-amber-600 text-white px-8 py-4 rounded-xl hover:bg-amber-700 transition-all font-bold flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-amber-600/20"
        >
          {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <BrainCircuit size={20} />}
          퀴즈 생성하기
        </button>
      </div>

      {isGenerating && (
        <div className="py-20 flex flex-col items-center justify-center space-y-4">
          <div className="relative">
             <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
             <BrainCircuit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-600" size={24} />
          </div>
          <p className="text-stone-500 font-medium">생각하는 힘을 기르는 문제를 만드는 중...</p>
        </div>
      )}

      {quiz && !isGenerating && (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
          <div className="bg-white border-2 border-stone-200 rounded-2xl p-8 shadow-sm">
            <div className="whitespace-pre-wrap text-stone-800 text-lg leading-relaxed">
              {quizBody}
            </div>
            
            {!showAnswer ? (
              <button
                onClick={() => setShowAnswer(true)}
                className="mt-8 w-full bg-stone-900 text-white py-4 rounded-xl hover:bg-stone-800 transition-all font-bold flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={20} />
                정답 및 해설 보기
              </button>
            ) : (
              <div className="mt-8 pt-8 border-t-2 border-dashed border-stone-200 animate-in slide-in-from-top-4 duration-500">
                <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                  <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                    <CheckCircle2 size={20} />
                    정답 및 해설
                  </h4>
                  <div className="whitespace-pre-wrap text-stone-700 text-md italic">
                    {answerBody}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setQuiz('');
                    setTopic('');
                    setShowAnswer(false);
                  }}
                  className="mt-6 w-full bg-stone-100 text-stone-600 py-3 rounded-xl hover:bg-stone-200 transition-all font-bold flex items-center justify-center gap-2"
                >
                  <RotateCcw size={18} />
                  다른 퀴즈 도전하기
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizBuilder;