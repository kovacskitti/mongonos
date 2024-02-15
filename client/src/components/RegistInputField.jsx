function RegistInputField(props) {
  const className = props.className;
  const type = props.type;
  const label = props.label;
  const onHandleChange = props.handleChange;
  const id = props.id;

  return (
    <div className={className}>
      <label>{label}</label>
      <input id={id} type={type} onChange={onHandleChange} />
    </div>
  );
}

export default RegistInputField;
