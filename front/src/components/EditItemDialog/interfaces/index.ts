/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IEditItemProps {
  open: boolean;
  onClose: () => void; 
  onSave: (editedData: any) => void; 
  title: string; 
  fields: { label: string; value: string }[]; 
  initialData: any; 
}
