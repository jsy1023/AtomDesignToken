import { test, expect } from '@playwright/test';

test.describe('독립형 MIB 탐색기 (AtomDesignToken 라이브러리 연동) E2E 테스트', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(120000);
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('MIB 독립 앱 기본 렌더링 및 NPM 패키지 컨슈머 뱃지/RFC1213-MIB 로드 확인', async ({ page }) => {
    // 1. 헤더 및 타이틀 확인
    await expect(page.locator('h1')).toContainText('MIB 파서 & OID 계층 트리 검색엔진');
    await expect(page.getByText('NPM Package Consumer Mode')).toBeVisible();

    // 2. 상단 통계 수치 확인 (기본 샘플 로드)
    await expect(page.getByText('업로드된 MIB')).toBeVisible();
    await expect(page.getByText('전체 OID 노드')).toBeVisible();

    // 3. OID 트리 렌더링 확인 (RFC1213 기본 노드들)
    await expect(page.getByText('OID 계층 트리', { exact: true })).toBeVisible();
    await expect(page.getByText('sysDescr').first()).toBeVisible();
  });

  test('OID 노드 클릭 시 상세 패널 및 SNMP CLI 명령어 생성 확인', async ({ page }) => {
    // OID 트리에서 sysDescr 클릭
    const sysDescrNode = page.getByText('sysDescr').first();
    await sysDescrNode.click();

    // 우측 상세 패널에 세부 정보 노출 확인
    await expect(page.getByText('1.3.6.1.2.1.1.1').first()).toBeVisible();
    await expect(page.getByText('DisplayString (SIZE (0..255))')).toBeVisible();

    // SNMP 코드 탭 전환
    const commandsTab = page.getByRole('button', { name: 'SNMP 코드/CLI' });
    await commandsTab.click();

    // snmpget 명령어 확인
    await expect(page.getByText('snmpget -v 2c -c public <target_host> 1.3.6.1.2.1.1.1.0')).toBeVisible();
  });

  test('실시간 검색창 및 필터링 동작 확인', async ({ page }) => {
    // MIB 초기 데이터 로드 대기
    await expect(page.getByText('sysDescr').first()).toBeVisible();

    // 검색창 클릭 및 'sys' 타이핑
    const searchInput = page.getByPlaceholder('OID 이름, 숫자(1.3.6.1...), 설명, 문법 실시간 검색...');
    await searchInput.fill('sys');

    // 검색 결과 항목 노출 확인
    await expect(page.getByText(/건 발견/)).toBeVisible();
    await expect(page.getByText('sysUpTime').first()).toBeVisible();
  });

  test('검색엔진(Elasticsearch/OpenSearch) 색인 모달 열기 및 Bulk NDJSON 확인', async ({ page }) => {
    // '검색엔진에 색인하기' 버튼 클릭
    const exportBtn = page.getByRole('button', { name: '검색엔진에 색인하기' });
    await exportBtn.click();

    // 모달 표시 확인
    await expect(page.getByText('검색엔진(Elasticsearch / OpenSearch) 색인 파이프라인')).toBeVisible();

    // Bulk NDJSON 탭 클릭
    const ndjsonTab = page.getByRole('button', { name: /Bulk NDJSON 데이터/ });
    await ndjsonTab.click();

    // ndjson 데이터 블록 및 다운로드 버튼 확인
    await expect(page.getByRole('button', { name: '.ndjson 파일 다운로드' })).toBeVisible();

    // 모달 닫기
    const closeBtn = page.getByRole('button', { name: '닫기' }).first();
    await closeBtn.click();
    await expect(page.getByText('검색엔진(Elasticsearch / OpenSearch) 색인 파이프라인')).not.toBeVisible();
  });
});
