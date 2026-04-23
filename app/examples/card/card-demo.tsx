import { Card, CardHeader, CardContent, CardFooter } from "@/app/templates/Card/Card";
import { Button } from "@/app/templates/Button/Button";

export default function CardDemo() {
  return (
    <Card className="w-80">
      <CardHeader>카드 헤더</CardHeader>
      <CardContent>카드 콘텐츠: 정보의 메인 내용을 상세하게 배치합니다.</CardContent>
      <CardFooter>
        <div className="flex justify-end gap-2">
          <Button type="outline" size="small">취소</Button>
          <Button type="primary" size="small">확인</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
