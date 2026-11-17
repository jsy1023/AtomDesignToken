'use client';

import React, { useState } from 'react';
import {
  Card,
  Button,
  Badge,
  Input,
  TabsList,
  TabsTrigger,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Activity,
  CreditCard,
  Download,
  Filter,
  Search,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: 'dollar' | 'users' | 'activity' | 'card';
}

export interface TransactionItem {
  id: string;
  customer: string;
  email: string;
  plan: string;
  amount: string;
  status: 'active' | 'pending' | 'failed';
  date: string;
}

const INITIAL_METRICS: KpiMetric[] = [
  { id: 'arr', label: '연간 반복 매출 (ARR)', value: '₩124.8M', change: '+14.2%', isPositive: true, icon: 'dollar' },
  { id: 'users', label: '활성 구독 고객 (Active)', value: '1,429명', change: '+8.6%', isPositive: true, icon: 'users' },
  { id: 'conversion', label: '전환율 (Conversion)', value: '4.82%', change: '+1.1%', isPositive: true, icon: 'activity' },
  { id: 'churn', label: '월간 이탈률 (Churn)', value: '0.84%', change: '-0.3%', isPositive: true, icon: 'card' },
];

const INITIAL_TRANSACTIONS: TransactionItem[] = [
  { id: 'TX-901', customer: '(주)디에스앤텍', email: 'billing@dsntech.com', plan: 'Enterprise Pro', amount: '₩4,500,000', status: 'active', date: '오늘 14:20' },
  { id: 'TX-902', customer: '네오스튜디오', email: 'admin@neostudio.io', plan: 'Team Annual', amount: '₩1,200,000', status: 'active', date: '오늘 11:05' },
  { id: 'TX-903', customer: '알파랩스', email: 'finance@alphalabs.kr', plan: 'Starter Monthly', amount: '₩190,000', status: 'pending', date: '어제 18:40' },
  { id: 'TX-904', customer: '클라우드웨이브', email: 'dev@cloudwave.co', plan: 'Enterprise Custom', amount: '₩8,900,000', status: 'active', date: '2026-11-14' },
  { id: 'TX-905', customer: '헤럴드미디어', email: 'ops@herald.net', plan: 'Team Annual', amount: '₩1,200,000', status: 'failed', date: '2026-11-13' },
];

