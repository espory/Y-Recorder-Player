export default function abstract(props) {
  const { abstract } = props;
  return (
    <div className="info-abstract">
      <div className="title">
        ABSTRACT
      </div>
      <div className="content">
        {abstract}
      </div>
    </div>
  );
}
