import notFoundImage from "../../assets/not_found.jpg";

export const NotFoundImage = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "10px 5% / 20px 25em 30px 35em",
    }}
  >
    <img
      src={notFoundImage}
      alt="Not Found"
      width="500px"
      height="500px"
      style={{
        borderRadius: "50%", 
        objectFit: "cover", 
      }}
    />
  </div>
);
