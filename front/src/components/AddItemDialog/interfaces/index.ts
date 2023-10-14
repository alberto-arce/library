export interface IAddItemProps {
    open: boolean;
    onClose: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSave: (item: any) => void; // Define the onSave callback to handle saving the item
    title: string;
    fields: { label: string; value: string }[]; // Define the input fields dynamically
  }
  