import { User } from "../../components/User";
import { LayoutModule } from "../layout";

export const UserModule = () => {
  return (
    <>
      <LayoutModule />
      <div style={{ marginTop: "20px" }}>
        <User />
      </div>
    </>
  );
}
