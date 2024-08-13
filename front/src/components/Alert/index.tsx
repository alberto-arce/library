import Swal from 'sweetalert2';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  text?: string;
  position?: 'top-end' | 'center';
  timer?: number;
  showConfirmButton?: boolean;
  confirmButtonText?: string;
  confirmButtonColor?: string,
  showCancelButton?: boolean;
  cancelButtonText?: string;
  cancelButtonColor?: string;
  onConfirm?: () => Promise<void>;
  onCancel?: () => void;
}

export const Alert = ({
  type,
  title,
  text,
  position = 'top-end',
  timer,
  showConfirmButton = false,
  confirmButtonText,
  confirmButtonColor,
  showCancelButton = false,
  cancelButtonText,
  cancelButtonColor,
  onConfirm,
  onCancel,
}: AlertProps) => {
  Swal.fire({
    icon: type,
    title: title,
    text: text,
    position: position,
    timer: timer,
    showConfirmButton: showConfirmButton,
    confirmButtonText: confirmButtonText,
    confirmButtonColor: confirmButtonColor,
    cancelButtonText: cancelButtonText,
    showCancelButton: showCancelButton,
    cancelButtonColor: cancelButtonColor,
  }).then(async (result) => {
    if (result.isConfirmed && onConfirm) {
      try {
        await onConfirm();
      } catch (error) {
        console.error('Error in onConfirm:', error);
      }
    }  else if (result.isDismissed && onCancel) {
      onCancel();
    }
  });
};
