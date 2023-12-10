import { Borrow } from "../../components/Borrow";
import { LayoutModule } from "../layout";

export const BorrowModule: React.FC<{
  userName: string;
  userRole: string | undefined;
}> = ({ userName, userRole }) => {
  return (
    <>
      <LayoutModule userName={userName} userRole={userRole} />
      <div style={{ marginTop: "20px" }}>
        <Borrow />
      </div>
    </>
  );
};
