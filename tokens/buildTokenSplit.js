import { readFileSync, writeFileSync } from 'fs';

// 원본 token.json 파일 읽기
const tokenFile = readFileSync('token.json', 'utf8');
const tokenData = JSON.parse(tokenFile);

// console.log(tokenData);

// tokenSetOrder 배열에서 각 항목에 대해 파일 생성
tokenData.$metadata.tokenSetOrder.forEach(tokenSet => {
    const fileName = `tokens/setorder/token_${tokenSet}.json`;
    
    // 각 토큰셋의 데이터를 가져옴
    const originalTokens = tokenData[tokenSet] || {};
    const cleanedTokens = {};
    
    // console.log(originalTokens);

    // 최상위 그룹을 제외한 나머지 데이터 처리
    Object.entries(originalTokens).forEach(([groupKey, groupValue]) => {
        // 최상위 그룹 스킵
        if (groupKey === tokenSet) {
            return;
        }
        
        if (groupValue && typeof groupValue === 'object') {
            cleanedTokens[groupKey] = groupValue;
        }
    });

    writeFileSync(
        fileName,
        JSON.stringify(cleanedTokens, null, 2),
        'utf8'
    );
    
    console.log(`${fileName} 파일이 생성되었습니다.`);
});