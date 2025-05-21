import { useEffect, useState } from "react";
const Shimmer = () => {
  const [showNoData, setShowNoData] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNoData(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (showNoData) {
    return <span style={{ marginTop: '2.75rem' }}>No data found</span>;
  }

  return (
    <div className="grid grid-cols-5 gap-8 p-4 m-h-[36rem] overflow-y-scroll" style={{ marginTop: '2.75rem' }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex flex-col h-[10rem] w-[252.8px] rounded-[1rem] bg-[#e1e1e199]"></div>
      ))}
    </div>
  );
};

export default Shimmer;
