import { Member } from "../../components/Member";
import { LayoutModule } from "../layout";

export const MemberModule = () => {
  return (
    <>
      <LayoutModule />
      <div style={{ marginTop: "20px" }}>
        <Member />
      </div>
    </>
  );
}
