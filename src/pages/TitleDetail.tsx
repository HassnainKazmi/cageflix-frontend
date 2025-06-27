import { useParams } from "react-router-dom";

const TitleDetail = () => {
  const { tconst } = useParams();
  return (
    <div style={{ color: "black", padding: 32, fontSize: 24 }}>
      Title Detail Page
      <br />
      <span style={{ fontSize: 16, color: "#aaa" }}>tconst: {tconst}</span>
    </div>
  );
};

export default TitleDetail;
