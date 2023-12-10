export interface IAddItemProps {
    open: boolean;
    onClose: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSave: (item: any) => void;
    title: string;
    fields: { label: string; value: string }[];
  }
  