import React from "react";
import AssignmentList from "./AssignmentList";

const Assignments = ({
  homeworkItems,
  labItems,
  extraItems,
  onViewDetails,
}) => (
  <div className="grid grid-cols-3 gap-6">
    {homeworkItems.length > 0 && (
      <AssignmentList
        title="Бие даалт"
        items={homeworkItems}
        onViewDetails={onViewDetails}
      />
    )}
    {labItems.length > 0 && (
      <AssignmentList
        title="Лабораторийн ажил"
        items={labItems}
        onViewDetails={onViewDetails}
      />
    )}
    {extraItems.length > 0 && (
      <AssignmentList
        title="Нэмэлт даалгавар"
        items={extraItems}
        onViewDetails={onViewDetails}
      />
    )}
  </div>
);
export default Assignments;
