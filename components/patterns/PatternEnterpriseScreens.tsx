'use client';

import React, { useState } from 'react';
import {
  AlertCircle,
  BookOpen,
  Check,
  CheckCircle2,
  Copy,
  Globe,
  HelpCircle,
  Lock,
  RefreshCw,
  Save,
  Settings,
  ShieldCheck,
  Sparkles,
  Terminal,
} from 'lucide-react';
import {
  Button,
  Checkbox,
  Input,
  NativeSelect,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';

export function DeveloperDocsScreen() {
  const [activeDocNav, setActiveDocNav] = useState('quickstart');
  const [copiedDocSnippet, setCopiedDocSnippet] = useState(false);

  return (
    <div className="flex gap-4 h-full">
      <div className="w-48 shrink-0 bg-(--bg-secondary)/60 border border-(--border-subtle)/80 rounded-xl p-3 flex flex-col gap-3 text-xs">
        <div className="flex items-center gap-1.5 pb-2 border-b border-(--border-subtle)/60">
          <BookOpen className="w-4 h-4 text-(--accent-primary)" />
          <span className="font-bold text-(--text-primary)">DOCS v1.2</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-(--text-muted) uppercase tracking-wider">시작하기</span>
          {[
            { id: 'quickstart', label: '빠른 시작 가이드' },
            { id: 'installation', label: 'CLI 라이브러리 설치' },
            { id: 'dtcg-spec', label: 'W3C 토큰 표준 규격' },
          ].map((item) => (
            <Button
              key={item.id}
              variant={activeDocNav === item.id ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveDocNav(item.id)}
              className={`w-full justify-start text-left px-2.5 py-1.5 h-auto font-medium ${
                activeDocNav === item.id ? 'font-bold shadow-xs' : 'text-(--text-secondary)'
              }`}
            >
              {item.label}
            </Button>
          ))}
        </div>

        <div className="flex flex-col gap-1 pt-1 border-t border-(--border-subtle)/50">
          <span className="text-[10px] font-bold text-(--text-muted) uppercase tracking-wider">API 레퍼런스</span>
          {[
            { id: 'button-api', label: 'Button API' },
            { id: 'input-api', label: 'Input API' },
            { id: 'dialog-api', label: 'Modal / Dialog' },
          ].map((item) => (
            <Button
              key={item.id}
              variant={activeDocNav === item.id ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveDocNav(item.id)}
              className={`w-full justify-start text-left px-2.5 py-1.5 h-auto font-medium ${
                activeDocNav === item.id ? 'font-bold shadow-xs' : 'text-(--text-secondary)'
              }`}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4 text-xs">
        <div className="flex items-center gap-1.5 text-[11px] text-(--text-muted) font-medium">
          <span>Docs</span>
          <span>/</span>
          <span>Getting Started</span>
          <span>/</span>
          <span className="text-(--accent-primary) font-bold">Quickstart</span>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-(--text-primary)">개발자 빠른 시작 가이드 (Quickstart)</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-(--atom-color-success)/10 text-(--atom-color-success) font-bold border border-(--atom-color-success)/30">
              Latest v0.15
            </span>
          </div>
          <p className="text-(--text-secondary) mt-1 leading-relaxed">
            AtomSystem은 React, Vue, 바닐라 웹 등 모든 프론트엔드 환경에서 디자인 토큰과 UI 컴포넌트를 즉시 바인딩할 수 있도록 표준 CSS 변수와 사전 컴파일된 스타일 딕셔너리를 제공합니다.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-(--bg-secondary) text-(--text-primary) flex flex-col gap-2 font-mono border border-(--border-subtle)">
          <div className="flex items-center justify-between text-[11px] text-(--text-muted) pb-1.5 border-b border-(--border-subtle)">
            <span className="flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-(--atom-color-success)" />
              Terminal CLI
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText('npx atomsystem init');
                setCopiedDocSnippet(true);
                setTimeout(() => setCopiedDocSnippet(false), 2000);
              }}
              className="inline-flex items-center gap-1 text-[10px] text-(--text-secondary) hover:text-(--text-primary) h-auto p-0"
            >
              {copiedDocSnippet ? <Check className="w-3 h-3 text-(--atom-color-success)" /> : <Copy className="w-3 h-3" />}
              <span>{copiedDocSnippet ? '복사완료!' : '복사'}</span>
            </Button>
          </div>
          <div className="text-(--atom-color-success) text-xs">$ npx atomsystem init</div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="font-bold text-(--text-primary)">2. 컴포넌트 임포트 및 사용</span>
          <div className="p-3.5 rounded-xl bg-(--bg-secondary) text-(--text-primary) font-mono text-[11px] leading-relaxed overflow-x-auto border border-(--border-subtle)">
            <div className="text-(--text-muted)">// React / Next.js 프로젝트</div>
            <div>
              <span className="text-(--accent-primary)">import</span> &#123; Button, Input &#125;{' '}
              <span className="text-(--accent-primary)">from</span>{' '}
              <span className="text-(--atom-color-success)">&apos;atomsystem&apos;</span>;
            </div>
            <div className="mt-1">
              <span className="text-(--accent-primary)">&lt;Button</span> variant=
              <span className="text-(--atom-color-success)">&quot;primary&quot;</span> size=
              <span className="text-(--atom-color-success)">&quot;lg&quot;</span>&gt;
            </div>
            <div className="pl-4">지금 시작하기</div>
            <div>
              <span className="text-(--accent-primary)">&lt;/Button&gt;</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-bold text-(--text-primary)">Button Props 규격</span>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="p-2">Property</TableHead>
                <TableHead className="p-2">Type</TableHead>
                <TableHead className="p-2">Default</TableHead>
                <TableHead className="p-2">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="p-2 font-mono font-bold text-(--accent-primary)">variant</TableCell>
                <TableCell className="p-2 font-mono text-(--text-muted)">&apos;primary&apos; | &apos;secondary&apos; | &apos;outline&apos;</TableCell>
                <TableCell className="p-2 font-mono">&apos;primary&apos;</TableCell>
                <TableCell className="p-2 text-(--text-secondary)">버튼 시각적 스타일 배리언트</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="p-2 font-mono font-bold text-(--accent-primary)">loading</TableCell>
                <TableCell className="p-2 font-mono text-(--text-muted)">boolean</TableCell>
                <TableCell className="p-2 font-mono">false</TableCell>
                <TableCell className="p-2 text-(--text-secondary)">로딩 스피너 및 비활성화 상태 토글</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="w-40 shrink-0 border-l border-(--border-subtle)/80 pl-3 flex flex-col gap-2 text-xs">
        <span className="text-[10px] font-bold text-(--text-muted) uppercase tracking-wider">On this page</span>
        <ul className="flex flex-col gap-1.5 text-[11px]">
          <li className="font-bold text-(--accent-primary) cursor-pointer">빠른 시작 개요</li>
          <li className="text-(--text-secondary) hover:text-(--text-primary) cursor-pointer">1. CLI 라이브러리 설치</li>
          <li className="text-(--text-secondary) hover:text-(--text-primary) cursor-pointer">2. 컴포넌트 임포트</li>
          <li className="text-(--text-secondary) hover:text-(--text-primary) cursor-pointer">3. Button Props 규격</li>
        </ul>
      </div>
    </div>
  );
}

export function ComplexFormSettingsScreen() {
  const [activeFormTab, setActiveFormTab] = useState<'general' | 'security' | 'webhooks' | 'danger'>('general');
  const [formValues, setFormValues] = useState({
    projectName: 'acme-commerce-api',
    environment: 'production',
    customDomain: 'api.acme-store.com',
    enable2FA: true,
    sessionTimeout: '30m',
    enableWebhooks: true,
    webhookUrl: 'https://api.acme.com/v1/events',
    secretKey: 'whsec_9948291034821',
    eventOrders: true,
    eventUsers: false,
    deleteConfirmText: '',
  });
  const [initialFormValues, setInitialFormValues] = useState({ ...formValues });
  const [isSavedFeedback, setIsSavedFeedback] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const isFormDirty = JSON.stringify(formValues) !== JSON.stringify(initialFormValues);
  const domainError =
    formValues.customDomain && !formValues.customDomain.includes('.')
      ? '유효한 도메인 주소(예: api.example.com) 형식이 아닙니다.'
      : '';

  const handleSaveForm = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setInitialFormValues({ ...formValues });
      setIsSavedFeedback(true);
      setTimeout(() => setIsSavedFeedback(false), 2500);
    }, 600);
  };

  return (
    <div className="relative flex flex-col h-full gap-4 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-(--border-subtle) shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-(--text-primary)">엔터프라이즈 프로젝트 환경설정</h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-(--accent-primary)/10 text-(--accent-primary) border border-(--accent-primary)/20">
              Best UX Form
            </span>
          </div>
          <p className="text-[11px] text-(--text-secondary) mt-0.5">
            섹션 청킹, 점진적 공개, 인라인 유효성 검사, 하단 플로팅 세이브 바가 결합된 모범 사례입니다.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-[11px]">
          {isSavedFeedback ? (
            <span className="flex items-center gap-1 text-(--atom-color-success) font-bold bg-(--atom-color-success)/10 px-2.5 py-1 rounded-lg border border-(--atom-color-success)/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              변경사항이 저장되었습니다!
            </span>
          ) : isFormDirty ? (
            <span className="flex items-center gap-1 text-(--atom-color-warning) font-semibold bg-(--atom-color-warning)/10 px-2.5 py-1 rounded-lg border border-(--atom-color-warning)/30">
              <AlertCircle className="w-3.5 h-3.5" />
              저장되지 않은 변경사항 있음
            </span>
          ) : (
            <span className="flex items-center gap-1 text-(--text-muted) px-2 py-1">
              <Check className="w-3 h-3" />
              모든 변경사항 최신 동기화됨
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 flex gap-5 overflow-hidden">
        <div className="w-44 shrink-0 flex flex-col gap-1 border-r border-(--border-subtle)/80 pr-3">
          <span className="text-[10px] font-bold text-(--text-muted) uppercase tracking-wider mb-1 px-2">설정 카테고리</span>
          {[
            { id: 'general', label: '일반 설정', icon: Settings },
            { id: 'security', label: '보안 & 2FA', icon: Lock },
            { id: 'webhooks', label: '웹훅 & 이벤트', icon: Globe },
            { id: 'danger', label: '위험 구역', icon: AlertCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFormTab === tab.id;
            return (
              <Button
                key={tab.id}
                variant={isActive ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveFormTab(tab.id as typeof activeFormTab)}
                className={`flex items-center justify-start gap-2 w-full text-xs ${
                  tab.id === 'danger' && !isActive ? 'hover:text-(--atom-color-destructive)' : ''
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </Button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto pr-2 pb-16 space-y-5">
          {activeFormTab === 'general' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-(--border-subtle) bg-(--bg-primary) space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-(--text-primary)">프로젝트 식별자 (Project Name)</label>
                  <span className="text-[10px] font-mono text-(--text-muted)">필수</span>
                </div>
                <p className="text-[11px] text-(--text-secondary)">API 엔드포인트와 내부 리소스 네임스페이스에 고유하게 사용되는 식별자입니다.</p>
                <Input
                  type="text"
                  value={formValues.projectName}
                  onChange={(e) => setFormValues({ ...formValues, projectName: e.target.value })}
                  className="font-mono text-xs"
                />
              </div>

              <div className="p-4 rounded-xl border border-(--border-subtle) bg-(--bg-primary) space-y-2.5">
                <label className="font-bold text-(--text-primary) block">배포 환경 (Deployment Environment)</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'production', name: 'Production', desc: '실서비스 및 SLA 99.9%' },
                    { id: 'staging', name: 'Staging', desc: '사전 QA 검증 환경' },
                    { id: 'development', name: 'Development', desc: '로컬 개발 및 샌드박스' },
                  ].map((env) => (
                    <Button
                      key={env.id}
                      variant={formValues.environment === env.id ? 'primary' : 'outline'}
                      size="sm"
                      type="button"
                      onClick={() => setFormValues({ ...formValues, environment: env.id })}
                      className="p-2.5 h-auto flex flex-col items-start text-left"
                    >
                      <div className="font-bold text-xs">{env.name}</div>
                      <div className="text-[10px] opacity-70 font-normal">{env.desc}</div>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-(--border-subtle) bg-(--bg-primary) space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <label className="font-bold text-(--text-primary)">커스텀 도메인 (Custom Domain)</label>
                    <span className="text-[10px] text-(--text-muted)">(선택)</span>
                  </div>
                  <span className="text-[10px] text-(--accent-primary) flex items-center gap-1">
                    <HelpCircle className="w-3 h-3" />
                    CNAME DNS 레코드 안내
                  </span>
                </div>
                <div className="relative">
                  <Input
                    type="text"
                    value={formValues.customDomain}
                    onChange={(e) => setFormValues({ ...formValues, customDomain: e.target.value })}
                    placeholder="예: api.yourcompany.com"
                    className="font-mono text-xs"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {domainError ? (
                      <AlertCircle className="w-4 h-4 text-(--atom-color-destructive)" />
                    ) : formValues.customDomain ? (
                      <CheckCircle2 className="w-4 h-4 text-(--atom-color-success)" />
                    ) : null}
                  </div>
                </div>
                {domainError ? (
                  <p className="text-[11px] text-(--atom-color-destructive) font-medium">{domainError}</p>
                ) : (
                  <p className="text-[11px] text-(--text-muted)">HTTPS SSL 인증서가 무료로 자동 발급 및 갱신됩니다.</p>
                )}
              </div>
            </div>
          )}

          {activeFormTab === 'security' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-(--border-subtle) bg-(--bg-primary) flex items-center justify-between">
                <div>
                  <div className="font-bold text-(--text-primary) flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-(--accent-primary)" />
                    조직원 2단계 인증(2FA) 강제
                  </div>
                  <p className="text-[11px] text-(--text-secondary) mt-0.5">모든 팀원이 로그인 시 OTP 또는 하드웨어 보안키를 필수로 인증합니다.</p>
                </div>
                <Switch checked={formValues.enable2FA} onCheckedChange={(checked: boolean) => setFormValues({ ...formValues, enable2FA: checked })} />
              </div>

              <div className="p-4 rounded-xl border border-(--border-subtle) bg-(--bg-primary) space-y-2">
                <label className="font-bold text-(--text-primary) block">유휴 세션 자동 로그아웃 시간</label>
                <NativeSelect
                  value={formValues.sessionTimeout}
                  onChange={(e) => setFormValues({ ...formValues, sessionTimeout: e.target.value })}
                  className="w-full text-xs"
                >
                  <option value="15m">15분 (가장 엄격)</option>
                  <option value="30m">30분 (권장)</option>
                  <option value="1h">1시간</option>
                  <option value="8h">8시간 (근무 시간)</option>
                </NativeSelect>
              </div>
            </div>
          )}

          {activeFormTab === 'webhooks' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-(--border-subtle) bg-(--bg-primary) flex items-center justify-between">
                <div>
                  <div className="font-bold text-(--text-primary) flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-(--atom-color-success)" />
                    실시간 웹훅(Webhooks) 이벤트 발송
                  </div>
                  <p className="text-[11px] text-(--text-secondary) mt-0.5">주문, 결제, 회원 상태 변경 시 외부 서버로 HTTP POST 요청을 보냅니다.</p>
                </div>
                <Switch checked={formValues.enableWebhooks} onCheckedChange={(checked: boolean) => setFormValues({ ...formValues, enableWebhooks: checked })} />
              </div>

              {formValues.enableWebhooks ? (
                <div className="p-4 rounded-xl border border-(--atom-color-success)/30 bg-(--atom-color-success)/5 space-y-3.5">
                  <div className="flex items-center gap-1.5 text-(--atom-color-success) font-bold text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>웹훅 상세 엔드포인트 설정 (활성화됨)</span>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-(--text-secondary)">수신 엔드포인트 URL (Webhook Endpoint)</label>
                    <Input type="text" value={formValues.webhookUrl} onChange={(e) => setFormValues({ ...formValues, webhookUrl: e.target.value })} className="font-mono text-xs" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-(--text-secondary)">서명 검증 시크릿 키 (Signing Secret)</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        onClick={() => navigator.clipboard.writeText(formValues.secretKey)}
                        className="text-(--atom-color-success) hover:underline flex items-center gap-1 h-auto p-0 text-[11px]"
                      >
                        <Copy className="w-3 h-3" />
                        복사
                      </Button>
                    </div>
                    <Input type="text" readOnly value={formValues.secretKey} className="font-mono text-xs opacity-70" />
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-semibold text-(--text-secondary) block">구독할 이벤트 트리거</span>
                    <div className="flex items-center gap-4 text-xs">
                      <Checkbox checked={formValues.eventOrders} onChange={(e) => setFormValues({ ...formValues, eventOrders: e.target.checked })} label="order.created / order.paid" />
                      <Checkbox checked={formValues.eventUsers} onChange={(e) => setFormValues({ ...formValues, eventUsers: e.target.checked })} label="user.signup / user.deleted" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-dashed border-(--border-subtle) text-center text-[11px] text-(--text-muted) py-6">
                  웹훅 기능을 활성화하면 엔드포인트 URL 및 시크릿 키 설정이 노출됩니다.
                </div>
              )}
            </div>
          )}

          {activeFormTab === 'danger' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-(--atom-color-destructive)/40 bg-(--atom-color-destructive)/5 space-y-3">
                <div className="flex items-center gap-2 text-(--atom-color-destructive) font-bold">
                  <AlertCircle className="w-4 h-4" />
                  <span>프로젝트 영구 삭제 (Danger Zone)</span>
                </div>
                <p className="text-[11px] text-(--text-secondary) leading-relaxed">
                  이 작업은 즉시 모든 프로덕션 데이터베이스, API 키, 결제 연동 내역을 삭제하며 되돌릴 수 없습니다.
                </p>
                <div className="space-y-1.5 pt-1">
                  <label className="text-[11px] font-semibold text-(--text-secondary)">
                    확인을 위해 <span className="font-mono text-(--atom-color-destructive) font-bold">delete acme-commerce-api</span> 를 입력하세요:
                  </label>
                  <Input
                    type="text"
                    value={formValues.deleteConfirmText}
                    onChange={(e) => setFormValues({ ...formValues, deleteConfirmText: e.target.value })}
                    placeholder="delete acme-commerce-api"
                    className="font-mono text-xs"
                  />
                </div>
                <Button
                  variant="destructive"
                  size="md"
                  type="button"
                  disabled={formValues.deleteConfirmText !== 'delete acme-commerce-api'}
                  className="w-full font-bold text-xs"
                >
                  프로젝트 영구 삭제 확정
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 p-3 bg-(--bg-secondary)/95 rounded-xl shadow-2xl border border-(--border-strong) flex items-center justify-between transition-all duration-300 backdrop-blur-md ${
          isFormDirty ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-12 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-(--atom-color-warning) animate-pulse" />
          <span className="text-xs font-semibold text-(--text-primary)">
            수정된 변경사항이 있습니다. 저장하지 않으면 변경 내용이 유실됩니다.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" type="button" onClick={() => setFormValues({ ...initialFormValues })} className="text-xs text-(--text-secondary)">
            되돌리기 (Reset)
          </Button>
          <Button
            variant="primary"
            size="sm"
            type="button"
            onClick={handleSaveForm}
            disabled={isSaving || !!domainError}
            className="font-bold text-xs flex items-center gap-1.5"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>저장 중...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>변경사항 저장</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
