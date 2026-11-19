'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import { Button, Card } from '@/components/ui';
import { Check, Copy, Eye, ShieldCheck, Terminal } from 'lucide-react';
import { useStudio } from '@/components/studio/context/StudioContext';

export function StudioRemoteGuard() {
  const { t, hostname, copiedCli, copyStudioCommand, setIsLocalHost } = useStudio();

  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-12 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-full bg-(--atom-color-warning)/10 text-(--atom-color-warning) flex items-center justify-center mb-6">
        <ShieldCheck className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight mb-3">{t('remoteGuardTitle')}</h2>
      <p className="text-sm text-(--text-secondary) max-w-lg mb-8 leading-relaxed">
        {t('remoteGuardDesc')} (현재 호스트:{' '}
        <code className="font-mono bg-(--bg-secondary) px-2 py-0.5 rounded text-xs">
          {hostname}
        </code>
        )
      </p>

      <Card className="w-full max-w-md p-6 bg-(--bg-secondary)/40 border border-(--border-subtle) rounded-(--radius) text-left mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Terminal className="w-4 h-4 text-(--accent-primary)" />
          <span className="text-xs font-mono font-bold uppercase text-(--text-secondary)">
            로컬 개발 서버 실행 방법
          </span>
        </div>
        <p className="text-xs text-(--text-secondary) mb-4">
          터미널에서 아래 명령어를 실행하여 로컬 포트(localhost:3000)에서 실행하세요.
        </p>
        <div className="flex items-center justify-between p-3 rounded bg-(--bg-primary) border border-(--border-subtle) font-mono text-xs">
          <code>npx atomsystem studio</code>
          <Button
            variant="secondary"
            size="sm"
            onClick={copyStudioCommand}
            className="text-xs py-1 px-2.5 h-auto flex items-center gap-1"
          >
            {copiedCli ? (
              <Check className="w-3.5 h-3.5 text-(--atom-color-success)" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copiedCli ? t('copiedCli') : t('copyCli')}</span>
          </Button>
        </div>
      </Card>

      <div className="flex items-center gap-3">
        <Link href="/">
          <Button variant="secondary" size="sm">
            {t('returnHome')}
          </Button>
        </Link>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsLocalHost(true)}
          className="text-xs"
        >
          <Eye className="w-3.5 h-3.5 mr-1.5" />
          <span>미리보기 모드로 계속 진행</span>
        </Button>
      </div>
    </main>
  );
}
