const ComponentHome = () => {
  return (
    <div>
      <h2>Input</h2>
      <p className="text-textSub">데이터의 값을 입력합니다.</p>
      <Input />
    </div>
  );
};

export default ComponentHome;

function Input() {
  return (
    <input
      type="text"
      className="bg-inputBackgroundStandard border-inputBorderStandard border px-4 py-2 rounded-xs"
    />
  );
}