export function EnterpriseDashboardUseCase() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'failed'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredTransactions = INITIAL_TRANSACTIONS.filter((tx) => {
    const matchesSearch =
      tx.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const getMetricIcon = (icon: KpiMetric['icon']) => {
    switch (icon) {
      case 'dollar':
        return <DollarSign className="w-5 h-5 text-(--accent-primary)" />;
      case 'users':
        return <Users className="w-5 h-5 text-(--accent-primary)" />;
      case 'activity':
        return <Activity className="w-5 h-5 text-(--accent-primary)" />;
      case 'card':
        return <CreditCard className="w-5 h-5 text-(--accent-primary)" />;
    }
  };

  const getStatusBadge = (status: TransactionItem['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="primary">완료 (Active)</Badge>;
      case 'pending':
        return <Badge variant="neutral">처리중 (Pending)</Badge>;
      case 'failed':
        return <Badge variant="destructive">실패 (Failed)</Badge>;
    }
  };

  return (
    <div className="w-full flex flex-col gap-(--space-6) animate-in fade-in">
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-(--space-4) pb-(--space-4) border-b border-(--border-subtle)">
        <div>
          <div className="flex items-center gap-(--space-2) mb-1">
            <span className="font-mono text-xs px-2 py-0.5 rounded-(--radius-sm) bg-(--bg-secondary) text-(--text-secondary) border border-(--border-subtle) flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-(--accent-primary)" />
              AtomSystem UseCase #01
            </span>
            <span className="text-xs font-mono text-(--text-muted)">B2B SaaS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-(--text-primary)">
            성과 분석 & 고객 결제 관리 대시보드
          </h2>
          <p className="text-xs sm:text-sm text-(--text-secondary) mt-0.5">
            토큰 단일 진실 공급원(SSOT)과 고접근성 원자 컴포넌트로만 구축된 완성형 엔터프라이즈 솔루션
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-(--space-2) shrink-0">
          {/* Time Range Tabs */}
          <div className="bg-(--bg-secondary) p-1 rounded-(--radius) border border-(--border-subtle) flex items-center gap-1">
            {(['7d', '30d', '90d', '1y'] as const).map((r) => (
              <Button
                key={r}
                variant={timeRange === r ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setTimeRange(r)}
                className={`px-2.5 py-1 text-xs h-auto rounded-(--radius-sm) ${
                  timeRange === r
                    ? 'font-semibold'
                    : 'text-(--text-muted) hover:text-(--text-primary)'
                }`}
              >
                {r === '7d' ? '7일' : r === '30d' ? '30일' : r === '90d' ? '3개월' : '1년'}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="flex items-center gap-1.5"
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>새로고침</span>
          </Button>

          <Button variant="primary" size="sm" className="flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" />
            <span>CSV 내보내기</span>
          </Button>
        </div>
      </div>

      {/* 2. 4-KPI Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-(--space-4)">
        {INITIAL_METRICS.map((kpi) => (
          <Card key={kpi.id} className="p-(--space-5) bg-(--bg-primary) border border-(--border-subtle) rounded-(--radius)">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-(--text-secondary)">{kpi.label}</span>
              <div className="w-9 h-9 rounded-(--radius-sm) bg-(--bg-secondary) flex items-center justify-center border border-(--border-subtle)">
                {getMetricIcon(kpi.icon)}
              </div>
            </div>
            <div className="text-2xl font-black tracking-tight text-(--text-primary) mb-1.5">
              {kpi.value}
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span
                className={`font-semibold flex items-center gap-0.5 ${
                  kpi.isPositive
                    ? 'text-(--atom-color-success) dark:text-(--atom-color-success)'
                    : 'text-(--atom-color-destructive) dark:text-(--atom-color-destructive)'
                }`}
              >
                {kpi.isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {kpi.change}
              </span>
              <span className="text-(--text-muted)">지난 기간 대비</span>
            </div>
          </Card>
        ))}
      </div>

      {/* 3. Transaction Management Table Section */}
      <Card className="p-(--space-5) bg-(--bg-primary) border border-(--border-subtle) rounded-(--radius) flex flex-col gap-(--space-4)">
        {/* Table Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-(--space-3)">
          <div className="flex items-center gap-(--space-2) flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)" />
              <Input
                type="text"
                placeholder="고객명, 이메일, 거래번호 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-(--space-2)">
            <span className="text-xs text-(--text-secondary) font-medium flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-(--text-muted)" />
              상태 필터:
            </span>
            <div className="flex items-center gap-1">
              {(['all', 'active', 'pending', 'failed'] as const).map((st) => (
                <Button
                  key={st}
                  variant={statusFilter === st ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter(st)}
                  className={`px-2 py-1 text-xs h-auto rounded-(--radius-sm) ${
                    statusFilter === st
                      ? 'font-semibold'
                      : 'text-(--text-secondary) hover:text-(--text-primary)'
                  }`}
                >
                  {st === 'all' ? '전체' : st === 'active' ? '완료' : st === 'pending' ? '처리중' : '실패'}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Accessible Data Table */}
        <div className="overflow-x-auto rounded-(--radius-sm) border border-(--border-subtle)">
          <Table className="w-full text-left text-xs">
            <TableHeader className="bg-(--bg-secondary)/50 border-b border-(--border-subtle)">
              <TableRow>
                <TableHead className="p-3 font-semibold text-(--text-primary)">거래번호 (ID)</TableHead>
                <TableHead className="p-3 font-semibold text-(--text-primary)">고객사 / 이메일</TableHead>
                <TableHead className="p-3 font-semibold text-(--text-primary)">구독 플랜</TableHead>
                <TableHead className="p-3 font-semibold text-(--text-primary)">결제 금액</TableHead>
                <TableHead className="p-3 font-semibold text-(--text-primary)">상태</TableHead>
                <TableHead className="p-3 font-semibold text-(--text-primary)">결제 일시</TableHead>
                <TableHead className="p-3 font-semibold text-(--text-primary) text-right">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-(--border-subtle)">
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="p-8 text-center text-(--text-muted)">
                    검색 결과와 일치하는 거래 내역이 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((tx) => (
                  <TableRow key={tx.id} className="hover:bg-(--bg-secondary)/40 transition-colors">
                    <TableCell className="p-3 font-mono font-medium text-(--text-primary)">
                      {tx.id}
                    </TableCell>
                    <TableCell className="p-3">
                      <div className="font-semibold text-(--text-primary)">{tx.customer}</div>
                      <div className="text-[11px] text-(--text-muted)">{tx.email}</div>
                    </TableCell>
                    <TableCell className="p-3 font-medium text-(--text-secondary)">
                      {tx.plan}
                    </TableCell>
                    <TableCell className="p-3 font-mono font-semibold text-(--text-primary)">
                      {tx.amount}
                    </TableCell>
                    <TableCell className="p-3">
                      {getStatusBadge(tx.status)}
                    </TableCell>
                    <TableCell className="p-3 text-(--text-secondary)">
                      {tx.date}
                    </TableCell>
                    <TableCell className="p-3 text-right">
                      <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                        상세 영수증
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer Summary */}
        <div className="flex items-center justify-between text-xs text-(--text-muted) pt-2">
          <span>총 {filteredTransactions.length}건의 거래 내역 조회됨</span>
          <span className="font-mono">W3C DTCG Token Reactive System</span>
        </div>
      </Card>
    </div>
  );
}
