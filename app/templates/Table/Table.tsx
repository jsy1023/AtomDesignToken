/** 테이블에 표시할 데이터 배열. 각 객체는 하나의 행을 나타냅니다.
 * 객체의 키는 테이블 헤더가 되고, 값은 해당 셀의 내용이 됩니다.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Table = ({ tableData }: { tableData: Record<string, any>[] }) => {
  // tableData가 제공되지 않았거나 비어있는 경우, 데이터 없음 메시지를 표시합니다.
  if (!tableData || tableData.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-[var(--text-standard)]">표시할 데이터가 없습니다.</p>
      </div>
    );
  }

  const headers = Object.keys(tableData[0]);

  return (
    <div className="overflow-auto w-full">
      <table className="min-w-full border border-[var(--color-border)] rounded]">
        <thead className="bg-[var(--table-header-background)]">
          <tr>
            {/* 헤더 배열을 순회하며 각 헤더에 대한 <th>태그를 생성합니다. */}
            {headers.map((header, index) => {
              return (
                <th
                  key={index}
                  className="px-6 py-3 text-center text-[var(--table-header-text)] tracking-wider border-b border-[var(--color-border)]"
                >
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        {/* 테이블 바디 부분 */}
        <tbody className={`divide-y divide-[var(--color-border)] `}>
          {/* tableData 배열을 순회하며 각 데이터 객체(행)에 대한 <tr> 태그를 생성합니다. */}
          {tableData.map((row, rowIndex) => {
            return (
              <tr
                key={rowIndex}
                className={` ${rowIndex % 2 === 0 ? `bg-[var(--table-body-background)]` : `bg-[var(--table-body-background-even)]`}`}
              >
                {/* 각 행 내에서 헤더 배열을 다시 순회하며 해당 헤더에 맞는 셀(<td>)을 생성합니다. */}
                {headers.map((header, colIndex) => (
                  <td
                    key={colIndex} // 고유한 키를 제공합니다.
                    className={`px-4 py-2 text-[var(--text-body-text)] border-b border-[var(--color-border)]`}
                  >
                    {/* 현재 행 객체(row)에서 해당 헤더(키)에 해당하는 값을 가져와 셀에 표시합니다. */}
                    {row[header]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
