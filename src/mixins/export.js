import {
  exportWorkOrder,
  exportMonthlyPlan,
  exportDeptPlan,
} from "@/api/common";
import { parseTime } from "@/utils/ruoyi";

const apisMap = {
  workOrder: exportWorkOrder,
  monthPlan: exportMonthlyPlan,
  deptPlan: exportDeptPlan,
};

const nameMap = {
  workOrder: "工单列表",
  deptPlan: "部门计划",
  monthPlan: "当月计划",
};

export const exportMixins = {
  methods: {
    handleExport(type, data) {
      if (type) {
        apisMap[type](data).then((res) => {
          const blob = new Blob([res]);
          const link = document.createElement("a");
          link.download = `${nameMap[type]} ${parseTime(new Date())}.xlsx`;
          link.href = URL.createObjectURL(blob);
          document.body.appendChild(link);
          link.click();
          URL.revokeObjectURL(link.href);
          document.body.appendChild(link);
        });
      }
    },
  },
};
