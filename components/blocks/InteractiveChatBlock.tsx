'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Paperclip, MoreVertical, CheckCheck } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  '🎨 primary 브랜드 색상 변경 방법',
  '📐 8pt 그리드 스페이싱 토큰 조회',
  '⚡ 다크모드 자동 전환 구현 가이드',
  '🚀 0KB 런타임 CSS 내보내기'
];

export function InteractiveChatBlock() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: '안녕하세요! AtomDesignToken 대화형 어시스턴트입니다. 무엇이든 물어보세요. 디자인 시스템 구축과 토큰 확장을 신속히 도와드립니다.',
      timestamp: '오전 10:24',
    },
    {
      id: 'm2',
      sender: 'user',
      text: '디자인 토큰을 Tailwind v4 프로젝트에 어떻게 연결하나요?',
      timestamp: '오전 10:25',
    },
    {
      id: 'm3',
      sender: 'assistant',
      text: '@import "tailwindcss"; 설정 후 css/atom-ui.css를 최상단에 import하면 모든 --atom-* CSS 변수가 @theme 규칙과 자동 동기화되어 즉시 클래스로 활용할 수 있습니다!',
      timestamp: '오전 10:25',
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const now = new Date();
    const timeStr = `${now.getHours() < 12 ? '오전' : '오후'} ${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newUserMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // AI 자동 답변 시뮬레이션
    setTimeout(() => {
      let replyText = '문의해주신 내용에 대한 표준 가이드라인이 준비되었습니다. AtomDesignToken의 W3C DTCG 토큰 명세를 통해 모든 프레임워크에서 100% 일관된 UI를 유지할 수 있습니다.';
      if (text.includes('색상') || text.includes('primary')) {
        replyText = '브랜드 기본 색상은 `--atom-primary: #3182f6;` 토큰으로 정의되어 있으며, Theme Editor에서 슬라이더나 프리셋을 통해 실시간으로 변경하고 즉시 내보낼 수 있습니다.';
      } else if (text.includes('그리드') || text.includes('스페이싱')) {
        replyText = '스페이싱 토큰은 4px 기반으로 `--spacing-1: 4px;`, `--spacing-2: 8px;`, `--spacing-4: 16px;` 순으로 균일하게 모듈화되어 있습니다.';
      } else if (text.includes('다크모드')) {
        replyText = '최상위 html 태그의 `data-theme="dark"` 속성 또는 `.dark` 클래스를 토글하면 모든 시맨틱 색상 토큰이 부드러운 트랜지션과 함께 즉시 반전됩니다.';
      }

      const newBotMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: timeStr,
      };

      setMessages((prev) => [...prev, newBotMsg]);
      setIsTyping(false);
    }, 1100);
  };

  return (
    <div className="w-full bg-(--bg-primary) rounded-2xl border border-(--border-subtle) shadow-sm overflow-hidden flex flex-col h-[520px] transition-colors">
      {/* Chat Header */}
      <div className="px-5 py-3.5 border-b border-(--border-subtle) bg-(--bg-secondary)/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-(--accent-primary) flex items-center justify-center text-white shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-(--bg-primary)" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-(--text-primary)">Atom AI Agent</h3>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-(--accent-primary)/10 text-(--accent-primary)">
                온라인
              </span>
            </div>
            <p className="text-[11px] text-(--text-muted)">평균 응답 속도 0.8초 · 디자인 시스템 도우미</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMessages(messages.slice(0, 1))}
            className="text-xs text-(--text-muted) hover:text-(--text-primary) px-2 py-1 rounded transition-colors"
          >
            대화 비우기
          </button>
          <button className="p-1.5 text-(--text-muted) hover:text-(--text-primary) rounded-lg transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Feed */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex items-end gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                  isUser
                    ? 'bg-(--bg-secondary) text-(--text-secondary) border border-(--border-subtle)'
                    : 'bg-(--accent-primary)/15 text-(--accent-primary)'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[78%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-(--accent-primary) text-white rounded-br-xs shadow-xs'
                      : 'bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle) rounded-bl-xs'
                  }`}
                >
                  {m.text}
                </div>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-(--text-muted)">
                  <span>{m.timestamp}</span>
                  {isUser && <CheckCheck className="w-3 h-3 text-(--accent-primary)" />}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing Pulse Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-(--accent-primary)/15 text-(--accent-primary) flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="bg-(--bg-secondary) border border-(--border-subtle) px-3 py-2 rounded-2xl rounded-bl-xs flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-(--accent-primary) animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-(--accent-primary) animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-(--accent-primary) animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Chips */}
      <div className="px-4 py-2 bg-(--bg-primary) border-t border-(--border-subtle) flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-full bg-(--bg-secondary) hover:bg-(--border-subtle) text-(--text-secondary) hover:text-(--text-primary) border border-(--border-subtle) transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-3 sm:p-4 bg-(--bg-primary) border-t border-(--border-subtle)">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <button
            type="button"
            className="p-2 text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-secondary) rounded-xl transition-colors shrink-0"
            title="첨부 파일"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="AI 에이전트에게 메시지를 입력하세요 (Enter 전송)..."
            className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle) focus:outline-none focus:border-(--accent-primary) placeholder:text-(--text-muted) transition-colors"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="p-2.5 rounded-xl bg-(--accent-primary) hover:bg-(--accent-hover) disabled:opacity-40 disabled:hover:bg-(--accent-primary) text-white font-medium shadow-xs transition-colors shrink-0"
            title="전송"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
