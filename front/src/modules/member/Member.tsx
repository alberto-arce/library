import { Member } from "../../components/Member";
import { LayoutModule } from "../layout";

export const MemberModule: React.FC<{
  userName: string;
  userRole: string | undefined;
}> = ({ userName, userRole }) => {
  return (
    <>
      <LayoutModule userName={userName} userRole={userRole} />
      <div style={{ marginTop: "20px" }}>
        <Member />
      </div>
    </>
  );
};
