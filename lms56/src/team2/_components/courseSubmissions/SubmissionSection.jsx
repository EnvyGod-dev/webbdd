import React from "react";
import SubmissionProgress from "./SubmissionProgress";

const SubmissionSection = ({ homeworkItems, labItems,extraItems, fadeInStyle }) => (
  <div className="grid grid-cols-3 gap-6 transition-opacity duration-300">
    {homeworkItems.length > 0 && (
      <div key="homework" style={fadeInStyle}>
        <SubmissionProgress
          title="Бие даалт"
          items={homeworkItems}
          colorCoding
        />
      </div>
    )}
    {labItems.length > 0 && (
      <div key="lab" style={fadeInStyle}>
        <SubmissionProgress
          title="Лабораторийн ажил"
          items={labItems}
          colorCoding
        />
      </div>
    )}
    {extraItems.length > 0 && (
      <div key="extra" style={fadeInStyle}>
        <SubmissionProgress
          title="Нэмэлт даалгавар"
          items={extraItems}
          colorCoding
        />
      </div>
    )}
  </div>
);

export default SubmissionSection;
