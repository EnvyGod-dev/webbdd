import React from "react";
import OverviewCard from "./OverviewCards";

const OverviewSection = () => (
  <div className="grid grid-cols-3 gap-4 mb-6">
    <OverviewCard title="Нийт дүгнэгдсэн" value="13/26" />
    <OverviewCard title="Нийт үнэлгээ" value="86%" />
    <OverviewCard title="Өмнөх ахиц" value="+34%" />
  </div>
);

export default OverviewSection;
