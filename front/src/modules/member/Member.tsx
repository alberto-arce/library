import { Member } from "../../components/Member";
import { LayoutModule } from "../layout";

export const MemberModule: React.FC<{ userRole: string | undefined }> = ({
  userRole,
}) => {
  return (
    <>
      <LayoutModule userRole={userRole} />
      <div style={{ marginTop: "20px" }}>
        <Member />
      </div>
    </>
  );
};
