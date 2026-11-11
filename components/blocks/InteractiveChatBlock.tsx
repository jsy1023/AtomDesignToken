'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Input, Badge } from '@/components/ui';
import {
  Send,
  Bot,
  User,
  Paperclip,
  Check,
  Plus,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  '디자인 토큰 어떻게 설정하나요?',
  '4pt 그리드 스페이싱 규칙',
  '다크모드 컬러 전환',
  '0KB 런타임 CSS 빌드',
];

export function InteractiveChatBlock() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: '안녕하세요. 디자인 토큰 AI 어시스턴트입니다. 색상 시스템, 스페이싱 규격, 레이아웃에 관해 궁금한 점을 질문해보세요.',
      timestamp: '10:00 AM',
    },
    {
      id: 'm2',
      sender: 'user',
      text: '브랜드 primary 색상 토큰을 어떻게 바꾸나요?',
      timestamp: '10:01 AM',
    },
    {
      id: 'm3',
      sender: 'assistant',
      text: '우측 상단의 테마 에디터를 열거나, :root의 --atom-primary CSS 변수를 원하는 색상 코드로 지정하면 즉시 모든 컴포넌트에 반영됩니다.',
      timestamp: '10:01 AM',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = `"${text}"에 대한 디자인 토큰 가이드입니다. AtomDesignToken의 W3C DTCG 표준 규격에 따라 모든 변수는 CSS 변수(--atom-*)로 안전하게 컴파일됩니다.`;
      if (text.includes('primary') || text.includes('색상')) {
        replyText = 'Primary 브랜드 토큰은 css/atom-ui.css의 --atom-primary 변수로 선언되어 있으며, Tailwind v4 및 런타임 없는 순수 CSS로 상속됩니다.';
      } else if (text.includes('그리드') || text.includes('스페이싱')) {
        replyText = '스페이싱 토큰은 4px 배수 규격(--atom-space-1: 4px, --atom-space-2: 8px, --atom-space-4: 16px)으로 엄격히 관리됩니다.';
      } else if (text.includes('다크')) {
        replyText = '최상위 html 태그의 data-theme="dark" 속성을 통해 라이트/다크 시맨틱 토큰 매트릭스가 즉시 스위칭됩니다.';
      }

      const newBotMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: timeStr,
      };

      setMessages((prev) => [...prev, newBotMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <Card className="flex flex-col h-[480px] overflow-hidden bg-(--bg-primary) border border-(--border-subtle) transition-colors">
      {/* 1. Chat Header */}
      <div className="px-4 py-3 border-b border-(--border-subtle) flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-(--radius-sm) bg-(--bg-secondary) border border-(--border-subtle) text-(--text-primary) flex items-center justify-center font-bold text-xs">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-(--text-primary)">
              디자인 토큰 어시스턴트
            </div>
            <div className="text-[11px] text-(--text-muted)">온디맨드 응답</div>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setMessages(messages.slice(0, 1))}
          className="text-xs py-1 px-2.5 h-auto"
        >
          대화 초기화
        </Button>
      </div>

      {/* 2. Messages Scroll Area */}
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-(--bg-primary)">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-6 h-6 rounded-(--radius-sm) flex items-center justify-center text-xs shrink-0 ${
                  isUser
                    ? 'bg-(--text-primary) text-(--bg-primary)'
                    : 'bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle)'
                }`}
              >
                {isUser ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
              </div>

              <div className={`max-w-[75%] space-y-1 ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-3 rounded-(--radius) text-xs leading-relaxed ${
                    isUser
                      ? 'bg-(--text-primary) text-(--bg-primary) font-medium'
                      : 'bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle)'
                  }`}
                >
                  {m.text}
                </div>
                <div className={`text-[11px] text-(--text-muted) px-1 ${isUser ? 'text-right' : 'text-left'}`}>
                  {m.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-(--text-muted)">
            <Bot className="w-3.5 h-3.5" />
            <span>확인 중...</span>
          </div>
        )}
      </div>

      {/* 3. Quick Suggestion Pills */}
      <div className="px-3 py-2 border-t border-(--border-subtle) flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {QUICK_PROMPTS.map((q, idx) => (
          <Button
            key={idx}
            variant="outline"
            size="sm"
            onClick={() => handleSend(q)}
            className="shrink-0 text-xs py-1 px-2.5 h-auto whitespace-nowrap"
          >
            {q}
          </Button>
        ))}
      </div>

      {/* 4. Bottom Input Bar composed with Input & Button */}
      <div className="p-3 border-t border-(--border-subtle) bg-(--bg-primary)">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="디자인 시스템이나 토큰 규칙에 관해 질문하세요..."
            className="flex-1 text-xs px-3 py-2 rounded-(--radius-sm) bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle) focus:outline-none focus:border-(--border-strong) transition-colors"
          />
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => handleSend()}
            aria-label="전송"
            title="전송"
            className="p-2 h-auto"
          >
            <Send className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
