import Card from "@/app/component/Card/Card";
import Input from "@/app/component/Input/Input";

const ComponentHome = () => {
  return (
    <div>
      <Card>
        <h3>Input</h3>
        <p className="text-textSub">데이터의 값을 입력합니다.</p>
        <Input />
      </Card>
      <hr className="my-4" />
      <Card>
        <h3>Input</h3>
        <p className="text-textSub">데이터의 값을 입력합니다.</p>
        <Input />
      </Card>
    </div>
  );
};

export default ComponentHome;
