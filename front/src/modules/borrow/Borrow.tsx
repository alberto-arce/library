import { Borrow } from "../../components/Borrow";
import { LayoutModule } from "../layout";

export const BorrowModule: React.FC<{ userRole: string | undefined }> = ({
  userRole,
}) => {
  return (
    <>
      <LayoutModule userRole={userRole} />
      <div style={{ marginTop: "20px" }}>
        <Borrow />
      </div>
    </>
  );
};
