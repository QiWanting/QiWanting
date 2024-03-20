import { RowClassName } from 'ant-design-vue/lib/vc-table/interface';

export const customRowClassName: RowClassName<string> = (_record, index) => {
  return index % 2 === 1 ? 'table-striped' : '';
};
