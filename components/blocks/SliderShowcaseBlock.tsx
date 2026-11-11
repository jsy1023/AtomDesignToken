'use client';

import React, { useState } from 'react';
import { Card, Button, Slider } from '@/components/ui';
import {
  Users,
  HardDrive,
  Cpu,
  FileSpreadsheet,
} from 'lucide-react';

export function SliderShowcaseBlock() {
  const [teamMembers, setTeamMembers] = useState<number>(15);
  const [storageGb, setStorageGb] = useState<number>(200);
  const [computeUnits, setComputeUnits] = useState<number>(4);

  const memberCost = teamMembers * 12000;
  const storageCost = storageGb * 150;
  const computeCost = computeUnits * 45000;
  const totalCost = memberCost + storageCost + computeCost;

  return (
    <Card className="overflow-hidden transition-colors">
      <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Input Panel composed with UI Slider */}
        <div className="lg:col-span-7 space-y-5">
          {/* Slider 1: Team Members */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-(--text-primary) flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-(--accent-primary)" />
                <span>팀 멤버 수</span>
              </span>
              <span className="font-mono font-semibold text-xs px-2 py-0.5 rounded-(--radius-sm) border border-(--border-subtle) bg-(--bg-secondary)">
                {teamMembers} 명
              </span>
            </div>
            <Slider
              min={1}
              max={100}
              value={teamMembers}
              onChange={(val) => setTeamMembers(val)}
            />
            <div className="flex justify-between text-[11px] text-(--text-secondary)">
              <span>1명</span>
              <span>100명</span>
            </div>
          </div>

          {/* Slider 2: Storage */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-(--text-primary) flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-(--accent-primary)" />
                <span>클라우드 토큰 저장소</span>
              </span>
              <span className="font-mono font-semibold text-xs px-2 py-0.5 rounded-(--radius-sm) border border-(--border-subtle) bg-(--bg-secondary)">
                {storageGb} GB
              </span>
            </div>
            <Slider
              min={10}
              max={1000}
              step={10}
              value={storageGb}
              onChange={(val) => setStorageGb(val)}
            />
            <div className="flex justify-between text-[11px] text-(--text-secondary)">
              <span>10 GB</span>
              <span>1 TB</span>
            </div>
          </div>

          {/* Slider 3: Compute */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-(--text-primary) flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-(--accent-primary)" />
                <span>빌드 & 컴파일 엔진 코어</span>
              </span>
              <span className="font-mono font-semibold text-xs px-2 py-0.5 rounded-(--radius-sm) border border-(--border-subtle) bg-(--bg-secondary)">
                {computeUnits} Core
              </span>
            </div>
            <Slider
              min={1}
              max={16}
              value={computeUnits}
              onChange={(val) => setComputeUnits(val)}
            />
            <div className="flex justify-between text-[11px] text-(--text-secondary)">
              <span>1 Core</span>
              <span>16 Core</span>
            </div>
          </div>
        </div>

        {/* Calculation Summary Card composed with Card & Button */}
        <Card className="lg:col-span-5 p-5 bg-(--bg-secondary)/30 flex flex-col justify-between space-y-4">
          <div className="space-y-2.5 text-xs">
            <div className="font-semibold text-(--text-primary)">비용 산출 내역</div>
            <div className="flex justify-between text-(--text-secondary)">
              <span>팀 좌석 ({teamMembers}명)</span>
              <span className="font-medium text-(--text-primary)">₩{memberCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-(--text-secondary)">
              <span>스토리지 ({storageGb}GB)</span>
              <span className="font-medium text-(--text-primary)">₩{storageCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-(--text-secondary)">
              <span>빌드 코어 ({computeUnits}코어)</span>
              <span className="font-medium text-(--text-primary)">₩{computeCost.toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-(--border-subtle)">
            <div className="text-[11px] text-(--text-secondary)">월간 예상 견적</div>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-bold tracking-tight text-(--text-primary)">
                ₩{totalCost.toLocaleString()}
              </span>
              <span className="text-xs text-(--text-secondary)"> /월</span>
            </div>
            <Button
              variant="primary"
              size="md"
              className="w-full mt-3 text-xs"
            >
              견적서 다운로드
            </Button>
          </div>
        </Card>
      </div>
    </Card>
  );
}
