import { Borrow } from "../../components/Borrow";
import { LayoutModule } from "../layout";

export const BorrowModule = () => {
  return (
    <>
      <LayoutModule />
      <div style={{ marginTop: "20px" }}>
        <Borrow />
      </div>
    </>
  );
}
